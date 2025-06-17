
btn = document.getElementById("bbbtn1")
const Http = new XMLHttpRequest();
var request = new XMLHttpRequest();
request.open("GET", "./down/reason.json", false);
request.send(null);
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const evid = urlParams.get('id')
const domain = "https://www.gruleiru.de"
var jsonData = JSON.parse(request.responseText);
if (jsonData["reason"] == "none") {

} else {
    location.href = jsonData["reason"] + ".html"
}

evName = document.getElementById("evName")
evDesc = document.getElementById("evDesc")
siteTitle = document.getElementById("siteTitle")
const url='https://regapi.gruleiru.de/public';
Http.open("GET", url);
Http.send();
Http.onload = (e) => {
    response = JSON.parse(Http.responseText);
    for (let i = 0; i < response["dates"].length; i++) {
        if(response["dates"][i]["id"] == evid) {
            console.log(response["dates"][i]["title"])
            evName.innerHTML = response["dates"][i]["title"]
            evDesc.innerHTML = response["dates"][i]["description"]
            siteTitle.innerHTML = "Anmeldung - " + response["dates"][i]["title"]

        }
    }
}

document.getElementById("border2").style.height = "0%"

function onSubmit() {
    if (checked == 1) {
        document.getElementById("border").style.height = "150vh"
        pname = document.getElementById("username")
        pmail = document.getElementById("email")
        tnm = document.getElementById("tnm")
        cname = document.getElementById("cname")
        console.log(pname.value)
        const url = `https://hefa.gruleiru.de/regev?pname=${pname.value}&&cname=${cname.value}&&tel=${tnm.value}&&evid=${evid}&&pmail=${pmail.value}`
        Http.open("GET", url);
        Http.send();
        Http.onload = (e) => {
            response = JSON.parse(Http.responseText);
            console.log(response["code"])
            code = response["code"]
            document.getElementById("fdiv").style.display = "block"
            if(code=="reg") {
                document.getElementById("fdiv").innerHTML = `<h4 style="margin-top: 10px;">Event Anmeldung</h4>
                <p>Die Anmeldung für die Veranstaltung wurde erfolgreich eingereicht! Sie bekommen eine Bestätigung per Mail. Bitte überprüfen Sie auch ihr Spam Postfach. Wenn sie noch eine Anmeldung durchführen möchten, laden sie die Seite neu!</p>
                `
            } else if(code="err") {
                document.getElementById("fdiv").innerHTML = `<h4 style="margin-top: 10px;">HeFa Anmeldung</h4>
                <p>Es ist ein unerwarteter Fehler aufgerteten. Bitte probieren Sie ist später erneut. Wenn dieser Fehler erneut auftritt, bitte wenden Sie dich an den Support unter lino@vallebuona.de</p>
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



