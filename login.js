```javascript
// =====================================
// PMD Learning Centre V2
// login.js
// =====================================

// Import Firebase Functions
import {
    auth,
    googleProvider
} from "./firebase.js";

import {
    signInWithEmailAndPassword,
    signInWithPopup,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";


// =====================================
// Elements
// =====================================

const loginForm = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const rememberMe = document.querySelector("input[type='checkbox']");
const message = document.getElementById("message");
const loadingScreen = document.getElementById("loadingScreen");
const googleBtn = document.getElementById("googleLogin");


// =====================================
// Show Message
// =====================================

function showMessage(text, type) {

    message.style.display = "block";
    message.className = "message " + type;
    message.innerHTML = text;

    setTimeout(() => {
        message.style.display = "none";
    }, 4000);
}


// =====================================
// Show Loader
// =====================================

function showLoader() {

    if (loadingScreen) {
        loadingScreen.style.display = "flex";
    }
}


// =====================================
// Hide Loader
// =====================================

function hideLoader() {

    if (loadingScreen) {
        loadingScreen.style.display = "none";
    }
}


// =====================================
// Login Form Submit
// =====================================

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    showLoader();

    try {

        // Remember Me
        await setPersistence(
            auth,
            rememberMe && rememberMe.checked
                ? browserLocalPersistence
                : browserSessionPersistence
        );

        // Login
        await signInWithEmailAndPassword(
            auth,
            email.value.trim(),
            password.value
        );

        showMessage(
            "Login Successful!",
            "success"
        );

        // Remove loading immediately
        hideLoader();

        // Redirect immediately
        window.location.href = "dashboard.html";

    } catch (error) {

        hideLoader();

        let errorText = "Login Failed!";

        switch (error.code) {

            case "auth/user-not-found":
                errorText = "User not found.";
                break;

            case "auth/wrong-password":
                errorText = "Incorrect password.";
                break;

            case "auth/invalid-credential":
                errorText = "Incorrect email or password.";
                break;

            case "auth/invalid-email":
                errorText = "Invalid email address.";
                break;

            case "auth/too-many-requests":
                errorText = "Too many attempts. Try again later.";
                break;

            default:
                errorText = error.message;
        }

        showMessage(
            errorText,
            "error"
        );
    }

});


// =====================================
// Google Sign In
// =====================================

googleBtn.addEventListener("click", async () => {

    showLoader();

    try {

        const result = await signInWithPopup(
            auth,
            googleProvider
        );

        showMessage(
            "Welcome " + (result.user.displayName || ""),
            "success"
        );

        // Remove loading immediately
        hideLoader();

        // Redirect immediately
        window.location.href = "dashboard.html";

    } catch (error) {

        hideLoader();

        showMessage(
            error.message,
            "error"
        );
    }

});


// =====================================
// Auto Login Check
// =====================================

onAuthStateChanged(auth, (user) => {

    if (user) {
        window.location.href = "dashboard.html";
    }

});


// =====================================
// Input Validation
// =====================================

email.addEventListener("input", () => {

    email.value = email.value.trim();

});

password.addEventListener("input", () => {

    if (password.value.length > 100) {

        password.value =
            password.value.substring(0, 100);

    }

});


// =====================================
// Enter Key Support
// =====================================

document.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        loginForm.requestSubmit();

    }

});


// =====================================
// Network Status
// =====================================

window.addEventListener("offline", () => {

    showMessage(
        "No Internet Connection",
        "error"
    );

});

window.addEventListener("online", () => {

    showMessage(
        "Internet Connected",
        "success"
    );

});


// =====================================
// Console Message
// =====================================

console.log(
    "%cPMD Learning Centre V2",
    "color:#F57C00;font-size:18px;font-weight:bold;"
);

console.log(
    "Login System Loaded Successfully."
);


// =====================================
// End of login.js
// =====================================
```
