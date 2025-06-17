
const Http = new XMLHttpRequest();
var request = new XMLHttpRequest();
request.open("GET", "./down/reason.json", false);
request.send(null);
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const session = urlParams.get('sid')
const domain = "https://www.gruleiru.de"
var jsonData = JSON.parse(request.responseText);
fl = true
if (jsonData["reason"] == "none") {

} else {
    location.href = jsonData["reason"] + ".html"
}


allowTheme = true
if (allowTheme == true) {
  if (localStorage.getItem("theme") == "dark-mode") {
    const addCSS = css => document.head.appendChild(document.createElement("style")).innerHTML = css;

    addCSS(`html:not(#ente){filter: invert(1) hue-rotate(180deg);}#ente{filter: invert(1) hue-rotate(180deg);}`)
  } else {
  }
}
document.getElementById("reminder").setAttribute("href", domain + "/panel?sid=" + session)
document.getElementById("settings").setAttribute("href", domain + "/settings?sid=" + session)
document.getElementById("invites").setAttribute("href", domain + "/invites?sid=" + session)
document.getElementById("hefa").setAttribute("href", domain + "/hefa?sid=" + session)
document.getElementById("logout").setAttribute("onclick", "Logout('" + session + "');")

function Logout (session) {
  const loutUrl = 'https://regapi.gruleiru.de/logout?session=' + session;
  Http.open("GET", loutUrl);
  Http.send();
  Http.onload = (e) => {
    window.location.href = "https://www.gruleiru.de"
  }
}


function init() {
    const url = 'https://regapi.gruleiru.de/invites?session=' + session;
    Http.open("GET", url);
    Http.send();
    Http.onload = (e) => {
        response = JSON.parse(Http.responseText);
        console.log(response)

        if (response["error"] == "ok") {
            for (let i = 0; i < response["invites"].length; i++) {

                document.getElementById("block").innerHTML = `
                <div class="mb-4">
                <h3>Einladungs <strong class="nwtxt">Panel</strong></h3>
                `

                document.getElementById("block").innerHTML += `
                <span class="nwtxt">${response["invites"][i]["date"]} <strong class="nwtxt">${response["invites"][i]["title"]}</strong></span>            `
                document.getElementById("block").innerHTML += `
                <br>
                <span class="nwtxt">Eingeladen Von: <strong class="nwtxt">${response["invites"][i]["inviter"]}</strong></span>
                <br>
                <span class="nwtxt">Beschreibung: ${response["invites"][i]["description"]}</span>
    
                <br><br>
                `

                document.getElementById("block").innerHTML += `
    
    
                <input type="button" value="Annehmen" class="btn btn-pill text-white btn-block btn-primary" id="bbbtn1" onclick="y('${response["invites"][i]["title"]}', '${response["invites"][i]["date"]}', '${response["invites"][i]["member"]}', '${response["invites"][i]["inviter"]}')">
    
                <input type="button" value="Ablehnen" class="btn btn-pill text-white btn-block btn-primary" id="bbbtn1" onclick="n('${response["invites"][i]["title"]}', '${response["invites"][i]["date"]}', '${response["invites"][i]["member"]}', '${response["invites"][i]["inviter"]}')">
    
                <br>
    
                <div style="height:2px; background-color: #b3b3b3; border-radius:2px;"></div>
    
                <br>
                `

            }
        } else if (response["error"] == "0x2") {
            document.getElementById("block").innerHTML = `
                <div class="mb-4">
                <h3>Einladungs <strong class="nwtxt">Panel</strong></h3>
                `
            document.getElementById("block").innerHTML += `
                      <img src="images/search.png" style="height: 40px">
                      <!--img src="images/loading.gif" style="height:45px;">-->
                      <br>
                      <span class="nwtxt">Die Session wurde nicht gefunden. Bitte melde dich erneut an!</span>
                  `
        } else {
            if (fl == true) {
                fl = false
                document.getElementById("block").innerHTML = `
                <div class="mb-4">
                <h3>Einladungs <strong class="nwtxt">Panel</strong></h3>`

                if (Math.floor(Math.random() * 25) == 1) {
                    document.getElementById("block").innerHTML += `
                    <!--img src="images/search.png" style="height: 40px">-->
                    <img src="images/loading.gif" style="height:45px;">
                    <br>
                    <span class="nwtxt">Du hast die Ente getroffen *KWAK*</span>
                    `
                } else {
                    document.getElementById("block").innerHTML += `
                    <img class="nwtxt" src="images/search.png" style="height: 40px">
                    <br>
                    <span class="nwtxt">Du hast noch keine Einladungen</span>
                    `
                }

            }



        }




    }
}

function y(t, d, m, i) {
    const yUrl = 'https://regapi.gruleiru.de/acceptInvite?sid=' + session + '&&title=' + t + '&&date=' + d + '&&member=' + m + '&&inviter=' + i
    Http.open("GET", yUrl);
    Http.send();
    Http.onload = (e) => {
        location.reload();
    }
}

function n(t, d, m, i) {
    const nUrl = 'https://regapi.gruleiru.de/denieInvite?sid=' + session + '&&title=' + t + '&&date=' + d + '&&member=' + m + '&&inviter=' + i
    Http.open("GET", nUrl);
    Http.send();
    Http.onload = (e) => {
        location.reload();
    }
}


(function reload() {
    setTimeout(reload, 10000);
    init();
})();