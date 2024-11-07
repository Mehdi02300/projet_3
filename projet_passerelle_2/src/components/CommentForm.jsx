import React, { useState, useContext } from "react";
import { AuthContext } from "../store/AuthProvider";
import { toast } from "react-toastify";

export default function CommentForm({ tweetId, onCommentAdded }) {
  const [commentText, setCommentText] = useState("");
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Vous devez être connecté pour envoyer un tweet.");
      return;
    }

    const newComment = {
      text: commentText,
      userId: user.uid,
      username: user.username,
      name: user.name,
      timestamp: Date.now(),
    };

    const response = await fetch(
      `https://projet-passerrelle-2-default-rtdb.europe-west1.firebasedatabase.app/tweets/${tweetId}/comments.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      }
    );

    if (!response.ok) {
      toast.error("Une erreur est survenue.");
    } else {
      toast.success("Tweet envoyé avec succès !");
      setCommentText("");
      onCommentAdded();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-end">
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Ajouter un commentaire..."
        className="w-full mt-3 p-3 bg-gray-800 text-white rounded-md"
        rows="3"
      />
      <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded-md">
        Commenter
      </button>
    </form>
  );
}
