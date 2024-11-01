import React from "react";
import logo from "../assets/logo.png";
import Button from "../components/Button";
import { useState } from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import Modal from "../components/Modal";

export default function HomePage() {
  // State
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  return (
    <div className="h-screen text-white">
      <div className="h-full w-3/4 mx-auto flex justify-between items-center">
        <div className="flex-1">
          <img src={logo} alt="Logo" height={350} width={350} />
        </div>
        <div className="flex-1 space-y-10">
          <h2 className="text-7xl font-extrabold">Ça se passe maintenant</h2>
          <h4 className="text-4xl font-bold">Inscrivez-vous.</h4>
          <div className="w-3/5">
            <Button onClick={() => setIsSignupOpen(true)} primary>
              Créer un compte
            </Button>

            <p className="text-xs text-gray-600 mt-1">
              En vous inscrivant, vous acceptez les Conditions d'utilisation et la Politique de
              confidentialité, notamment l'Utilisation des cookies.
            </p>
            <h6 className="mt-10 mb-2">Vous avez déjà un compte ?</h6>
            <Button onClick={() => setIsLoginOpen(true)}>Se connecter</Button>
          </div>
        </div>
      </div>

      {/* Modales */}
      <Modal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)}>
        <SignUp onClose={() => setIsSignupOpen(false)} />
      </Modal>

      <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        <Login onClose={() => setIsLoginOpen(false)} />
      </Modal>
    </div>
  );
}
