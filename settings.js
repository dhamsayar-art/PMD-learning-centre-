// ======================================
// PMD Learning Centre V2
// settings.js (Part 1)
// ======================================

// Firebase Imports

import { db, storage } from "./firebase.js";

import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    doc,
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

const settingsForm = document.getElementById("settingsForm");

const instituteName = document.getElementById("instituteName");
const address = document.getElementById("address");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const website = document.getElementById("website");

const facebook = document.getElementById("facebook");
const instagram = document.getElementById("instagram");
const youtube = document.getElementById("youtube");

const themeColor = document.getElementById("themeColor");

const logoFile = document.getElementById("logoFile");
const bannerFile = document.getElementById("bannerFile");

// ======================================
// Load Settings
// ======================================

async function loadSettings(){

    const snapshot = await getDocs(
        collection(db,"settings")
    );

    snapshot.forEach((item)=>{

        const data = item.data();

        instituteName.value = data.name || "";
        address.value = data.address || "";
        phone.value = data.phone || "";
        email.value = data.email || "";
        website.value = data.website || "";

        facebook.value = data.facebook || "";
        instagram.value = data.instagram || "";
        youtube.value = data.youtube || "";

        themeColor.value = data.theme || "#F57C00";

    });

}

// ======================================
// Save Settings
// ======================================

settingsForm.addEventListener("submit",async(e)=>{

    e.preventDefault();

    let logoURL = "";
    let bannerURL = "";

    // Upload Logo

    if(logoFile.files.length){

        const file = logoFile.files[0];

        const logoRef = ref(
            storage,
            "settings/logo_"+Date.now()
        );

        await uploadBytes(
            logoRef,
            file
        );

        logoURL = await getDownloadURL(logoRef);

    }

    // Upload Banner

    if(bannerFile.files.length){

        const file = bannerFile.files[0];

        const bannerRef = ref(
            storage,
            "settings/banner_"+Date.now()
        );

        await uploadBytes(
            bannerRef,
            file
        );

        bannerURL = await getDownloadURL(bannerRef);

    }
// ======================================
// Save / Update Settings
// ======================================

    const settingsData = {

        name: instituteName.value,

        address: address.value,

        phone: phone.value,

        email: email.value,

        website: website.value,

        facebook: facebook.value,

        instagram: instagram.value,

        youtube: youtube.value,

        theme: themeColor.value,

        updatedAt: serverTimestamp()

    };

    if(logoURL){

        settingsData.logoURL = logoURL;

    }

    if(bannerURL){

        settingsData.bannerURL = bannerURL;

    }

    const snapshot = await getDocs(
        collection(db,"settings")
    );

    if(snapshot.empty){

        settingsData.createdAt = serverTimestamp();

        await addDoc(
            collection(db,"settings"),
            settingsData
        );

    }else{

        const docRef = doc(
            db,
            "settings",
            snapshot.docs[0].id
        );

        await updateDoc(
            docRef,
            settingsData
        );

    }

    alert("Settings Saved Successfully");

    loadSettings();

});

// ======================================
// Real-time Theme Preview
// ======================================

themeColor.addEventListener("change",()=>{

    document
    .documentElement
    .style
    .setProperty(
        "--theme-color",
        themeColor.value
    );

});

// ======================================
// Auto Load
// ======================================

loadSettings();

// ======================================
// Error Handling
// ======================================

window.addEventListener("error",(e)=>{

    console.error(
        "PMD Settings Error:",
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
"Settings Module Loaded Successfully"
);

// ======================================
// End of settings.js
// ======================================