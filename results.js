// ======================================
// PMD Learning Centre V2
// results.js (Part 1)
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

const resultForm =
document.getElementById("resultForm");

const resultTable =
document.getElementById("resultTable");


const studentName =
document.getElementById("studentName");

const quizName =
document.getElementById("quizName");

const totalMarks =
document.getElementById("totalMarks");

const obtainedMarks =
document.getElementById("obtainedMarks");

const percentage =
document.getElementById("percentage");

const resultStatus =
document.getElementById("resultStatus");


// ======================================
// Load Results
// ======================================

async function loadResults(){

    resultTable.innerHTML="";


    const snapshot =
    await getDocs(
        collection(db,"results")
    );


    snapshot.forEach((doc)=>{


        const data =
        doc.data();


        resultTable.innerHTML += `

<tr>

<td>${data.resultId || "-"}</td>

<td>${data.student || "-"}</td>

<td>${data.quiz || "-"}</td>

<td>
${data.obtained || 0}
/
${data.total || 0}
</td>

<td>
${data.percentage || 0}%
</td>

<td>
${data.status || "-"}
</td>


<td>

<button class="action-btn view">

View

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
// Save Result
// ======================================

resultForm.addEventListener("submit",async(e)=>{

    e.preventDefault();


    const resultId =
    "RST" +
    Date.now().toString().slice(-6);


    const percent =
    ((Number(obtainedMarks.value) /
    Number(totalMarks.value))*100)
    .toFixed(2);



    await addDoc(

        collection(db,"results"),

        {

            resultId,

            student:studentName.value,

            quiz:quizName.value,

            total:Number(totalMarks.value),

            obtained:Number(obtainedMarks.value),

            percentage:Number(percent),

            status:
            percent >= 40
            ? "Pass"
            : "Fail",

            createdAt:
            serverTimestamp()

        }

    );


    alert(
    "Result Saved Successfully"
    );


    resultForm.reset();


    loadResults();


});


// Initial Load

loadResults();
