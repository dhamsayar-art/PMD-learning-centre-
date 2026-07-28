// ======================================
// PMD Learning Centre V2
// admin.js (Part 1)
// ======================================

// Firebase Imports

import {

auth,
db

} from "./firebase.js";

import {

onAuthStateChanged,
signOut

} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import {

collection,
getDocs

} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// ======================================
// Elements
// ======================================

const totalStudents =
document.getElementById("totalStudents");

const studentTable =
document.getElementById("studentTable");

// ======================================
// Admin Login Check
// ======================================

onAuthStateChanged(auth,(user)=>{

if(!user){

window.location.href="login.html";

return;

}

loadStudents();

});

// ======================================
// Load Students
// ======================================

async function loadStudents(){

studentTable.innerHTML="";

const snapshot=
await getDocs(collection(db,"students"));

totalStudents.innerHTML=
snapshot.size+" Students";

snapshot.forEach((doc)=>{

const data=doc.data();

studentTable.innerHTML+=`

<tr>

<td style="padding:12px;">

${data.studentId || "-"}

</td>

<td>

${data.fullName || "-"}

</td>

<td>

${data.course || "-"}

</td>

<td>

${data.status || "Active"}

</td>

</tr>

`;

});

}
// ======================================
// Search Students
// ======================================

const searchInput = document.querySelector(".search input");

if (searchInput) {

    searchInput.addEventListener("keyup", () => {

        const filter = searchInput.value.toLowerCase();

        const rows = studentTable.querySelectorAll("tr");

        rows.forEach(row => {

            if (row.innerText.toLowerCase().includes(filter)) {

                row.style.display = "";

            } else {

                row.style.display = "none";

            }

        });

    });

}

// ======================================
// Quick Action Buttons
// ======================================

document.querySelectorAll("button").forEach(button => {

    button.addEventListener("click", () => {

        const action = button.innerText;

        switch(action){

            case "Add Student":
                alert("Student Management Module");
                break;

            case "Add Teacher":
                alert("Teacher Management Module");
                break;

            case "Upload Notes":
                alert("Notes Upload Module");
                break;

            case "Create Quiz":
                alert("Quiz Creator Module");
                break;

            case "Add Course":
                alert("Course Management Module");
                break;

            case "Publish Notice":
                alert("Notice Board Module");
                break;

        }

    });

});

// ======================================
// Logout
// ======================================

async function logout(){

    try{

        await signOut(auth);

        window.location.href="login.html";

    }catch(error){

        alert(error.message);

    }

}

// Logout Link

document.querySelectorAll("a").forEach(link=>{

    if(link.textContent.includes("Logout")){

        link.addEventListener("click",(e)=>{

            e.preventDefault();

            logout();

        });

    }

});

// ======================================
// Auto Refresh
// ======================================

setInterval(()=>{

    loadStudents();

},30000);

// ======================================
// Console
// ======================================

console.log(

"%cPMD Learning Centre V2",

"color:#F57C00;font-size:18px;font-weight:bold;"

);

console.log("Admin Panel Loaded Successfully");

// ======================================
// End of admin.js
// ======================================