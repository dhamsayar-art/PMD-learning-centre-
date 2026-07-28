// ======================================
// PMD Learning Centre V2
// courses.js (Part 1)
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

const courseForm = document.getElementById("courseForm");
const courseTable = document.getElementById("courseTable");

const courseName = document.getElementById("courseName");
const courseTeacher = document.getElementById("courseTeacher");
const courseFee = document.getElementById("courseFee");
const courseDuration = document.getElementById("courseDuration");
const courseDescription = document.getElementById("courseDescription");
const courseStatus = document.getElementById("courseStatus");

// ======================================
// Load Courses
// ======================================

async function loadCourses(){

    courseTable.innerHTML = "";

    const snapshot = await getDocs(
        collection(db,"courses")
    );

    snapshot.forEach((doc)=>{

        const data = doc.data();

        courseTable.innerHTML += `

<tr>

<td>${data.courseId || "-"}</td>

<td>${data.courseName || "-"}</td>

<td>${data.teacher || "-"}</td>

<td>₹${data.fee || 0}</td>

<td>${data.duration || "-"}</td>

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
// Add Course
// ======================================

courseForm.addEventListener("submit", async(e)=>{

    e.preventDefault();

    const courseId =
        "CRS" +
        Date.now().toString().slice(-6);

    await addDoc(
        collection(db,"courses"),
        {

            courseId,

            courseName: courseName.value,

            teacher: courseTeacher.value,

            fee: Number(courseFee.value),

            duration: courseDuration.value,

            description: courseDescription.value,

            status: courseStatus.value,

            createdAt: serverTimestamp()

        }

    );

    alert("Course Added Successfully");

    courseForm.reset();

    loadCourses();

});

// Initial Load

loadCourses();
// ======================================
// Edit & Delete Course
// ======================================

import {
    doc,
    updateDoc,
    deleteDoc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// ======================================
// Real-time Course List
// ======================================

onSnapshot(collection(db,"courses"),()=>{

    loadCourses();

});

// ======================================
// Edit / Delete Events
// ======================================

courseTable.addEventListener("click",async(e)=>{

    const row=e.target.closest("tr");

    if(!row) return;

    const courseId=row.cells[0].innerText;

    // Delete Course

    if(e.target.classList.contains("delete")){

        if(!confirm("Delete this course?")) return;

        const snapshot=await getDocs(
            collection(db,"courses")
        );

        snapshot.forEach(async(item)=>{

            if(item.data().courseId===courseId){

                await deleteDoc(
                    doc(db,"courses",item.id)
                );

            }

        });

    }

    // Edit Course Status

    if(e.target.classList.contains("edit")){

        const newStatus=prompt(
            "Enter Status (Active / Inactive)",
            row.cells[5].innerText
        );

        if(!newStatus) return;

        const snapshot=await getDocs(
            collection(db,"courses")
        );

        snapshot.forEach(async(item)=>{

            if(item.data().courseId===courseId){

                await updateDoc(
                    doc(db,"courses",item.id),
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
        "PMD Course Error:",
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

console.log("Course Module Loaded Successfully");

// ======================================
// End of courses.js
// ======================================
