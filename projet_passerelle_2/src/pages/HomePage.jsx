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
      <div className="h-full w-11/12 lg:w-3/4 mx-auto mt-5 flex flex-col lg:flex-row justify-between lg:items-center gap-y-10 lg:gap-y-0">
        <div className="lg:flex-1">
          <img src={logo} alt="Logo" className="h-20 lg:h-72 w-20 lg:w-72" />
        </div>
        <div className="flex-1 space-y-10">
          <h2 className="text-4xl lg:text-7xl font-extrabold">Ça se passe maintenant</h2>
          <h4 className="text-xl lg:text-4xl font-bold">Inscrivez-vous.</h4>
          <div className="w-1/2 lg:w-3/5">
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
