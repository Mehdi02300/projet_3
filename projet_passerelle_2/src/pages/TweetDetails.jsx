import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/AuthProvider";
import { useParams, Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Tweets from "../components/Tweets";
import CommentForm from "../components/CommentForm";
import { FaHeart, FaTrash } from "react-icons/fa";
import pictureProfil from "../assets/oeuf.jpeg";

export default function TweetDetails() {
  const [tweetData, setTweetData] = useState(null);
  const [comments, setComments] = useState([]);
  const [reload, setReload] = useState(false);

  const { user } = useContext(AuthContext);
  const { tweetId } = useParams();

  useEffect(() => {
    fetchTweetData();
    fetchComments();
  }, [reload]);

  const fetchTweetData = async () => {
    const response = await fetch(
      `https://projet-passerrelle-2-default-rtdb.europe-west1.firebasedatabase.app/tweets/${tweetId}.json`
    );
    if (!response.ok) {
      throw new Error("Une erreur est survenue.");
    }
    const data = await response.json();
    setTweetData(data);
  };

  const fetchComments = async () => {
    const response = await fetch(
      `https://projet-passerrelle-2-default-rtdb.europe-west1.firebasedatabase.app/tweets/${tweetId}/comments.json`
    );
    if (!response.ok) {
      throw new Error("Une erreur est survenue.");
    }
    const data = await response.json();

    const commentList = await Promise.all(
      Object.entries(data || {}).map(async ([id, comment]) => {
        // Fetch user details for each comment
        const userResponse = await fetch(
          `https://projet-passerrelle-2-default-rtdb.europe-west1.firebasedatabase.app/users/${comment.userId}.json`
        );
        const userData = await userResponse.json();
        return {
          id,
          ...comment,
          username: userData?.username || "Utilisateur inconnu",
          name: userData?.name || "Utilisateur inconnu",
        };
      })
    );
    setComments(commentList);
  };

  const deleteTweet = async (commentId) => {
    const response = await fetch(
      `https://projet-passerrelle-2-default-rtdb.europe-west1.firebasedatabase.app/tweets/${tweetId}/comments/${commentId}.json`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      setComments(comments.filter((comment) => comment.id !== commentId));
    } else {
      console.error("Erreur lors de la suppression du commentaire");
    }
  };

  if (!tweetData) {
    return <div>Une erreur est survenue ou le tweet n'existe plus.</div>;
  }

  return (
    <div className="flex h-screen">
      <NavBar />
      <div className="flex-1 py-5 px-16 overflow-y-auto ml-[20%]">
        <div className="">
          <Tweets createHidden answerHidden tweetAnswer />
          <CommentForm tweetId={tweetId} onCommentAdded={() => setReload(!reload)} />
          <h3 className="text-lg font-bold text-white">Commentaires</h3>
          <div className="mt-6">
            <div className="space-y-4 mt-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex p-4 border-b border-gray-700 rounded-lg">
                  <img src={pictureProfil} alt="Profil" className="w-12 h-12 rounded-full mr-4" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg text-gray-400 mr-2">{comment.name}</span>
                        <Link
                          to={`/profile/${comment.userId}`}
                          className="font-bold text-blue-500 hover:underline mr-2"
                        >
                          @{comment.username}
                        </Link>
                      </div>
                      {user && user.uid === comment.userId && (
                        <button
                          onClick={() => deleteTweet(comment.id)}
                          className="flex items-center space-x-1 text-red-500 hover:text-red-700 transition duration-200"
                        >
                          <FaTrash className="text-lg" />
                        </button>
                      )}
                    </div>
                    <p className="text-gray-200 my-2">{comment.text}</p>
                    <div className="flex items-center gap-5 text-gray-400">
                      <button
                        onClick={() => counterLikes(comment.id)}
                        className="flex items-center space-x-1 hover:text-blue-400 transition duration-200"
                      >
                        <FaHeart className="text-lg" />
                        <span>{comment.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
