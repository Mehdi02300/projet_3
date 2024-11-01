import { AuthContext } from "../store/AuthProvider";
import { useContext } from "react";
import Button from "../components/Button";

export default function Dashboard() {
  const { logOut, loading } = useContext(AuthContext);

  return (
    <div className="text-white">
      Dashboard
      <Button primary onClick={logOut} disabled={loading}>
        Déconnexion
      </Button>
    </div>
  );
}
