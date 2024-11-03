import { useEffect, useState } from "react";
import CreateTweet from "./CreateTweet";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Tweets() {
  // STATES
  const [tweets, setTweets] = useState([]);
  const [tweetSubmitted, setTweetSubmitted] = useState(false);

  useEffect(() => {
    fetchTweets();
  }, [tweetSubmitted]);

  const fetchTweets = async () => {
    try {
      const response = await fetch(
        "https://projet-passerrelle-2-default-rtdb.europe-west1.firebasedatabase.app/tweets.json",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Une erreur est survenue.");
      }
      const data = await response.json();
      const tweetArray = Object.keys(data).map((key) => ({
        ...data[key],
      }));
      setTweets(tweetArray);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const counterLike = (index) => {
    setTweets((prevTweets) =>
      prevTweets.map((tweet, i) => {
        if (i === index) {
          return { ...tweet, likes: (parseInt(tweet.likes, 10) || 0) + 1 }; // Ensure likes is a number
        }
        return tweet; // Return the original tweet for others
      })
    );
  };

  const handleTweetSubmit = async (tweet) => {
    try {
      const response = await fetch(
        "https://projet-passerrelle-2-default-rtdb.europe-west1.firebasedatabase.app/tweets.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tweet, likes: 0 }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add the tweet");
      }
      setTweetSubmitted((prev) => !prev);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-lg mx-auto p-4 border rounded-lg bg-gray-900 text-white space-y-4">
      <CreateTweet onTweetSend={handleTweetSubmit} /> {/* Pass the handleTweetSubmit function */}
      <h2 className="text-xl font-bold mb-4">Tweets</h2>
      {tweets.map((tweet, index) => (
        <div
          key={index}
          className="p-4 border-b border-gray-700 hover:bg-gray-800 rounded-lg transition-colors duration-200 ease-in-out"
        >
          <p className="text-gray-200 mb-2">{tweet.tweet}</p>
          <div className="flex items-center justify-between">
            <button
              onClick={() => counterLike(index)} // Pass the index to the counterLike function
              className="flex items-center space-x-1 text-blue-500 hover:text-blue-400 transition duration-200"
            >
              <FaHeart className="text-lg" />
              <span>{tweet.likes}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
