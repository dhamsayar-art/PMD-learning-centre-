// ======================================
// PMD Learning Centre v2.0
// script.js - Part 1
// ======================================

// Loader
window.addEventListener("load", function () {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.display = "none";
    }
});

// Welcome Message
document.addEventListener("DOMContentLoaded", function () {
    console.log("PMD Learning Centre Loaded Successfully");
});

// ======================================
// Dark Mode
// ======================================

function darkMode() {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme","dark");
    }else{
        localStorage.setItem("theme","light");
    }

}

window.onload = function(){

    if(localStorage.getItem("theme")=="dark"){
        document.body.classList.add("dark");
    }

};

// ======================================
// Banner Slider
// ======================================

let images = [

"images/banner1.jpg",
"images/banner2.jpg",
"images/banner3.jpg"

];

let index = 0;

setInterval(function(){

let slider=document.getElementById("slider");

if(slider){

index++;

if(index>=images.length){
index=0;
}

slider.src=images[index];

}

},3000);

// ======================================
// Search Subject
// ======================================

function searchSubject(){

let search=document.getElementById("searchInput").value.toLowerCase();

if(search=="math" || search=="mathematics" || search=="गणित"){

window.location.href="notes.html";

}

else if(search=="science" || search=="विज्ञान"){

window.location.href="notes.html";

}

else if(search=="computer"){

window.location.href="notes.html";

}

else if(search=="english"){

window.location.href="notes.html";

}

else if(search=="rajasthan gk"){

window.location.href="notes.html";

}

else{

alert("❌ Subject Not Found");

}

}

// ======================================
// Install App
// ======================================

let deferredPrompt;

window.addEventListener("beforeinstallprompt",(e)=>{

e.preventDefault();

deferredPrompt=e;

});

const installBtn=document.querySelector(".download-btn");

if(installBtn){

installBtn.addEventListener("click",async()=>{

if(deferredPrompt){

deferredPrompt.prompt();

}

});

}