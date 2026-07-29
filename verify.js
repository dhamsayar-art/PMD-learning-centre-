// ======================================
// PMD Learning Centre V2
// verify.js (Part 1)
// ======================================

import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// ======================================
// Elements
// ======================================

const verifyInput =
document.getElementById("verifyInput");

const verifyBtn =
document.getElementById("verifyBtn");

const resultBox =
document.getElementById("resultBox");

const studentPhoto =
document.getElementById("studentPhoto");

const studentName =
document.getElementById("studentName");

const fatherName =
document.getElementById("fatherName");

const studentId =
document.getElementById("studentId");

const certificateNo =
document.getElementById("certificateNo");

const courseName =
document.getElementById("courseName");

const completionDate =
document.getElementById("completionDate");

const grade =
document.getElementById("grade");

const validUpto =
document.getElementById("validUpto");

const verificationStatus =
document.getElementById("verificationStatus");

// ======================================
// Verify Record
// ======================================

async function verifyRecord(){

    const value =
    verifyInput.value.trim();

    if(!value){

        alert(
        "Enter Student ID or Certificate Number."
        );

        return;

    }

    resultBox.style.display="none";

    // Search Certificates

    const certificates =
    await getDocs(
        collection(db,"certificates")
    );

    let record = null;

    certificates.forEach(doc=>{

        const data = doc.data();

        if(

            data.certificateNo===value ||

            data.studentId===value

        ){

            record = data;

        }

    });

    // Search ID Cards

    if(!record){

        const ids =
        await getDocs(
            collection(db,"idcards")
        );

        ids.forEach(doc=>{

            const data = doc.data();

            if(data.studentId===value){

                record = data;

            }

        });

    }

    if(record){

        studentPhoto.src =
        record.photoURL ||
        "images/default-user.png";

        studentName.innerText =
        record.studentName || "--";

        fatherName.innerText =
        record.fatherName || "--";

        studentId.innerText =
        record.studentId || "--";

        certificateNo.innerText =
        record.certificateNo || "--";

        courseName.innerText =
        record.course || "--";

        completionDate.innerText =
        record.completionDate || "--";

        grade.innerText =
        record.grade || "--";

        validUpto.innerText =
        record.validUpto || "--";

        verificationStatus.innerHTML =
        "✅ VERIFIED";

        verificationStatus.className =
        "status valid";

        resultBox.style.display="block";

    }else{

        verificationStatus.innerHTML =
        "❌ RECORD NOT FOUND";

        verificationStatus.className =
        "status invalid";

        resultBox.style.display="block";

    }

}

// ======================================
// Events
// ======================================

verifyBtn.addEventListener(
"click",
verifyRecord
);
// ======================================
// Auto Verify from URL
// ======================================

const urlParams = new URLSearchParams(
    window.location.search
);

const idParam =
urlParams.get("id");

const certificateParam =
urlParams.get("certificate");

if(idParam){

    verifyInput.value = idParam;

    verifyRecord();

}

if(certificateParam){

    verifyInput.value =
    certificateParam;

    verifyRecord();

}

// ======================================
// Enter Key Search
// ======================================

verifyInput.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        e.preventDefault();

        verifyRecord();

    }

});

// ======================================
// Refresh Verification
// ======================================

setInterval(()=>{

    if(
        verifyInput.value.trim()
    ){

        verifyRecord();

    }

},30000);

// ======================================
// Error Handling
// ======================================

window.addEventListener("error",(e)=>{

    console.error(

        "PMD Verify Error:",

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
"Verification Module Loaded Successfully"
);

// ======================================
// End of verify.js
// ======================================