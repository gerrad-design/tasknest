// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBulyCiQA0zwABweMPe5i3HoKOT0y9nE-8",
  authDomain: "task-nest-a28b9.firebaseapp.com",
  projectId: "task-nest-a28b9",
  storageBucket: "task-nest-a28b9.firebasestorage.com",
  messagingSenderId: "859730702378",
  appId: "1:859730702378:web:5930c97bf2c44413dd9353",
  measurementId: "G-GL8KT2XXVS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };