// ======================================
// PMD Learning Centre V2
// fees.js (Part 1)
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

const feeForm = document.getElementById("feeForm");
const feeTable = document.getElementById("feeTable");

const studentName = document.getElementById("studentName");
const courseName = document.getElementById("courseName");

const totalFee = document.getElementById("totalFee");
const paidFee = document.getElementById("paidFee");
const dueFee = document.getElementById("dueFee");

const dueDate = document.getElementById("dueDate");
const paymentStatus = document.getElementById("paymentStatus");

// ======================================
// Load Fees
// ======================================

async function loadFees(){

    feeTable.innerHTML="";

    const snapshot =
    await getDocs(
        collection(db,"fees")
    );

    snapshot.forEach((doc)=>{

        const data = doc.data();

        feeTable.innerHTML += `

<tr>

<td>${data.feeId}</td>

<td>${data.student}</td>

<td>${data.course}</td>

<td>₹${data.total}</td>

<td>₹${data.paid}</td>

<td>₹${data.due}</td>

<td>${data.status}</td>

<td>

<button class="action-btn receipt">

Receipt

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
// Save Fee
// ======================================

feeForm.addEventListener("submit",async(e)=>{

    e.preventDefault();

    const feeId =
    "FEE"+
    Date.now().toString().slice(-6);

    await addDoc(

        collection(db,"fees"),

        {

            feeId,

            student:studentName.value,

            course:courseName.value,

            total:Number(totalFee.value),

            paid:Number(paidFee.value),

            due:Number(dueFee.value),

            dueDate:dueDate.value,

            status:paymentStatus.value,

            createdAt:serverTimestamp()

        }

    );

    alert("Fee Saved Successfully");

    feeForm.reset();

    dueFee.value="";

    loadFees();

});

// Initial Load

loadFees();
// ======================================
// Edit & Delete Fees
// ======================================

import {
    doc,
    updateDoc,
    deleteDoc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// ======================================
// Real-time Fee Records
// ======================================

onSnapshot(collection(db,"fees"),()=>{

    loadFees();

});

// ======================================
// Fee Events
// ======================================

feeTable.addEventListener("click",async(e)=>{

    const row = e.target.closest("tr");

    if(!row) return;

    const feeId = row.cells[0].innerText;

    const snapshot = await getDocs(
        collection(db,"fees")
    );

    // ==========================
    // Delete Fee
    // ==========================

    if(e.target.classList.contains("delete")){

        if(!confirm("Delete this fee record?")) return;

        snapshot.forEach(async(item)=>{

            if(item.data().feeId===feeId){

                await deleteDoc(
                    doc(db,"fees",item.id)
                );

            }

        });

    }

    // ==========================
    // Edit Payment Status
    // ==========================

    if(e.target.classList.contains("edit")){

        const newStatus = prompt(
            "Enter Status (Paid / Partial / Pending)",
            row.cells[6].innerText
        );

        if(!newStatus) return;

        snapshot.forEach(async(item)=>{

            if(item.data().feeId===feeId){

                await updateDoc(
                    doc(db,"fees",item.id),
                    {
                        status:newStatus
                    }
                );

            }

        });

    }

    // ==========================
    // Receipt Preview
    // ==========================

    if(e.target.classList.contains("receipt")){

        alert(

`PMD Learning Centre

Receipt

Fee ID : ${row.cells[0].innerText}

Student : ${row.cells[1].innerText}

Course : ${row.cells[2].innerText}

Total Fee : ${row.cells[3].innerText}

Paid : ${row.cells[4].innerText}

Due : ${row.cells[5].innerText}

Status : ${row.cells[6].innerText}

Thank You`

        );

    }

});

// ======================================
// Error Handling
// ======================================

window.addEventListener("error",(e)=>{

    console.error(
        "PMD Fee Error:",
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

console.log("Fee Module Loaded Successfully");

// ======================================
// End of fees.js
// ======================================