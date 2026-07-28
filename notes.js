// ======================================
// PMD Learning Centre V2
// notes.js (Part 1)
// ======================================

// Firebase Imports

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

const notesForm = document.getElementById("notesForm");
const notesTable = document.getElementById("notesTable");

const noteTitle = document.getElementById("noteTitle");
const noteCourse = document.getElementById("noteCourse");
const noteSubject = document.getElementById("noteSubject");
const noteFile = document.getElementById("noteFile");
const noteDescription = document.getElementById("noteDescription");
const noteStatus = document.getElementById("noteStatus");

// ======================================
// Load Notes
// ======================================

async function loadNotes(){

    notesTable.innerHTML = "";

    const snapshot = await getDocs(
        collection(db,"notes")
    );

    snapshot.forEach((doc)=>{

        const data = doc.data();

        notesTable.innerHTML += `

<tr>

<td>${data.noteId || "-"}</td>

<td>${data.title || "-"}</td>

<td>${data.course || "-"}</td>

<td>${data.subject || "-"}</td>

<td>${data.status || "-"}</td>

<td>

<a href="${data.fileURL}"
target="_blank">

<button class="action-btn download">

Download

</button>

</a>

</td>

<td>

<button
class="action-btn edit">

Edit

</button>

<button
class="action-btn delete">

Delete

</button>

</td>

</tr>

`;

    });

}

// ======================================
// Upload Notes
// ======================================

notesForm.addEventListener("submit",async(e)=>{

    e.preventDefault();

    const file = noteFile.files[0];

    if(!file){

        alert("Please select a PDF.");

        return;

    }

    const noteId =
        "NTS" +
        Date.now().toString().slice(-6);

    const storageRef =
        ref(storage,"notes/"+noteId+"_"+file.name);

    await uploadBytes(storageRef,file);

    const fileURL =
        await getDownloadURL(storageRef);

    await addDoc(
        collection(db,"notes"),
        {

            noteId,

            title:noteTitle.value,

            course:noteCourse.value,

            subject:noteSubject.value,

            description:noteDescription.value,

            status:noteStatus.value,

            fileURL:fileURL,

            createdAt:serverTimestamp()

        }

    );

    alert("Notes Uploaded Successfully");

    notesForm.reset();

    loadNotes();

});

// Initial Load

loadNotes();
// ======================================
// Edit & Delete Notes
// ======================================

import {
    doc,
    updateDoc,
    deleteDoc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

import {
    ref,
    deleteObject
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

// ======================================
// Real-time Notes List
// ======================================

onSnapshot(collection(db,"notes"),()=>{

    loadNotes();

});

// ======================================
// Edit / Delete Events
// ======================================

notesTable.addEventListener("click",async(e)=>{

    const row=e.target.closest("tr");

    if(!row) return;

    const noteId=row.cells[0].innerText;

    const snapshot=await getDocs(
        collection(db,"notes")
    );

    // Delete Notes

    if(e.target.classList.contains("delete")){

        if(!confirm("Delete these notes?")) return;

        snapshot.forEach(async(item)=>{

            const data=item.data();

            if(data.noteId===noteId){

                try{

                    if(data.fileURL){

                        const fileRef=ref(storage,data.fileURL);

                        await deleteObject(fileRef);

                    }

                }catch(err){

                    console.log("Storage file already removed.");

                }

                await deleteDoc(
                    doc(db,"notes",item.id)
                );

            }

        });

    }

    // Edit Notes Status

    if(e.target.classList.contains("edit")){

        const newStatus=prompt(
            "Enter Status (Published / Draft)",
            row.cells[4].innerText
        );

        if(!newStatus) return;

        snapshot.forEach(async(item)=>{

            if(item.data().noteId===noteId){

                await updateDoc(
                    doc(db,"notes",item.id),
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
        "PMD Notes Error:",
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

console.log("Notes Module Loaded Successfully");

// ======================================
// End of notes.js
// ======================================