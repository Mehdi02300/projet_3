import { AuthContext } from "../store/AuthProvider";
import { useContext } from "react";
import Button from "../components/Button";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { LuMessageCircle } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { IoMdSearch } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";

export default function NavBar() {
  // VARIABLES
  const { user, logOut, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  // FUNCTION
  const handleLogout = () => {
    logOut();
    navigate("/");
    loading(false);
  };

  return (
    <aside className="fixed h-screen w-1/12 lg:w-1/5 flex flex-col items-center justify-between border-r-2 border-slate-400/25 p-5">
      <div className="flex flex-col items-center gap-8">
        <Link to={"/"}>
          <img src={logo} alt="logo" height={30} width={30} className="pb-4" />
        </Link>
        <div className="divide-y-2 divide-slate-400/25 text-xl text-white">
          {user && (
            <Link
              to={`/profile/${user.uid}`}
              className="flex gap-3 items-center py-5 hover:underline"
            >
              <CgProfile className="h-7 w-7" />
              <span className="hidden lg:block">Mon profil</span>
            </Link>
          )}
          <Link to={"/"} className="flex gap-3 items-center py-5 hover:underline">
            <LuMessageCircle className="h-7 w-7" />
            <span className="hidden lg:block">Mes messages</span>
          </Link>
          <Link to={"/"} className="flex gap-3 items-center py-5 hover:underline">
            <IoMdSearch className="h-7 w-7" />
            <span className="hidden lg:block">Rechercher</span>
          </Link>
          <Link to={"/"} className="flex gap-3 items-center py-5 hover:underline">
            <LuMessageCircle className="h-7 w-7" />
            <span className="hidden lg:block">Mes messages</span>
          </Link>
          <Link to={"/"} className="flex gap-3 items-center py-5 hover:underline">
            <IoMdSearch className="h-7 w-7" />
            <span className="hidden lg:block">Rechercher</span>
          </Link>
        </div>
      </div>
      <Button onClick={handleLogout} disabled={loading} className={"hidden lg:block"}>
        Déconnexion
      </Button>
      <button onClick={handleLogout} className="lg:hidden">
        <IoLogOutOutline className="h-7 w-7 text-red-500" />
      </button>
    </aside>
  );
}
