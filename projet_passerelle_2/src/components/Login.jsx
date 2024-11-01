import logo from "../assets/logo.png";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../store/AuthProvider";
import { toast } from "react-toastify";

export default function Login({ onClose }) {
  // Variables
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login, loading } = useContext(AuthContext);

  // Function
  const onSubmit = (data) => {
    if (loading) return;

    return login(data.email, data.password)
      .then((userCredential) => {
        navigate("/");
      })
      .catch((error) => {
        const { code } = error;
        if (code === "auth/invalid-credential" || code === "auth/user-not-found") {
          toast.error("Email ou mot de passe incorrect.");
        } else {
          toast.error(code);
        }
      });
  };

  return (
    <div className="w-3/4 mx-auto">
      <img src={logo} alt="logo X" height={30} width={30} className="mx-auto" />
      <h2 className="text-xl font-bold mb-4 my-10">Créer votre compte</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 my-5 border rounded text-black"
          {...register("email", {
            required: true,
          })}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full p-4 mt-5 border rounded text-black"
          {...register("password", {
            required: true,
            minLength: {
              value: 8,
              message: "Le mot de passe doit contenir au moins 8 caractères.",
            },
          })}
        />
        {errors.password && <p className="text-red-700">{errors.password.message}</p>}
        <Button className={"py-4 mt-32"} primary disabled={loading}>
          Me connecter
        </Button>
      </form>
    </div>
  );
}
