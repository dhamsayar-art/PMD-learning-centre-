// =====================================
// PMD Learning Centre V2
// register.js (Part 1)
// =====================================

// Import Firebase

import {
    auth,
    db,
    googleProvider
} from "./firebase.js";

import {

    createUserWithEmailAndPassword,

    sendEmailVerification,

    signInWithPopup

} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import {

    doc,

    setDoc,

    serverTimestamp

} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// =====================================
// Form Elements
// =====================================

const registerForm =
document.getElementById("registerForm");

const fullName =
document.getElementById("fullName");

const email =
document.getElementById("email");

const mobile =
document.getElementById("mobile");

const dob =
document.getElementById("dob");

const gender =
document.getElementById("gender");

const course =
document.getElementById("course");

const password =
document.getElementById("password");

const confirmPassword =
document.getElementById("confirmPassword");

const message =
document.getElementById("message");

const loadingScreen =
document.getElementById("loadingScreen");

const googleSignup =
document.getElementById("googleSignup");

// =====================================
// Message Function
// =====================================

function showMessage(text,type){

message.style.display="block";

message.className="message "+type;

message.innerHTML=text;

setTimeout(()=>{

message.style.display="none";

},4000);

}

// =====================================
// Register Form Submit
// =====================================

registerForm.addEventListener("submit",

async(e)=>{

e.preventDefault();

loadingScreen.style.display="flex";

if(password.value!==confirmPassword.value){

loadingScreen.style.display="none";

showMessage(

"Passwords do not match",

"error"

);

return;

}

try{

const userCredential=

await createUserWithEmailAndPassword(

auth,

email.value.trim(),

password.value

);

const user=userCredential.user;
// =====================================
// Generate Student ID
// =====================================

const studentId =
"PMD" +
new Date().getFullYear() +
Math.floor(100000 + Math.random() * 900000);

// =====================================
// Save Student Data
// =====================================

await setDoc(doc(db,"students",user.uid),{

uid:user.uid,

studentId:studentId,

fullName:fullName.value.trim(),

email:email.value.trim(),

mobile:mobile.value.trim(),

dob:dob.value,

gender:gender.value,

course:course.value,

role:"student",

status:"active",

emailVerified:false,

createdAt:serverTimestamp()

});

// =====================================
// Email Verification
// =====================================

await sendEmailVerification(user);

// =====================================
// Success Message
// =====================================

loadingScreen.style.display="none";

showMessage(

"Registration Successful! Please verify your email.",

"success"

);

setTimeout(()=>{

window.location.href="login.html";

},2500);

}catch(error){

loadingScreen.style.display="none";

let errorText="Registration Failed.";

switch(error.code){

case "auth/email-already-in-use":

errorText="Email already registered.";

break;

case "auth/invalid-email":

errorText="Invalid email address.";

break;

case "auth/weak-password":

errorText="Password should be at least 6 characters.";

break;

default:

errorText=error.message;

}

showMessage(errorText,"error");

}

});

// =====================================
// Google Sign Up
// =====================================

googleSignup.addEventListener("click",async()=>{

loadingScreen.style.display="flex";

try{

const result=await signInWithPopup(

auth,

googleProvider

);

const user=result.user;

await setDoc(doc(db,"students",user.uid),{

uid:user.uid,

studentId:
"PMD"+
new Date().getFullYear()+
Math.floor(100000+Math.random()*900000),

fullName:user.displayName,

email:user.email,

photo:user.photoURL,

role:"student",

status:"active",

createdAt:serverTimestamp()

},{merge:true});

loadingScreen.style.display="none";

window.location.href="dashboard.html";

}catch(error){

loadingScreen.style.display="none";

showMessage(error.message,"error");

}

});

// =====================================
// PMD Learning Centre V2
// register.js Final
// =====================================

console.log(

"%cPMD Learning Centre V2",

"color:#F57C00;font-size:18px;font-weight:bold;"

);

console.log("Student Registration Ready.");