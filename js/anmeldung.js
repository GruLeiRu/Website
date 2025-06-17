btn = document.getElementById("bbbtn1")
const Http = new XMLHttpRequest();
var request = new XMLHttpRequest();
pname = document.getElementById("username")
paddr = document.getElementById("adresse")
pemail = document.getElementById("eadresse")
cname = document.getElementById("cname")
cdate = document.getElementById("cbd")
further = document.getElementById("fur")
request.open("GET", "./down/reason.json", false);
request.send(null);
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const domain = "https://www.gruleiru.de"
var jsonData = JSON.parse(request.responseText);
if (jsonData["reason"] == "none") {

} else {
    location.href = jsonData["reason"] + ".html"
}



var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();

date =  new Date(yyyy + '-' + mm + '-' + dd)

const start = new Date(yyyy + '-02-01,00:00:00')
const end = new Date(yyyy + '-07-02,00:00:00')
console.log(end)
console.log(start)
if(date > end){
    yyyy = yyyy + 1
}

const t1 = today
const t2 = new Date(`${yyyy}-02-01`)


// const diff = t2-t1
// const SEC = 1000, MIN = 60 * SEC, HRS = 60 * MIN, DD = 24 * HRS
// const untilTime = `${Math.floor(diff/DD)}Tage, ${Math.floor(diff%DD/HRS)}Stunden, ${Math.floor((diff%HRS)/MIN).toLocaleString('de-DE', {minimumIntegerDigits: 2})}Minuten und ${Math.floor((diff%MIN)/SEC).toLocaleString('de-DE', {minimumIntegerDigits: 2})}.${parseInt(Math.floor(diff % SEC).toLocaleString('de-DE', {minimumIntegerDigits: 4, useGrouping: false}), 10)}Sekunden`
// console.log(urlParams.get('force'))
// if (date > start && date < end || urlParams.get('force') == "true") {
//   console.log('✅ open');
//   document.getElementById("border2").style.height = "0%"
// } else {
//   console.log('⛔️ closed');
//   document.getElementById("border2").style.height = "150%"
//   document.getElementById("fdiv").innerHTML = `<h4 style="margin-top: 10px;">HeFa Anmeldung</h4>
// <p>Sie besuchen die Website nicht in dem offenen Zeitfenster. (1.2.${yyyy}.00:00-1.7.${yyyy}.00:00) Bitte schauen sie in ${untilTime} erneut</p>
// `
// }
const checkURL = "https://cd.gruleiru.de"
Http.open("GET", checkURL);
Http.send();
Http.onload = (e) => {
    response = JSON.parse(Http.responseText);
    monthsL = response["monthsLeft"]
    daysL = response["daysLeft"]
    auth = response["auth"]
    if (auth == "1") {
        document.getElementById("border2").style.height = "0%"
    } else {
        const HttpPublicSettings = new XMLHttpRequest();
        const urlPublicSettings='https://regapi.gruleiru.de/publicSettings';
        HttpPublicSettings.open("GET", urlPublicSettings);
        HttpPublicSettings.send();
        HttpPublicSettings.onload = (e) => {
            response = JSON.parse(HttpPublicSettings.responseText);
            console.log(response["settings"])
            if (response["error"] == "ok"){
                if (response["settings"]["openRegistry"] == "1") {
                    document.getElementById("border2").style.height = "0%"
                } else {
                    document.getElementById("border2").style.height = "150%"
                    document.getElementById("fdiv").innerHTML = `<h4 style="margin-top: 10px;">HeFa Anmeldung</h4>
                    <p>Sie besuchen die Website nicht in dem offenen Zeitfenster. (1.11-1.7) Bitte probieren Sie es in ${monthsL} Monaten und ${daysL} Tagen erneut</p> `
            
                }
            }
        }
    }
}



function onSubmit() {
    if (checked == 1) {
        emptyValues = 0
        console.log("submitted")
        pname = document.getElementById("username")
        paddr = document.getElementById("adresse")
        pemail = document.getElementById("eadresse")
        tnm = document.getElementById("tnm")
        cname = document.getElementById("cname")
        cdate = document.getElementById("cbd")
        further = document.getElementById("fur")
        furtherList = document.getElementById("furL")
        zust = document.getElementById("zust")
        furtherF = further.value + " {" + furtherList.value + "}"
        if (cname.value == "") {
            cname.style.borderColor = "red"
            emptyValues = 1
        }
        if (cdate.value == "") {
            cdate.style.borderColor = "red"
            emptyValues = 1
        }
        if (pname.value == "") {
            pname.style.borderColor = "red"
            emptyValues = 1
        }
        if (paddr.value == "") {
            paddr.style.borderColor = "red"
            emptyValues = 1
        }
        if (pemail.value == "") {
            pemail.style.borderColor = "red"
            emptyValues = 1
        }
        if (tnm.value == "") {
            tnm.style.borderColor = "red"
            emptyValues = 1
        }
        if (zust.checked == false) {
            zust.style.borderColor = "red"
            emptyValues = 1
        }
        if (emptyValues >= 1) {
            alert("Bitten füllen Sie alle Felder aus!")
            return
        }
        console.log(pname.value)
        document.getElementById("border").style.height = "100vh"
        const url = `https://hefa.gruleiru.de/reg?pname=${pname.value}&&pdate=empty&&paddr=${paddr.value}&&pemail=${pemail.value}&&cname=${cname.value}&&cdate=${cdate.value}&&further=${furtherF}&&tel=${tnm.value}`;
        Http.open("GET", url);
        Http.send();
        Http.onload = (e) => {
            response = JSON.parse(Http.responseText);
            console.log(response["code"])
            code = response["code"]
            if(code=="reg") {
                document.getElementById("fdiv").innerHTML = `<h4 style="margin-top: 10px;">HeFa Anmeldung</h4>
                <p>Sie haben ihr Kind (${cname.value}) erfolgreich für die HeFa angemeldet. Sie bekommen eine Bestätigung per Mail. Bitte überprüfen Sie auch ihr Spam Postfach. Falls sie keine Mail erhalten, wenden Sie sich bitte an info@gruleiru.de und führen Sie <strong>keine</strong> erneute Anmeldung durch! Wenn sie noch ein Kind hinzufügen möchten laden sie die Website neu!</p>
                `
            } else if (code=="list") {
                document.getElementById("fdiv").innerHTML = `<h4 style="margin-top: 10px;">HeFa Anmeldung</h4>
                <p>Sie haben ihr Kind (${cname.value}) erfolgreich auf die Warteliste für die HeFa gesetzt. Sie werden per Mail benachrichtigt, wenn ein Platz frei ist. Bitte überprüfen Sie regelmäßig auch ihr Spam Postfach. Wenn sie noch ein Kind hinzufügen möchten laden sie die Website neu!</p>
                `
            } else if(code="err") {
                document.getElementById("fdiv").innerHTML = `<h4 style="margin-top: 10px;">HeFa Anmeldung</h4>
                <p>Es ist ein unerwarteter Fehler aufgetreten. Möglicherweise ist ihr Kind bereits angemeldet! Bitte probieren Sie ist später erneut. Wenn dieser Fehler erneut auftritt, bitte wenden Sie dich an den Support unter info@gruleiru.de</p>
                `
            }

        }
    } else {
        alert("Bitte fülle das Captcha aus!")
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



