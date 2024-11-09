import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../store/AuthProvider";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

export default function Main() {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <ClimbingBoxLoader color="white" size={30} />
      </div>
    );
  }
  return (
    <div>
      <Outlet />
    </div>
  );
}
