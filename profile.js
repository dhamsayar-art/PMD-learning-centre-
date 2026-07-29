// ======================================
// PMD Learning Centre V2
// profile.js (Part 1)
// ======================================

// Firebase Imports

import { db, storage, auth } from "./firebase.js";

import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

import {
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// ======================================
// Elements
// ======================================

const profileForm = document.getElementById("profileForm");

const profileImage = document.getElementById("profileImage");
const profilePreview = document.getElementById("profilePreview");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const mobile = document.getElementById("mobile");
const dob = document.getElementById("dob");
const gender = document.getElementById("gender");
const address = document.getElementById("address");
const course = document.getElementById("course");
const qualification = document.getElementById("qualification");

let currentUser = null;

// ======================================
// Load Profile
// ======================================

onAuthStateChanged(auth, async(user)=>{

    if(!user){

        window.location.href="login.html";
        return;

    }

    currentUser = user;

    email.value = user.email || "";

    const profileRef = doc(db,"profiles",user.uid);

    const profileSnap = await getDoc(profileRef);

    if(profileSnap.exists()){

        const data = profileSnap.data();

        fullName.value = data.fullName || "";
        mobile.value = data.mobile || "";
        dob.value = data.dob || "";
        gender.value = data.gender || "";
        address.value = data.address || "";
        course.value = data.course || "";
        qualification.value = data.qualification || "";

        if(data.photoURL){

            profilePreview.src = data.photoURL;

        }

    }

});
// ======================================
// Save / Update Profile
// ======================================

profileForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    if (!currentUser) return;

    let photoURL = profilePreview.src;

    // ==============================
    // Upload Profile Image
    // ==============================

    if (profileImage.files.length) {

        const file = profileImage.files[0];

        const storageRef = ref(
            storage,
            `profiles/${currentUser.uid}`
        );

        await uploadBytes(storageRef, file);

        photoURL =
        await getDownloadURL(storageRef);

    }

    // ==============================
    // Save Profile
    // ==============================

    await setDoc(

        doc(db,"profiles",currentUser.uid),

        {

            uid: currentUser.uid,

            fullName: fullName.value,

            email: email.value,

            mobile: mobile.value,

            dob: dob.value,

            gender: gender.value,

            address: address.value,

            course: course.value,

            qualification: qualification.value,

            photoURL: photoURL,

            updatedAt: serverTimestamp()

        },

        {

            merge:true

        }

    );

    profilePreview.src = photoURL;

    document.getElementById("profileName").innerText =
    fullName.value;

    document.getElementById("profileEmail").innerText =
    email.value;

    alert("Profile Updated Successfully");

});

// ======================================
// Live Image Preview
// ======================================

profileImage.addEventListener("change",()=>{

    const file = profileImage.files[0];

    if(file){

        profilePreview.src =
        URL.createObjectURL(file);

    }

});

// ======================================
// Error Handling
// ======================================

window.addEventListener("error",(e)=>{

    console.error(

        "PMD Profile Error:",

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

"Profile Module Loaded Successfully"

);

// ======================================
// End of profile.js
// ======================================