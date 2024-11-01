import { useState } from "react";
import logo from "../assets/logo.png";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignUp({ onClose }) {
  // State
  const [loading, setLoading] = useState(false);

  // Variables
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  // Function
  const onSubmit = async (data) => {
    if (loading) return;

    setLoading(true);

    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        const { code, message } = error;
        if (code == "auth/email-already-in-use") {
          toast.error("Cet email est déjà utilisé.");
        } else {
          toast.error(code);
        }
        setLoading(false);
      });
  };

  return (
    <div className="w-3/4 mx-auto">
      <img src={logo} alt="logo X" height={30} width={30} className="mx-auto" />
      <h2 className="text-xl font-bold mb-4 my-10">Créer votre compte</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Nom et prénom"
          className="w-full p-4 my-5 border focus:border-blue-500 rounded text-black"
          {...register("name", {
            required: true,
          })}
        />
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
          Créer mon profil
        </Button>
      </form>
    </div>
  );
}
