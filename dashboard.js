import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, async (user) => {

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const snap = await getDoc(doc(db, "students", user.uid));

  if (snap.exists()) {
    const data = snap.data();

    userName.textContent = data.fullName;
    userEmail.textContent = data.email;
  }

});

logoutBtn.addEventListener("click", async () => {

  await signOut(auth);

  window.location.href = "login.html";

});
<h2 id="userName">Loading...</h2>

<p id="userEmail"></p>

<button id="logoutBtn">
Logout
</button>

<script type="module" src="js/firebase.js"></script>

<script type="module" src="js/dashboard.js"></script>