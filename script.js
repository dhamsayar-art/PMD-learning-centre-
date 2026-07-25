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