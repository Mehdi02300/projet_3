// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYsr03FPpnxoWFVrRZIixW9t7R1xcKrIw",
  authDomain: "projet-passerrelle-2.firebaseapp.com",
  projectId: "projet-passerrelle-2",
  storageBucket: "projet-passerrelle-2.firebasestorage.app",
  messagingSenderId: "974902754924",
  appId: "1:974902754924:web:ee09cd12ff8489aa322249",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
