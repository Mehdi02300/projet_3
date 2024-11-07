import { useContext, useState } from "react";
import { AuthContext } from "../store/AuthProvider";
import { toast } from "react-toastify";

export default function CreateTweet({ onTweetAdded }) {
  const { user } = useContext(AuthContext);
  const [tweet, setTweet] = useState("");
  const maxCharacters = 280;

  // Functions
  const handleChange = (e) => {
    if (e.target.value.length <= maxCharacters) {
      setTweet(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Vous devez être connecté pour envoyer un tweet.");
      return;
    }

    const tweetData = {
      tweet,
      likes: 0,
      userId: user.uid,
      username: user.username,
      name: user.name,
      timestamp: Date.now(),
    };

    const response = await fetch(
      "https://projet-passerrelle-2-default-rtdb.europe-west1.firebasedatabase.app/tweets.json",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tweetData),
      }
    );

    if (!response.ok) {
      toast.error("Une erreur est survenue.");
    } else {
      toast.success("Tweet envoyé avec succès !");
      setTweet("");
      onTweetAdded();
    }
  };

  return (
    <div className="w-lg mx-auto p-4 border rounded-lg text-white">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <textarea
          id="tweet"
          name="tweet"
          value={tweet}
          onChange={handleChange}
          maxLength={maxCharacters}
          placeholder="Quoi de neuf ?"
          className="w-full p-3 border border-gray-600 rounded-md bg-gray-900 resize-none text-white focus:outline-none focus:border-blue-500"
          rows="4"
        />
        <div className="flex justify-between items-center">
          <span
            className={`text-sm ${
              tweet.length === maxCharacters ? "text-red-500" : "text-gray-400"
            }`}
          >
            {tweet.length}/{maxCharacters}
          </span>
          <button
            type="submit"
            disabled={tweet.length === 0}
            className="py-2 px-4 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
}
