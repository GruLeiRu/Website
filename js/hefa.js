const Http = new XMLHttpRequest();
var request = new XMLHttpRequest();
request.open("GET", "./down/reason.json", false);
request.send(null);
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const session = urlParams.get('sid')
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
document.getElementById("invites").setAttribute("href", domain + "/ticket?sid=" + session) // invites
document.getElementById("hefa").setAttribute("href", domain + "/hefa?sid=" + session)
document.getElementById("logout").setAttribute("onclick", "Logout('" + session + "');")
document.getElementById("stats").setAttribute("href", domain + "/graphStats?sid=" + session)

function Logout (session) {
  const loutUrl = 'https://regapi.gruleiru.de/logout?session=' + session;
  Http.open("GET", loutUrl);
  Http.send();
  Http.onload = (e) => {
    window.location.href = "https://www.gruleiru.de"
  }
}
function execAll(regex, string) {
    const results = [];

    while (true) {
        const match = regex.exec(string);

        if (match === null) {
            break;
        }

        results.push(match);
    }

    return results;
}

function getContentsOfCurlyBraces(string) {
    // Erstelle ein Array, um die Inhalte der geschwungenen Klammern zu speichern.
    const contents = [];

    // Erstelle einen regulären Ausdruck, um die geschwungenen Klammern zu finden.
    const regex = /\{(.*?)\}/g;

    // Gehe durch alle Übereinstimmungen des regulären Ausdrucks.
    for (const match of execAll(regex, string)) {
        // Füge den Inhalt der geschwungenen Klammern zum Array hinzu.
        contents.push(match[1]);
    }

    // Gib das Array zurück.
    return contents;
}

const url = 'https://hefa.gruleiru.de/members?sid=' + session;
Http.open("GET", url);
Http.send();
Http.onload = (e) => {
    response = JSON.parse(Http.responseText);

    console.log(response["code"])
    if (response["code"] == "invalid") {
        document.getElementById("block").innerHTML += `
                      <img src="images/search.png" style="height: 40px">
                      <!--img src="images/loading.gif" style="height:45px;">-->
                      <br>
                      <span>Die Session wurde nicht gefunden. Bitte melde dich erneut an!</span>
                  `
    } else {

        document.getElementById("stfContainer").innerHTML += `Teilnehmer: ${response[1]["mems"]}<br>`
        if(response[1]["list"] > 0) {
            document.getElementById("stfContainer").innerHTML += `Warteliste: ${response[1]["list"]}<br><br>`
        } else {
            num = response[1]["list"]
            str = num.toString()
            document.getElementById("stfContainer").innerHTML += `Freie Plätze: ${str.replace("-", "")}<br><br>`
        }

        var str = "";
        for (i in response[2]["current"]) {
            str += response[2]["current"][i]["further"] + " ";
        }
        var found = getContentsOfCurlyBraces(str);
        vegans = 0
        vegetarians = 0
        lakto = 0
        pig = 0
        for (i in found) {
            if (found[i] == "Vegan") {
                vegans += 1
            } else if (found[i] == "Vegetarisch") {
                vegetarians += 1
            } else if (found[i] == "Laktoseintoleranz") {
                lakto += 1
            } else if (found[i] == "Kein Schweinefleisch") {
                pig += 1
            }
        }
        document.getElementById("stfContainer").innerHTML += `Vegan: ${vegans}<br>`
        document.getElementById("stfContainer").innerHTML += `Vegetarisch: ${vegetarians}<br>`
        document.getElementById("stfContainer").innerHTML += `Laktoseintolerant: ${lakto}<br>`
        document.getElementById("stfContainer").innerHTML += `Kein Schweinefleisch: ${pig}<br><br>`

        document.getElementById("stfContainer").innerHTML += `
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
            
            .blur {
                filter: blur(8px);
                transition: filter 0.3s ease;
            }
            </style>    
        <table id="table">
            <tr>
            <th>Name (Kind)</th>
            <th>Alter</th>
            <th>Name (Erz.-Ber.)</th>
            <th>E-Mail</th>
            <th>Tel. (Erz.-Ber.)</th>
            <th>Adresse</th>
            <th>Anmeldezeit</th>
            <th>Weiteres</th>
            </tr>
        </table>`
        for (i in response[2]["current"]) {
            furtherToDisplay = response[2]["current"][i]["further"].replace("{Keine/Andere}", " ").replace("{", " ").replace("}", " ");
            if (response[2]["current"][i]["paid"] === 1) {
                document.getElementById("table").innerHTML += `
                <tr style="background-color: #a7e596">
                    <td>${response[2]["current"][i]["cname"]}</td>
                    <td>${response[2]["current"][i]["cdate"]}</td>
                    <td>${response[2]["current"][i]["pname"]}</td>
                    <td>${response[2]["current"][i]["pemail"]}</td>
                    <td>${response[2]["current"][i]["tnm"]}</td>
                    <td>${response[2]["current"][i]["paddr"]}</td>
                    <td>${response[2]["current"][i]["time"]}</td>
                    <td>${furtherToDisplay}</td>
                </tr>
                `
            } else if (response[2]["current"][i]["paid"] === 2) {
                document.getElementById("table").innerHTML += `
                <tr style="background-color: #ceda2d">
                    <td>${response[2]["current"][i]["cname"]}</td>
                    <td>${response[2]["current"][i]["cdate"]}</td>
                    <td>${response[2]["current"][i]["pname"]}</td>
                    <td>${response[2]["current"][i]["pemail"]}</td>
                    <td>${response[2]["current"][i]["tnm"]}</td>
                    <td>${response[2]["current"][i]["paddr"]}</td>
                    <td>${response[2]["current"][i]["time"]}</td>
                    <td>${furtherToDisplay}</td>
                </tr>
                `
            } else {
                document.getElementById("table").innerHTML += `
            <tr>
                <td>${response[2]["current"][i]["cname"]}</td>
                <td>${response[2]["current"][i]["cdate"]}</td>
                <td>${response[2]["current"][i]["pname"]}</td>
                <td>${response[2]["current"][i]["pemail"]}</td>
                <td>${response[2]["current"][i]["tnm"]}</td>
                <td>${response[2]["current"][i]["paddr"]}</td>
                <td>${response[2]["current"][i]["time"]}</td>
                <td>${furtherToDisplay}</td>
            </tr>
            `
            }


        }
        for (i in response[2]["queue"]) {
            furtherToDisplay = response[2]["queue"][i]["further"].replace("{Keine/Andere}", " ").replace("{", " ").replace("}", " ");
            document.getElementById("table").innerHTML += `
            <tr style="background-color: #b0abab">
                <td>${response[2]["current"][i]["cname"]}</td>
                <td>${response[2]["current"][i]["cdate"]}</td>
                <td>${response[2]["current"][i]["pname"]}</td>
                <td>${response[2]["current"][i]["pemail"]}</td>
                <td>${response[2]["current"][i]["tnm"]}</td>
                <td>${response[2]["current"][i]["paddr"]}</td>
                <td>${response[2]["current"][i]["time"]}</td>
                <td>${furtherToDisplay}</td>
            </tr>
            `
        }
    }
    // Quick and simple export target #table_id into a csv

    // Add event listener for window blur
    window.addEventListener('blur', function() {
        document.getElementById('table').classList.add('blur');
    });

    // Add event listener for window focus
    window.addEventListener('focus', function() {
        document.getElementById('table').classList.remove('blur');
    });




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
