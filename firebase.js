// ======================================
// PMD Learning Centre V2
// firebase.js
// ======================================

// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

// Firebase Authentication
import {
    getAuth,
    GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// Firestore Database
import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// Firebase Storage
import {
    getStorage
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

// ======================================
// Firebase Configuration
// ======================================

const firebaseConfig = {

    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey:"AIzaSyAmxb849l1qgtrSaxSb7FJSSpYT4svR46I",
  authDomain: "pmd-learning-centre.firebaseapp.com",
  projectId: "pmd-learning-centre",
  storageBucket: "pmd-learning-centre.firebasestorage.app",
  messagingSenderId: "162915102368",
  appId: "1:162915102368:web:f873632ceca544c7f7a3c5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// ======================================
// Initialize Firebase
// ======================================

const app = initializeApp(firebaseConfig);

// Authentication
const auth = getAuth(app);

// Firestore
const db = getFirestore(app);

// Storage
const storage = getStorage(app);

// Google Login
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});
// ======================================
// Authentication Settings
// ======================================

auth.useDeviceLanguage();

// ======================================
// Export Firebase Services
// ======================================

export {

    app,

    auth,

    db,

    storage,

    googleProvider

};

// ======================================
// Firebase Status
// ======================================

console.log(
    "%cPMD Learning Centre V2",
    "color:#F57C00;font-size:18px;font-weight:bold;"
);

console.log(
    "Firebase Connected Successfully."
);

// ======================================
// Future Modules (Already Ready)
// ======================================

// Firestore Collections:
//
// students
// teachers
// admins
// courses
// admissions
// notes
// quizzes
// quizResults
// attendance
// payments
// notifications
// gallery
// certificates
//
// You can use these collections
// directly in future files.

// ======================================
// Project Version
// ======================================

const PMD_VERSION = "2.0 Final";

console.log("Version :", PMD_VERSION);

// ======================================
// End of firebase.js
// ======================================
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

export {
    auth,
    db,
    googleProvider
};