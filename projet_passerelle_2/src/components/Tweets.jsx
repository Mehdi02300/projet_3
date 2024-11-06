import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/AuthProvider";
import CreateTweet from "./CreateTweet";
import { FaHeart, FaTrash } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import pictureProfil from "../assets/oeuf.jpeg";

export default function Tweets({ createHidden, selfTweets }) {
  const { user } = useContext(AuthContext);
  const { userId } = useParams();

  // STATES
  const [tweets, setTweets] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetchTweets();
  }, [reload]);

  // FUNCTIONS
  const fetchTweets = async () => {
    const response = await fetch(
      "https://projet-passerrelle-2-default-rtdb.europe-west1.firebasedatabase.app/tweets.json"
    );
    if (!response.ok) {
      throw new Error("Une erreur est survenue.");
    }
    const data = await response.json();

    // Convertir en tableau et obtenir les informations des utilisateurs
    const tweetDetails = await Promise.all(
      Object.entries(data).map(async ([key, tweet]) => {
        // Requête pour obtenir le username
        const userResponse = await fetch(
          `https://projet-passerrelle-2-default-rtdb.europe-west1.firebasedatabase.app/users/${tweet.userId}.json`
        );
        const userData = await userResponse.json();

        return {
          id: key,
          ...tweet,
          username: userData?.username || "Utilisateur inconnu",
          name: userData?.name || "Utilisateur inconnu",
        };
      })
    );

    tweetDetails.sort((a, b) => b.timestamp - a.timestamp);

    setTweets(tweetDetails);
  };

  const counterLikes = async (index, tweetId) => {
    const updatedTweets = tweets.map((tweet, i) =>
      i === index ? { ...tweet, likes: (tweet.likes || 0) + 1 } : tweet
    );
    setTweets(updatedTweets);

    // Update in firebase
    await fetch(
      `https://projet-passerrelle-2-default-rtdb.europe-west1.firebasedatabase.app/tweets/${tweetId}.json`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: updatedTweets[index].likes }),
      }
    );
  };

  const deleteTweet = async (tweetId) => {
    await fetch(
      `https://projet-passerrelle-2-default-rtdb.europe-west1.firebasedatabase.app/tweets/${tweetId}.json`,
      {
        method: "DELETE",
      }
    );
    setTweets(tweets.filter((tweet) => tweet.id !== tweetId));
  };

  return (
    <div className="w-lg mx-auto p-4 border rounded-lg bg-gray-900 text-white space-y-4">
      {!createHidden && <CreateTweet onTweetAdded={() => setReload(!reload)} />}
      <h2 className="text-xl font-bold mb-4">Tweets</h2>
      {tweets
        .filter((tweet) => (selfTweets ? tweet.userId === userId : tweet.tweet))
        .map((tweet, index) => (
          <div
            key={tweet.id}
            className="flex p-4 border-b border-gray-700 hover:bg-gray-800 rounded-lg transition-colors duration-200 ease-in-out"
          >
            <img src={pictureProfil} alt="Profil" className="w-12 h-12 rounded-full mr-4" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg text-gray-400 mr-2">{tweet.name}</span>
                  <Link
                    to={`/profile/${tweet.userId}`}
                    className="font-bold text-blue-500 hover:underline mr-2"
                  >
                    @{tweet.username}
                  </Link>
                </div>
                {user && user.uid === tweet.userId && (
                  <button
                    onClick={() => deleteTweet(tweet.id)}
                    className="flex items-center space-x-1 text-red-500 hover:text-red-700 transition duration-200"
                  >
                    <FaTrash className="text-lg" />
                  </button>
                )}
              </div>
              <p className="text-gray-200 mb-2">{tweet.tweet}</p>
              <div className="flex items-center space-x-2 text-gray-400">
                <button
                  onClick={() => counterLikes(index, tweet.id)}
                  className="flex items-center space-x-1 hover:text-blue-400 transition duration-200"
                >
                  <FaHeart className="text-lg" />
                  <span>{tweet.likes}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
