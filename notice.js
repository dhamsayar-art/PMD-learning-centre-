// ======================================
// PMD Learning Centre V2
// notice.js (Part 1)
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

const noticeForm =
document.getElementById("noticeForm");

const noticeTable =
document.getElementById("noticeTable");

const noticeTitle =
document.getElementById("noticeTitle");

const noticeDescription =
document.getElementById("noticeDescription");

const noticeFile =
document.getElementById("noticeFile");

const noticeAudience =
document.getElementById("noticeAudience");

const noticePriority =
document.getElementById("noticePriority");

const noticeDate =
document.getElementById("noticeDate");

// ======================================
// Load Notices
// ======================================

async function loadNotices(){

    noticeTable.innerHTML="";

    const snapshot =
    await getDocs(
        collection(db,"notices")
    );

    snapshot.forEach((doc)=>{

        const data = doc.data();

        noticeTable.innerHTML += `

<tr>

<td>${data.noticeId}</td>

<td>${data.title}</td>

<td>${data.audience}</td>

<td>${data.priority}</td>

<td>${data.date}</td>

<td>

<a href="${data.fileURL || "#"}"
target="_blank">

View File

</a>

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
// Save Notice
// ======================================

noticeForm.addEventListener("submit",async(e)=>{

    e.preventDefault();

    const noticeId =
    "NT"+
    Date.now().toString().slice(-6);

    let fileURL="";

    if(noticeFile.files.length){

        const file = noticeFile.files[0];

        const storageRef = ref(
            storage,
            "notices/"+Date.now()+"_"+file.name
        );

        await uploadBytes(
            storageRef,
            file
        );

        fileURL =
        await getDownloadURL(storageRef);

    }

    await addDoc(

        collection(db,"notices"),

        {

            noticeId,

            title:noticeTitle.value,

            description:noticeDescription.value,

            audience:noticeAudience.value,

            priority:noticePriority.value,

            date:noticeDate.value,

            fileURL,

            createdAt:
            serverTimestamp()

        }

    );

    alert("Notice Published Successfully");

    noticeForm.reset();

    noticeDate.value =
    new Date().toISOString().split("T")[0];

    loadNotices();

});

// Initial Load

loadNotices();
// ======================================
// Edit & Delete Notices
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
// Real-time Notice List
// ======================================

onSnapshot(collection(db,"notices"),()=>{

    loadNotices();

});

// ======================================
// Notice Events
// ======================================

noticeTable.addEventListener("click",async(e)=>{

    const row = e.target.closest("tr");

    if(!row) return;

    const noticeId = row.cells[0].innerText;

    const snapshot = await getDocs(
        collection(db,"notices")
    );

    // ==========================
    // Delete Notice
    // ==========================

    if(e.target.classList.contains("delete")){

        if(!confirm("Delete this notice?")) return;

        snapshot.forEach(async(item)=>{

            const data = item.data();

            if(data.noticeId===noticeId){

                try{

                    if(data.fileURL){

                        const fileRef = ref(
                            storage,
                            data.fileURL
                        );

                        await deleteObject(fileRef);

                    }

                }catch(err){

                    console.log(
                        "Attachment already removed."
                    );

                }

                await deleteDoc(
                    doc(db,"notices",item.id)
                );

            }

        });

    }

    // ==========================
    // Edit Notice Priority
    // ==========================

    if(e.target.classList.contains("edit")){

        const newPriority = prompt(
            "Enter Priority (Normal / Important / Urgent)",
            row.cells[3].innerText
        );

        if(!newPriority) return;

        snapshot.forEach(async(item)=>{

            if(item.data().noticeId===noticeId){

                await updateDoc(
                    doc(db,"notices",item.id),
                    {
                        priority:newPriority
                    }
                );

            }

        });

    }

    // ==========================
    // View Notice Details
    // ==========================

    if(e.target.classList.contains("view")){

        const data = Array.from(snapshot.docs)
            .find(d=>d.data().noticeId===noticeId)?.data();

        if(!data) return;

        alert(

`PMD Learning Centre

Notice Details

Title : ${data.title}

Description :
${data.description}

Audience : ${data.audience}

Priority : ${data.priority}

Date : ${data.date}`

        );

    }

});

// ======================================
// Error Handling
// ======================================

window.addEventListener("error",(e)=>{

    console.error(
        "PMD Notice Error:",
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

console.log("Notice Module Loaded Successfully");

// ======================================
// End of notice.js
// ======================================