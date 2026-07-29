// ======================================
// PMD Learning Centre V2
// reports.js (Part 1)
// ======================================

import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// ======================================
// Dashboard Elements
// ======================================

const studentCount =
document.getElementById("studentCount");

const teacherCount =
document.getElementById("teacherCount");

const feeCount =
document.getElementById("feeCount");

const attendanceCount =
document.getElementById("attendanceCount");

// ======================================
// Load Dashboard Statistics
// ======================================

async function loadStatistics(){

    // Students
    const students =
    await getDocs(
        collection(db,"students")
    );

    studentCount.innerText =
    students.size;

    // Teachers
    const teachers =
    await getDocs(
        collection(db,"teachers")
    );

    teacherCount.innerText =
    teachers.size;

    // Fees
    const fees =
    await getDocs(
        collection(db,"fees")
    );

    let totalFees = 0;

    fees.forEach(doc=>{

        const data = doc.data();

        totalFees +=
        Number(data.paid || 0);

    });

    feeCount.innerText =
    "₹" +
    totalFees.toLocaleString("en-IN");

    // Attendance

    const attendance =
    await getDocs(
        collection(db,"attendance")
    );

    let present = 0;

    attendance.forEach(doc=>{

        if(
        doc.data().status==="Present"
        ){

            present++;

        }

    });

    const percentage =

    attendance.size

    ?

    (
        present /
        attendance.size
    )*100

    :

    0;

    attendanceCount.innerText =
    percentage.toFixed(1)+"%";

}

// ======================================
// Initial Load
// ======================================

loadStatistics();
// ======================================
// Real-time Dashboard Updates
// ======================================

import {
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// Auto Refresh when data changes

onSnapshot(collection(db,"students"),()=>{

    loadStatistics();

});

onSnapshot(collection(db,"teachers"),()=>{

    loadStatistics();

});

onSnapshot(collection(db,"fees"),()=>{

    loadStatistics();

});

onSnapshot(collection(db,"attendance"),()=>{

    loadStatistics();

});

// ======================================
// Refresh Button
// ======================================

document
.getElementById("refreshBtn")
.addEventListener("click",()=>{

    loadStatistics();

    alert("Dashboard Refreshed Successfully");

});

// ======================================
// PDF Export
// ======================================

document
.getElementById("pdfBtn")
.addEventListener("click",()=>{

    window.print();

});

// ======================================
// Excel Export (CSV)
// ======================================

document
.getElementById("excelBtn")
.addEventListener("click",async()=>{

    const students =
    await getDocs(collection(db,"students"));

    let csv =
    "Name,Course,Mobile\n";

    students.forEach(doc=>{

        const d = doc.data();

        csv +=

`${d.name || ""},

${d.course || ""},

${d.mobile || ""}\n`;

    });

    const blob = new Blob(

        [csv],

        {

            type:"text/csv"

        }

    );

    const url =
    URL.createObjectURL(blob);

    const a =
    document.createElement("a");

    a.href = url;

    a.download =
    "PMD_Students_Report.csv";

    a.click();

    URL.revokeObjectURL(url);

});

// ======================================
// Error Handling
// ======================================

window.addEventListener("error",(e)=>{

    console.error(

        "PMD Reports Error:",

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

console.log(

"Reports Module Loaded Successfully"

);

// ======================================
// End of reports.js
// ======================================