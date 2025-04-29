// Import functions from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfSKuFUQtKycdgMjkh6bQTGLL-bnCkrd0",
  authDomain: "mytasknest.firebaseapp.com",
  projectId: "mytasknest",
  storageBucket: "mytasknest.appspot.com",
  messagingSenderId: "93772446794",
  appId: "1:93772446794:web:8a451322a0749b75313ab3",
  measurementId: "G-H4D1JFZSYK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Correct: pass app to getAuth
export const auth = getAuth(app);
export default app;
