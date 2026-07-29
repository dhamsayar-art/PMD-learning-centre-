// ======================================
// PMD Learning Centre V2
// idcard.js (Part 1)
// ======================================

import { db, storage } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

import {
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

// ======================================
// Elements
// ======================================

const form = document.getElementById("idCardForm");

const studentId = document.getElementById("studentId");
const studentName = document.getElementById("studentName");
const fatherName = document.getElementById("fatherName");
const mobile = document.getElementById("mobile");
const course = document.getElementById("course");
const validUpto = document.getElementById("validUpto");
const studentPhoto = document.getElementById("studentPhoto");

// ======================================
// Load Students
// ======================================

async function loadStudents(){

    const snapshot = await getDocs(
        collection(db,"students")
    );

    console.log(
        "Total Students:",
        snapshot.size
    );

}

loadStudents();

// ======================================
// Save ID Card
// ======================================

form.addEventListener("submit",async(e)=>{

    e.preventDefault();

    let photoURL = "";

    if(studentPhoto.files.length){

        const file = studentPhoto.files[0];

        const storageRef = ref(
            storage,
            "idcards/"+Date.now()+"_"+file.name
        );

        await uploadBytes(
            storageRef,
            file
        );

        photoURL =
        await getDownloadURL(storageRef);

    }

    await addDoc(

        collection(db,"idcards"),

        {

            studentId:
            studentId.value,

            studentName:
            studentName.value,

            fatherName:
            fatherName.value,

            mobile:
            mobile.value,

            course:
            course.value,

            validUpto:
            validUpto.value,

            photoURL,

            createdAt:
            serverTimestamp()

        }

    );

    alert(
        "Student ID Card Saved Successfully"
    );

});
// ======================================
// Real-time Updates
// ======================================

import {
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// ======================================
// Auto Refresh
// ======================================

onSnapshot(
    collection(db,"idcards"),
    ()=>{

        console.log(
            "ID Card Database Updated"
        );

    }
);

// ======================================
// QR Code Generation
// ======================================

function generateQRCode(){

    const qrContainer =
    document.getElementById("qrCode");

    qrContainer.innerHTML = "";

    const verifyURL =

    `${location.origin}/verify.html?id=${encodeURIComponent(studentId.value)}`;

    const img =
    document.createElement("img");

    img.src =
    `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(verifyURL)}`;

    img.alt = "QR Code";

    qrContainer.appendChild(img);

}

studentId.addEventListener(
    "input",
    generateQRCode
);

// ======================================
// Print
// ======================================

document
.getElementById("printIdCard")
.addEventListener("click",()=>{

    generateQRCode();

    setTimeout(()=>{

        window.print();

    },300);

});

// ======================================
// Download PDF
// ======================================

document
.getElementById("downloadIdCard")
.addEventListener("click",()=>{

    generateQRCode();

    window.print();

});

// ======================================
// Verify Student ID
// ======================================

async function verifyStudentId(id){

    const snapshot =
    await getDocs(
        collection(db,"idcards")
    );

    let found = false;

    snapshot.forEach(doc=>{

        if(
            doc.data().studentId === id
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

        "PMD ID Card Error:",

        e.message

    );

});

// ======================================
// Initial QR
// ======================================

generateQRCode();

// ======================================
// Console
// ======================================

console.log(

"%cPMD Learning Centre V2",

"color:#F57C00;font-size:18px;font-weight:bold;"

);

console.log(
"ID Card Module Loaded Successfully"
);

// ======================================
// End of idcard.js
// ======================================