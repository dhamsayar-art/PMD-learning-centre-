// ======================================
// PMD Learning Centre V2
// attendance.js (Part 1)
// ======================================

// Firebase Imports

import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// ======================================
// Elements
// ======================================

const attendanceForm =
document.getElementById("attendanceForm");

const attendanceTable =
document.getElementById("attendanceTable");

const personType =
document.getElementById("personType");

const personName =
document.getElementById("personName");

const courseName =
document.getElementById("courseName");

const attendanceDate =
document.getElementById("attendanceDate");

const attendanceStatus =
document.getElementById("attendanceStatus");

// ======================================
// Load Attendance
// ======================================

async function loadAttendance(){

    attendanceTable.innerHTML="";

    const snapshot =
    await getDocs(
        collection(db,"attendance")
    );

    snapshot.forEach((doc)=>{

        const data = doc.data();

        attendanceTable.innerHTML += `

<tr>

<td>${data.attendanceId}</td>

<td>${data.type}</td>

<td>${data.name}</td>

<td>${data.course}</td>

<td>${data.date}</td>

<td>${data.status}</td>

<td>

<button class="action-btn report">

Report

</button>

</td>

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
// Save Attendance
// ======================================

attendanceForm.addEventListener("submit",async(e)=>{

    e.preventDefault();

    const attendanceId =
    "ATT"+
    Date.now().toString().slice(-6);

    await addDoc(

        collection(db,"attendance"),

        {

            attendanceId,

            type:personType.value,

            name:personName.value,

            course:courseName.value,

            date:attendanceDate.value,

            status:attendanceStatus.value,

            createdAt:
            serverTimestamp()

        }

    );

    alert("Attendance Saved Successfully");

    attendanceForm.reset();

    attendanceDate.value =
    new Date().toISOString().split("T")[0];

    loadAttendance();

});

// Initial Load

loadAttendance();
// ======================================
// Edit & Delete Attendance
// ======================================

import {
    doc,
    updateDoc,
    deleteDoc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// ======================================
// Real-time Attendance
// ======================================

onSnapshot(collection(db,"attendance"),()=>{

    loadAttendance();

});

// ======================================
// Attendance Events
// ======================================

attendanceTable.addEventListener("click",async(e)=>{

    const row=e.target.closest("tr");

    if(!row) return;

    const attendanceId=row.cells[0].innerText;

    const snapshot=await getDocs(
        collection(db,"attendance")
    );

    // ==========================
    // Delete Attendance
    // ==========================

    if(e.target.classList.contains("delete")){

        if(!confirm("Delete this attendance record?")) return;

        snapshot.forEach(async(item)=>{

            if(item.data().attendanceId===attendanceId){

                await deleteDoc(
                    doc(db,"attendance",item.id)
                );

            }

        });

    }

    // ==========================
    // Edit Attendance Status
    // ==========================

    if(e.target.classList.contains("edit")){

        const newStatus=prompt(
            "Enter Status (Present / Absent / Late / Leave)",
            row.cells[5].innerText
        );

        if(!newStatus) return;

        snapshot.forEach(async(item)=>{

            if(item.data().attendanceId===attendanceId){

                await updateDoc(
                    doc(db,"attendance",item.id),
                    {
                        status:newStatus
                    }
                );

            }

        });

    }

    // ==========================
    // Attendance Report
    // ==========================

    if(e.target.classList.contains("report")){

        alert(

`PMD Learning Centre

Attendance Report

ID : ${row.cells[0].innerText}

Type : ${row.cells[1].innerText}

Name : ${row.cells[2].innerText}

Course : ${row.cells[3].innerText}

Date : ${row.cells[4].innerText}

Status : ${row.cells[5].innerText}`

        );

    }

});

// ======================================
// Error Handling
// ======================================

window.addEventListener("error",(e)=>{

    console.error(
        "PMD Attendance Error:",
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

console.log("Attendance Module Loaded Successfully");

// ======================================
// End of attendance.js
// ======================================