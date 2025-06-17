"data" : {
    "id" : 1,
        "text" : "new Symulti update !",
        "link" : "href://www.symulti.com"
}btn = document.getElementById("bbbtn1")
const Http = new XMLHttpRequest();
var request = new XMLHttpRequest();
request.open("GET", "./down/reason.json", false);
request.send(null);
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const domain = "https://www.gruleiru.de"
document.getElementById("regoutbtn").addEventListener("click", onSubmit)
var jsonData = JSON.parse(request.responseText);
if (jsonData["reason"] == "none") {

} else {
    location.href = jsonData["reason"] + ".html"
}

function onSubmit() {
    document.getElementById("st").innerHTML = "Ihre Support Anfrage wurde erfolgreich eingereicht!"
    console.log("submitted")
    cs = document.getElementById("case").value
    mail = document.getElementById("mail").value
    const url = `https://hefa.gruleiru.de/support?case=${cs}&&mail=${mail}`;
    Http.open("GET", url);
    Http.send();
    Http.onload = (e) => {
    }

}

$(function () {
    'use strict';


    $('.form-control').on('input', function () {
        var $field = $(this).closest('.form-group');
        if (this.value) {
            $field.addClass('field--not-empty');
        } else {
            $field.removeClass('field--not-empty');
        }
    });

});