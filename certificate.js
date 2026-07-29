// ======================================
// PMD Learning Centre V2
// certificate.js (Part 1)
// ======================================

import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// ======================================
// Elements
// ======================================

const certificateForm =
document.getElementById("certificateForm");

const studentName =
document.getElementById("studentName");

const fatherName =
document.getElementById("fatherName");

const certificateNo =
document.getElementById("certificateNo");

const courseName =
document.getElementById("courseName");

const completionDate =
document.getElementById("completionDate");

const grade =
document.getElementById("grade");

// ======================================
// Auto Certificate Number
// ======================================

function generateCertificateNo(){

    const year =
    new Date().getFullYear();

    const random =
    Math.floor(
        1000 +
        Math.random()*9000
    );

    certificateNo.value =
    `PMD-${year}-${random}`;

}

generateCertificateNo();

// ======================================
// Load Students
// ======================================

async function loadStudents(){

    const snapshot =
    await getDocs(
        collection(db,"students")
    );

    console.log(
        "Students Loaded:",
        snapshot.size
    );

}

loadStudents();

// ======================================
// Save Certificate
// ======================================

certificateForm.addEventListener("submit",async(e)=>{

    e.preventDefault();

    await addDoc(

        collection(db,"certificates"),

        {

            certificateNo:
            certificateNo.value,

            studentName:
            studentName.value,

            fatherName:
            fatherName.value,

            course:
            courseName.value,

            completionDate:
            completionDate.value,

            grade:
            grade.value,

            createdAt:
            serverTimestamp()

        }

    );

    alert(
        "Certificate Saved Successfully"
    );

});
// ======================================
// Real-time Certificate Updates
// ======================================

import {
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// ======================================
// Auto Refresh
// ======================================

onSnapshot(
    collection(db,"certificates"),
    ()=>{

        console.log(
            "Certificate Database Updated"
        );

    }
);

// ======================================
// Print Certificate
// ======================================

document
.getElementById("printCertificate")
.addEventListener("click",()=>{

    window.print();

});

// ======================================
// Download Certificate PDF
// ======================================

document
.getElementById("downloadPdf")
.addEventListener("click",()=>{

    window.print();

});

// ======================================
// QR Verification Link
// ======================================

function getVerificationURL(){

    return `${location.origin}/verify.html?certificate=${
        encodeURIComponent(
            certificateNo.value
        )
    }`;

}

console.log(
    "Verification URL:",
    getVerificationURL()
);

// ======================================
// Verify Certificate
// ======================================

async function verifyCertificate(number){

    const snapshot =
    await getDocs(
        collection(db,"certificates")
    );

    let found = false;

    snapshot.forEach(doc=>{

        if(
            doc.data().certificateNo === number
        ){

            found = true;

        }

    });

    return found;

}

// ======================================
// Error Handling
// ======================================

window.addEventListener("error",(e)=>{

    console.error(
        "PMD Certificate Error:",
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
"Certificate Module Loaded Successfully"
);

// ======================================
// End of certificate.js
// ======================================