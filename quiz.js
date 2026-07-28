// ======================================
// PMD Learning Centre V2
// quiz.js (Part 1)
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

const quizForm = document.getElementById("quizForm");
const quizTable = document.getElementById("quizTable");

const quizTitle = document.getElementById("quizTitle");
const quizCourse = document.getElementById("quizCourse");

const question = document.getElementById("question");

const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");

const correctAnswer = document.getElementById("correctAnswer");

const marks = document.getElementById("marks");
const timeLimit = document.getElementById("timeLimit");

const quizStatus = document.getElementById("quizStatus");

// ======================================
// Load Quiz
// ======================================

async function loadQuiz(){

    quizTable.innerHTML="";

    const snapshot =
    await getDocs(collection(db,"quiz"));

    snapshot.forEach((doc)=>{

        const data = doc.data();

        quizTable.innerHTML += `

<tr>

<td>${data.quizId}</td>

<td>${data.title}</td>

<td>${data.course}</td>

<td>${data.marks}</td>

<td>${data.time} Min</td>

<td>${data.status}</td>

<td>

<button class="action-btn start">

Start

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
// Save Quiz
// ======================================

quizForm.addEventListener("submit",async(e)=>{

    e.preventDefault();

    const quizId =
    "QZ"+
    Date.now().toString().slice(-6);

    await addDoc(

        collection(db,"quiz"),

        {

            quizId,

            title:quizTitle.value,

            course:quizCourse.value,

            question:question.value,

            optionA:option1.value,

            optionB:option2.value,

            optionC:option3.value,

            optionD:option4.value,

            correct:correctAnswer.value,

            marks:Number(marks.value),

            time:Number(timeLimit.value),

            status:quizStatus.value,

            createdAt:serverTimestamp()

        }

    );

    alert("Quiz Saved Successfully");

    quizForm.reset();

    loadQuiz();

});

// Initial Load

loadQuiz();
// ======================================
// Edit & Delete Quiz
// ======================================

import {
    doc,
    updateDoc,
    deleteDoc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// ======================================
// Real-time Quiz List
// ======================================

onSnapshot(collection(db,"quiz"),()=>{

    loadQuiz();

});

// ======================================
// Quiz Events
// ======================================

quizTable.addEventListener("click",async(e)=>{

    const row = e.target.closest("tr");

    if(!row) return;

    const quizId = row.cells[0].innerText;

    const snapshot = await getDocs(
        collection(db,"quiz")
    );

    // ==========================
    // Delete Quiz
    // ==========================

    if(e.target.classList.contains("delete")){

        if(!confirm("Delete this quiz?")) return;

        snapshot.forEach(async(item)=>{

            if(item.data().quizId===quizId){

                await deleteDoc(
                    doc(db,"quiz",item.id)
                );

            }

        });

    }

    // ==========================
    // Edit Quiz Status
    // ==========================

    if(e.target.classList.contains("edit")){

        const newStatus = prompt(
            "Enter Status (Published / Draft)",
            row.cells[5].innerText
        );

        if(!newStatus) return;

        snapshot.forEach(async(item)=>{

            if(item.data().quizId===quizId){

                await updateDoc(
                    doc(db,"quiz",item.id),
                    {
                        status:newStatus
                    }
                );

            }

        });

    }

    // ==========================
    // Start Quiz Preview
    // ==========================

    if(e.target.classList.contains("start")){

        alert(
            "Quiz Preview will be available in the Student Dashboard."
        );

    }

});

// ======================================
// Error Handling
// ======================================

window.addEventListener("error",(e)=>{

    console.error(
        "PMD Quiz Error:",
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

console.log("Quiz Module Loaded Successfully");

// ======================================
// End of quiz.js
// ======================================