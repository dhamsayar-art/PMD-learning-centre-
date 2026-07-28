// ======================================
// PMD Learning Centre V2
// students.js (Part 1)
// ======================================

// Firebase Imports

import {
    db
} from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// ======================================
// Elements
// ======================================

const studentForm = document.getElementById("studentForm");
const studentTable = document.getElementById("studentTable");

const studentName = document.getElementById("studentName");
const studentEmail = document.getElementById("studentEmail");
const studentMobile = document.getElementById("studentMobile");
const studentCourse = document.getElementById("studentCourse");
const studentStatus = document.getElementById("studentStatus");

// ======================================
// Load Students
// ======================================

async function loadStudents(){

    studentTable.innerHTML = "";

    const snapshot = await getDocs(
        collection(db,"students")
    );

    snapshot.forEach((doc)=>{

        const data = doc.data();

        studentTable.innerHTML += `

<tr>

<td>${data.studentId || "-"}</td>

<td>${data.fullName || "-"}</td>

<td>${data.email || "-"}</td>

<td>${data.mobile || "-"}</td>

<td>${data.course || "-"}</td>

<td>${data.status || "Active"}</td>

<td>

<button
class="action-btn edit">

Edit

</button>

<button
class="action-btn delete">

Delete

</button>

</td>

</tr>

`;

    });

}

// ======================================
// Add Student
// ======================================

studentForm.addEventListener("submit",async(e)=>{

    e.preventDefault();

    const studentId =
        "PMD" +
        Date.now().toString().slice(-6);

    await addDoc(
        collection(db,"students"),
        {

            studentId,

            fullName:studentName.value,

            email:studentEmail.value,

            mobile:studentMobile.value,

            course:studentCourse.value,

            status:studentStatus.value,

            createdAt:serverTimestamp()

        }

    );

    alert("Student Added Successfully");

    studentForm.reset();

    loadStudents();

});

// Initial Load

loadStudents();
// ======================================
// Edit & Delete Student
// ======================================

import {
    doc,
    updateDoc,
    deleteDoc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// ======================================
// Real-time Student List
// ======================================

onSnapshot(collection(db,"students"), () => {

    loadStudents();

});

// ======================================
// Edit / Delete Events
// ======================================

studentTable.addEventListener("click", async (e) => {

    const row = e.target.closest("tr");

    if (!row) return;

    const studentId = row.cells[0].innerText;

    // Delete Student
    if (e.target.classList.contains("delete")) {

        if (!confirm("Delete this student?")) return;

        const snapshot = await getDocs(collection(db,"students"));

        snapshot.forEach(async (item) => {

            if (item.data().studentId === studentId) {

                await deleteDoc(doc(db,"students",item.id));

            }

        });

    }

    // Edit Student Status
    if (e.target.classList.contains("edit")) {

        const newStatus = prompt(
            "Enter Status (Active / Inactive)",
            row.cells[5].innerText
        );

        if (!newStatus) return;

        const snapshot = await getDocs(collection(db,"students"));

        snapshot.forEach(async (item) => {

            if (item.data().studentId === studentId) {

                await updateDoc(
                    doc(db,"students",item.id),
                    {
                        status: newStatus
                    }
                );

            }

        });

    }

});

// ======================================
// Error Handling
// ======================================

window.addEventListener("error",(e)=>{

    console.error("PMD Error:",e.message);

});

// ======================================
// Console
// ======================================

console.log(
"%cPMD Learning Centre V2",
"color:#F57C00;font-size:18px;font-weight:bold;"
);

console.log("Students Module Loaded Successfully");

// ======================================
// End of students.js
// ======================================