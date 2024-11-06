import { AuthContext } from "../store/AuthProvider";
import { useContext } from "react";
import Button from "../components/Button";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function NavBar() {
  const { user, logOut, loading } = useContext(AuthContext);

  return (
    <aside className="fixed h-screen w-1/5 flex flex-col items-center justify-between border-r-2 border-slate-400/25 p-5">
      <div className="flex flex-col items-center gap-8">
        <Link to={"/"}>
          <img src={logo} alt="logo" height={30} width={30} className="pb-4" />
        </Link>
        <div className="divide-y-2 divide-slate-400/25 text-xl text-white">
          {user && (
            <Link to={`/profile/${user.uid}`} className="block py-5 hover:underline">
              Mon profil
            </Link>
          )}
          <Link to={"/"} className="block py-5 hover:underline">
            Mes messages
          </Link>
          <Link to={"/"} className="block py-5 hover:underline">
            Mon profil
          </Link>
          <Link to={"/"} className="block py-5 hover:underline">
            Mes messages
          </Link>
          <Link to={"/"} className="block py-5 hover:underline">
            Mon profil
          </Link>
          <Link to={"/"} className="block py-5 hover:underline">
            Mes messages
          </Link>
          <Link to={"/"} className="block py-5 hover:underline">
            Mon profil
          </Link>
        </div>
      </div>
      <Button onClick={logOut} disabled={loading}>
        Déconnexion
      </Button>
    </aside>
  );
}
