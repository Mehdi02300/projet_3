import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import pictureProfil from "../assets/oeuf.jpeg";
import NavBar from "../components/NavBar";
import Tweets from "../components/Tweets";

export default function Profile() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://projet-passerrelle-2-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`
        );
        if (!response.ok) {
          throw new Error("Une erreur est survenue.");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!userData) {
    return <div>Aucun utilisateur trouvé.</div>;
  }

  return (
    <div className="flex h-screen">
      <NavBar />
      <div className="flex-1 py-5 px-16 overflow-y-auto ml-[20%]">
        <div className="flex p-4">
          <img src={pictureProfil} alt="Profil" className="w-12 h-12 rounded-full mr-4" />
          <h1 className="text-3xl font-bold text-white">{userData.name}</h1>
        </div>
        <div className="p-5">
          <Tweets createHidden selfTweets />
        </div>
      </div>
    </div>
  );
}
