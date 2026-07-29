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