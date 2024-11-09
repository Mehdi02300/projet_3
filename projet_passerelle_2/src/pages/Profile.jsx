import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../store/AuthProvider";
import { useParams, Link } from "react-router-dom";
import pictureProfil from "../assets/oeuf.jpeg";
import NavBar from "../components/NavBar";
import Tweets from "../components/Tweets";
import Button from "../components/Button";
import Modal from "../components/Modal";

export default function Profile() {
  // STATES
  const [userData, setUserData] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
  const [followersData, setFollowersData] = useState([]);
  const [followingData, setFollowingData] = useState([]);

  // VARIABLES
  const { userId } = useParams();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://projet-passerrelle-2-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`
        );
        if (!response.ok) throw new Error("Une erreur est survenue.");

        const data = await response.json();
        setUserData(data);
        setIsFollowing(data.followers && data.followers.includes(user.uid));

        // Fetch followers data
        if (data.followers) {
          const followers = await Promise.all(
            data.followers.map(async (followerId) => {
              const followerResponse = await fetch(
                `https://projet-passerrelle-2-default-rtdb.europe-west1.firebasedatabase.app/users/${followerId}.json`
              );
              const followerData = await followerResponse.json();
              return followerData
                ? { id: followerId, name: followerData.name, username: followerData.username }
                : null;
            })
          );
          setFollowersData(followers.filter((follower) => follower !== null));
        }

        // Fetch following data
        if (data.following) {
          const following = await Promise.all(
            data.following.map(async (followedId) => {
              const followingResponse = await fetch(
                `https://projet-passerrelle-2-default-rtdb.europe-west1.firebasedatabase.app/users/${followedId}.json`
              );
              const followedData = await followingResponse.json();
              return followedData
                ? { id: followedId, name: followedData.name, username: followedData.username }
                : null;
            })
          );
          setFollowingData(following.filter((followed) => followed !== null));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [userId, user.uid]);

  // FUNCTIONS
  const handleFollow = async () => {
    if (!user) return;

    try {
      const updatedFollowers = isFollowing
        ? userData.followers.filter((followerId) => followerId !== user.uid)
        : [...(userData.followers || []), user.uid];

      setUserData((prevData) => ({
        ...prevData,
        followers: updatedFollowers,
      }));
      setIsFollowing(!isFollowing);

      const response = await fetch(
        `https://projet-passerrelle-2-default-rtdb.europe-west1.firebasedatabase.app/users/${user.uid}.json`
      );
      const currentUserData = await response.json();

      const updatedFollowing = isFollowing
        ? currentUserData.following.filter((id) => id !== userId)
        : [...(currentUserData.following || []), userId];

      setUserData((prevData) => ({
        ...prevData,
        followers: updatedFollowers,
      }));
      setIsFollowing(!isFollowing);

      // Upadate in firebase
      await Promise.all([
        fetch(
          `https://projet-passerrelle-2-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ followers: updatedFollowers }),
          }
        ),
        fetch(
          `https://projet-passerrelle-2-default-rtdb.europe-west1.firebasedatabase.app/users/${user.uid}.json`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ following: updatedFollowing }),
          }
        ),
      ]);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'abonnement :", error);
    }
  };

  return (
    <div className="flex h-screen">
      <NavBar />
      <div className="flex-1 py-5 pr-3 lg:px-16 overflow-y-auto ml-[10%] lg:ml-[20%]">
        <div className="flex justify-between items-end">
          <div className="flex flex-col p-4">
            <img src={pictureProfil} alt="Profil" className="h-32 w-32 rounded-full mr-4" />
            <h1 className="text-3xl mt-3 font-bold text-white">{userData?.name}</h1>
            <Link
              to={`/profile/${userId}`}
              className="font-bold text-blue-500 hover:underline mr-2"
            >
              @{userData?.username}
            </Link>
          </div>
          <div>
            {user.uid !== userId && (
              <div>
                <Button primary className="p-4 mb-4" onClick={handleFollow}>
                  {isFollowing ? "Se désabonner" : "S'abonner"}
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-10">
          <button className="text-white text-lg" onClick={() => setIsFollowersModalOpen(true)}>
            {userData?.followers?.length || 0} abonnés
          </button>
          <button className="text-white text-lg" onClick={() => setIsFollowingModalOpen(true)}>
            {userData?.following?.length || 0} abonnements
          </button>
        </div>
        <div className="p-5">
          <Tweets createHidden selfTweets />
        </div>

        {/* Modal for followers */}
        <Modal isOpen={isFollowersModalOpen} onClose={() => setIsFollowersModalOpen(false)}>
          <h2 className="text-2xl text-white">Abonnés</h2>
          <div className="space-y-4 mt-4">
            {followersData.length === 0 ? (
              <p className="text-white">Aucun abonné</p>
            ) : (
              followersData.map((follower) => (
                <div
                  key={follower.id}
                  className="flex items-center p-5 border-b border-gray-700 hover:bg-gray-950 rounded-lg transition-colors duration-200 ease-in-out"
                >
                  <img src={pictureProfil} alt="Profile" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <p className="text-gray-400">{follower.name}</p>
                    <Link
                      to={`/profile/${follower.id}`}
                      onClick={() => setIsFollowersModalOpen(false)}
                      className="text-white font-bold hover:underline"
                    >
                      @{follower.username}
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </Modal>

        {/* Modal for following */}
        <Modal isOpen={isFollowingModalOpen} onClose={() => setIsFollowingModalOpen(false)}>
          <h2 className="text-2xl text-white">Abonnements</h2>
          <div className="space-y-4 mt-4">
            {followingData.length === 0 ? (
              <p className="text-white">Aucun abonnement</p>
            ) : (
              followingData.map((followed) => (
                <div
                  key={followed.id}
                  className="flex items-center p-5 border-b border-gray-700 hover:bg-gray-950 rounded-lg transition-colors duration-200 ease-in-out"
                >
                  <img src={pictureProfil} alt="Profile" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <p className="text-gray-400">{followed.name}</p>
                    <Link
                      to={`/profile/${followed.id}`}
                      onClick={() => setIsFollowingModalOpen(false)}
                      className="text-white font-bold hover:underline"
                    >
                      @{followed.username}
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
}
