// PMD Learning Centre

document.addEventListener("DOMContentLoaded", () => {
    alert("PMD Learning Centre में आपका स्वागत है!");
});

const button = document.querySelector(".hero button");

if(button){
    button.addEventListener("click", () => {
        alert("जल्द ही सभी Free Notes और Quiz उपलब्ध होंगे।");
    });
}
window.addEventListener("load", function () {
  document.getElementById("loader").style.display = "none";
});
function searchSubject() {

let search = document.getElementById("searchInput").value.toLowerCase();

if(search=="math" || search=="गणित"){
window.location.href="subjects.html";
}

else if(search=="science" || search=="विज्ञान"){
window.location.href="subjects.html";
}

else if(search=="history" || search=="इतिहास"){
window.location.href="subjects.html";
}

else{
alert("Subject नहीं मिला");
}

}
function darkMode() {
    document.body.classList.toggle("dark");
}