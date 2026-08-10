```javascript
// ======================================
// PMD Learning Centre V2
// firebase.js
// ======================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

import {
    getStorage
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyAmxb849l1qgtrSaxSb7FJSSpYT4svR46I",
    authDomain: "pmd-learning-centre.firebaseapp.com",
    projectId: "pmd-learning-centre",
    storageBucket: "pmd-learning-centre.firebasestorage.app",
    messagingSenderId: "162915102368",
    appId: "1:162915102368:web:f873632ceca544c7f7a3c5"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

auth.useDeviceLanguage();

export {
    app,
    auth,
    db,
    storage,
    googleProvider
};

console.log("Firebase Connected Successfully.");
```
