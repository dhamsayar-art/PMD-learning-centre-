// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getAuth
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB2CYY9qO_1XTxLzEw3j3mpv4EfQMLcH64",
  authDomain: "pmd-learning-centre-6b4a5.firebaseapp.com",
  projectId: "pmd-learning-centre-6b4a5",
  storageBucket: "pmd-learning-centre-6b4a5.firebasestorage.app",
  messagingSenderId: "191436199922",
  appId: "1:191436199922:web:ec23b8dd0e7a7178de3d6b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

export const db = getFirestore(app);
import { auth, db } from "./firebase.js";