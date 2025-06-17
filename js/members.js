
const Http = new XMLHttpRequest();
var request = new XMLHttpRequest();
request.open("GET", "./down/reason.json", false);
request.send(null);
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const session = urlParams.get('sid')
const evid = urlParams.get('evid')
const domain = "https://www.gruleiru.de"
var jsonData = JSON.parse(request.responseText);
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
const url = 'https://hefa.gruleiru.de/membersev?sid=' + session + "&&evid=" + evid;
Http.open("GET", url);
Http.send();
Http.onload = (e) => {
    response = JSON.parse(Http.responseText);
    console.log(response)
    console.log(response["code"])
    if (response["code"] == "invalid") {
        document.getElementById("block").innerHTML += `
                      <img src="images/search.png" style="height: 40px">
                      <!--img src="images/loading.gif" style="height:45px;">-->
                      <br>
                      <span>Die Session wurde nicht gefunden. Bitte melde dich erneut an!</span>
                  `
    } else {
        document.getElementById("block").innerHTML += `Teilnehmer: ${response[1]["mems"]}<br>`
        
        document.getElementById("block").innerHTML += `
        <style>
            table {
            font-family: arial, sans-serif;
            border-collapse: separate;
            border-spacing: 3px;
            width: 100%;
            overflow-x: auto;
            display: block;
            white-space: nowrap;
            }

            td, th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
            border-radius: 10px;
            
            }

            tr:nth-child(even) {
            background-color: #dddddd;
            }
            </style>    
        <table id="table">
            <tr>
            <th>Name (Erz.-Ber.)</th>
            <th>Tel. (Erz.-Ber.)</th>
            <th>E-Mail</th>
            <th>Name (Kind)</th>
            </tr>
        </table>`
        for (i in response[2]) {
            document.getElementById("table").innerHTML += `
            <tr>
                <td>${response[2][i]["pname"]}</td>
                <td>${response[2][i]["tnm"]}</td>
                <td>${response[2][i]["pemail"]}</td>
                <td>${response[2][i]["cname"]}</td>
            </tr>
            `
        }
    }



}

// On page load set the theme.
(function () {
    let onpageLoad = localStorage.getItem("theme") || "";
    let element = document.body;
    element.classList.add(onpageLoad);
    document.getElementById("theme").textContent =
        localStorage.getItem("theme") || "light-mode";
})();

function themeToggle() {
    let element = document.body;
    element.classList.toggle("dark-mode");

    let theme = localStorage.getItem("theme");
    if (theme && theme === "dark-mode") {
        localStorage.setItem("theme", "light-mode");
        const addCSS = css => document.head.appendChild(document.createElement("style")).innerHTML = css;

        addCSS(":not(ente){filter: invert(0%) hue-rotate(180deg);}")
    } else {
        localStorage.setItem("theme", "dark-mode");
        const addCSS = css => document.head.appendChild(document.createElement("style")).innerHTML = css;

        addCSS(":not(ente){filter: invert(100%) hue-rotate(180deg);}")
    }

    document.getElementById("theme").textContent = localStorage.getItem("theme");
}
