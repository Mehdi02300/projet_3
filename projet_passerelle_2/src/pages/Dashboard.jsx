import { AuthContext } from "../store/AuthProvider";
import { useContext } from "react";
import Button from "../components/Button";
import logo from "../assets/logo.png";
import NavBar from "../components/NavBar";
import CreateTweet from "../components/CreateTweet";
import Tweets from "../components/Tweets";

export default function Dashboard() {
  const { logOut, loading } = useContext(AuthContext);

  return (
    <div className="flex h-screen text-white">
      <aside className="h-full w-1/5 flex flex-col items-center justify-between border-r-2 border-slate-400/25 p-5">
        <div className="flex flex-col items-center gap-8">
          <img src={logo} alt="logo" height={30} width={30} className="pb-4" />
          <NavBar />
        </div>
        <Button onClick={logOut} disabled={loading}>
          Déconnexion
        </Button>
      </aside>
      <main className="flex-1 py-5 px-16 overflow-y-auto">
        <div>
          <Tweets />
        </div>
      </main>
    </div>
  );
}
