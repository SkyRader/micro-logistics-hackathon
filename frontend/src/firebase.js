// src/pages/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// 🔹 Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAeVaOA4686T3qd9JCBX1WwS5STtxeiSqw",
  authDomain: "micro-logistics-e894b.firebaseapp.com",
  projectId: "micro-logistics-e894b",
  storageBucket: "micro-logistics-e894b.firebasestorage.app",
  messagingSenderId: "175002672343",
  appId: "1:175002672343:web:d933f142b99a752ab6e492"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword };
