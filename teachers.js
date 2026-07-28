// ======================================
// PMD Learning Centre V2
// teachers.js (Part 1)
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

const teacherForm = document.getElementById("teacherForm");
const teacherTable = document.getElementById("teacherTable");

const teacherName = document.getElementById("teacherName");
const teacherEmail = document.getElementById("teacherEmail");
const teacherMobile = document.getElementById("teacherMobile");
const teacherCourse = document.getElementById("teacherCourse");
const teacherStatus = document.getElementById("teacherStatus");

// ======================================
// Load Teachers
// ======================================

async function loadTeachers(){

    teacherTable.innerHTML = "";

    const snapshot = await getDocs(
        collection(db,"teachers")
    );

    snapshot.forEach((doc)=>{

        const data = doc.data();

        teacherTable.innerHTML += `

<tr>

<td>${data.teacherId || "-"}</td>

<td>${data.fullName || "-"}</td>

<td>${data.email || "-"}</td>

<td>${data.mobile || "-"}</td>

<td>${data.course || "-"}</td>

<td>${data.status || "Active"}</td>

<td>

<button class="action-btn edit">

Edit

</button>

<button class="action-btn delete">

Delete

</button>

</td>

</tr>

`;

    });

}

// ======================================
// Add Teacher
// ======================================

teacherForm.addEventListener("submit", async(e)=>{

    e.preventDefault();

    const teacherId =
        "TCH" +
        Date.now().toString().slice(-6);

    await addDoc(
        collection(db,"teachers"),
        {

            teacherId,

            fullName: teacherName.value,

            email: teacherEmail.value,

            mobile: teacherMobile.value,

            course: teacherCourse.value,

            status: teacherStatus.value,

            createdAt: serverTimestamp()

        }

    );

    alert("Teacher Added Successfully");

    teacherForm.reset();

    loadTeachers();

});

// Initial Load

loadTeachers();
// ======================================
// Edit & Delete Teacher
// ======================================

import {
    doc,
    updateDoc,
    deleteDoc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// ======================================
// Real-time Teacher List
// ======================================

onSnapshot(collection(db,"teachers"),()=>{

    loadTeachers();

});

// ======================================
// Edit / Delete Events
// ======================================

teacherTable.addEventListener("click",async(e)=>{

    const row=e.target.closest("tr");

    if(!row) return;

    const teacherId=row.cells[0].innerText;

    // Delete Teacher

    if(e.target.classList.contains("delete")){

        if(!confirm("Delete this teacher?")) return;

        const snapshot=await getDocs(
            collection(db,"teachers")
        );

        snapshot.forEach(async(item)=>{

            if(item.data().teacherId===teacherId){

                await deleteDoc(
                    doc(db,"teachers",item.id)
                );

            }

        });

    }

    // Edit Teacher Status

    if(e.target.classList.contains("edit")){

        const newStatus=prompt(
            "Enter Status (Active / Inactive)",
            row.cells[5].innerText
        );

        if(!newStatus) return;

        const snapshot=await getDocs(
            collection(db,"teachers")
        );

        snapshot.forEach(async(item)=>{

            if(item.data().teacherId===teacherId){

                await updateDoc(
                    doc(db,"teachers",item.id),
                    {
                        status:newStatus
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

    console.error(
        "PMD Teacher Error:",
        e.message
    );

});

// ======================================
// Console
// ======================================

console.log(

"%cPMD Learning Centre V2",

"color:#F57C00;font-size:18px;font-weight:bold;"

);

console.log("Teacher Module Loaded Successfully");

// ======================================
// End of teachers.js
// ======================================