btn = document.getElementById("bbbtn1")
const Http = new XMLHttpRequest();
var request = new XMLHttpRequest();
request.open("GET", "./down/reason.json", false);
request.send(null);
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const uid = urlParams.get('uid')
const domain = "https://www.gruleiru.de"
document.getElementById("regoutbtn").addEventListener("click", onSubmit)
var jsonData = JSON.parse(request.responseText);
if (jsonData["reason"] == "none") {

} else {
    location.href = jsonData["reason"] + ".html"
}

function onSubmit() {
    document.getElementById("st").innerHTML = "Sie haben ihr kind erfolgreich abgemeldet! Eine erneute Anmeldung ist möglicherweise nicht mehr möglich."
    document.getElementById("regoutbtn").style.display = "none"
    console.log("submitted")
    const url = `https://hefa.gruleiru.de/unregev?uid=${uid}`;
    Http.open("GET", url);
    Http.send();
    Http.onload = (e) => {
    }

}

