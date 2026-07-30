// Firebase SDK Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmxb849l1qgtrSaxSb7FJSSpYT4svR46I",
  authDomain: "pmd-learning-centre.firebaseapp.com",
  projectId: "pmd-learning-centre",
  storageBucket: "pmd-learning-centre.firebasestorage.app",
  messagingSenderId: "162915102368",
  appId: "1:162915102368:web:f873632ceca544c7f7a3c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
const auth = getAuth(app);
const db = getFirestore(app);

// Export
export { app, auth, db };