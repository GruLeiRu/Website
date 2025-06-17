
const Http = new XMLHttpRequest();
var request = new XMLHttpRequest();
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const session = urlParams.get('sid')




request.open("GET", "./down/reason.json", false);
request.send(null);
const msg = urlParams.get('message')
const domain = "https://www.gruleiru.de"
var jsonData = JSON.parse(request.responseText);
paused = false
fl = true
extendedFirst = false
origHeight = 0

if (msg == "successful") {

}

const qString = window.location.search;
        const uParams = new URLSearchParams(qString);
        const r = uParams.get('redirect')
        if (r != "false") {
            if (jsonData["reason"] == "none") {

            } else {
                location.href = jsonData["reason"] + ".html"
            }

        }
document.getElementById("reminder").setAttribute("href", domain + "/panel?sid=" + session)
document.getElementById("settings").setAttribute("href", domain + "/settings?sid=" + session)
document.getElementById("invites").setAttribute("href", domain + "/ticket?sid=" + session) // invites
document.getElementById("hefa").setAttribute("href", domain + "/hefa?sid=" + session)
// document.getElementById("logout").setAttribute("href", "https://regapi.gruleiru.de/logout?sid=" + session)
document.getElementById("logout").setAttribute("onclick", "Logout('" + session + "');")

function Logout (session) {
  const loutUrl = 'https://regapi.gruleiru.de/logout?session=' + session;
  Http.open("GET", loutUrl);
  Http.send();
  Http.onload = (e) => {
    window.location.href = "https://www.gruleiru.de"
  }
}

allowTheme = true
if (allowTheme == true) {
  if (localStorage.getItem("theme") == "dark-mode") {
    const addCSS = css => document.head.appendChild(document.createElement("style")).innerHTML = css;

    addCSS(`html:not(#ente){filter: invert(1) hue-rotate(180deg);}#ente{filter: invert(1) hue-rotate(180deg);}`)
  } else {
  }
}
function addDate() {

  document.getElementById("block").innerHTML = ``
  document.getElementById("block").innerHTML = `
                    <div class="mb-4">
                    <h3>Gruleiru <strong class="nwtxt">Termine</strong></h3>
                    `
  document.getElementById("block").innerHTML = `
                <div class="mb-4">
                <h3>Gruleiru <strong class="nwtxt">Termine</strong><img class="nwtxt" src="images/add.png" style="height: 30px; margin-left: 20px; margin-bottom: 3px;" id="adddate" onclick="addDate()"></h3>`
  if (mobile() == true) {
    document.getElementById("block").innerHTML = `
                <div class="mb-4">
                <h3>Gruleiru <strong class="nwtxt">Termine</strong><img class="nwtxt" src="images/add.png" style="height: 30px; margin-left: 20px; margin-bottom: 3px;" id="adddate" onclick="addDate()"></h3>
                `
  } else {
    document.getElementById("block").innerHTML = `
                <div class="mb-4">
                <h3>Gruleiru <strong class="nwtxt">Termine</strong><img class="nwtxt" src="images/add.png" style="height: 30px; margin-left: 20px; margin-bottom: 3px;" id="adddate" onclick="addDate()"><img class="nwtxt" src="images/calendar.png" style="height: 32px; margin-left: 10px; margin-bottom: 3px; margin-top: 3px" id="adddate" onclick="window.location.href = 'cal?sid=' + session"></h3>
                `
  }

  paused = true
  //document.getElementById("adddate").remove();
  paused = true
  var background = document.getElementById('oblock');
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  if(extendedFirst == false){
    origHeight = background.offsetHeight
    extendedFirst = true
  }
  if(background.offsetHeight > origHeight){
    $(".col-md-12").animate({
      height: background.offsetHeight - 600 + ""
    }, function () {
      document.getElementById("add-block").remove();
      $(".col-md-12").animate({
        height: background.offsetHeight + 600 + ""
      })
      addDateBlock()
    })
  } else {
    $(".col-md-12").animate({
      height: background.offsetHeight + 600 + ""
    })
    addDateBlock()
  }
  function addDateBlock() {
    document.getElementById("oblock").innerHTML += `
    <div id="add-block">
    <div class="form-block" id="block">
        <label for="username" id="lbl1" class="nwtxt">Datum:</label><br>
        <input type="date" id="date" style="border: 0; background-color: white; outline: none;" class="nwtxt">
        <br><br>
        <label for="username" id="lbl1" class="nwtxt">Titel:</label>
        <div class="form-group first">
            <input type="text" class="form-control" id="t">
        </div>
        <label for="username" id="lbl1" class="nwtxt">Beschreibung:</label>
        <div class="form-group first">
            <input type="text" class="form-control" id="d">
        </div>
        <label for="username" id="lbl1" class="nwtxt">Teilnehmer ("*" um alle Benutzer einzuladen):</label>
        <div class="form-group first">
            <input type="text" class="form-control" id="m">
            <ul id="suggestions"></ul>
        </div>
        <input type="button" value="Hinzufügen" class="btn btn-pill text-white btn-block btn-primary" id="bbbtn1" onclick="AddD(t.value, d.value, m.value, date.value)">
        <input type="button" value="Abbrechen" class="btn btn-pill text-white btn-block btn-primary" id="bbbtn1" onclick="CancelDate()">
    </div>
    </div>
    `;
  }
  (function () {

    const url = 'https://regapi.gruleiru.de/fetchmembers';
    Http.open("GET", url);
    Http.send();
    Http.onload = (e) => {
      response = JSON.parse(Http.responseText);
      //console.log(response)
    }

    "use strict";
    let inputField = document.getElementById('m');
    let ulField = document.getElementById('suggestions');
    inputField.addEventListener('input', changeAutoComplete);
    ulField.addEventListener('click', selectItem);

    function changeAutoComplete({ target }) {
      let data = target.value;
      ulField.innerHTML = ``;
      if (data.length) {
        let autoCompleteValues = autoComplete(data);
        autoCompleteValues.forEach(value => { addItem(value); });
      }
    }

    function autoComplete(inputValue) {
      let destination = response["members"];
      return destination.filter(
        (value) => value.toLowerCase().includes(inputValue.toLowerCase().split(", ")[inputValue.toLowerCase().split(",").length - 1])
      );
    }

    function addItem(value) {
      ulField.innerHTML = ulField.innerHTML + `<li>${value}</li>`;
    }

    function selectItem({ target }) {
      if (target.tagName === 'LI') {
        contentToReplace = inputField.value.split(", ")[inputField.value.toLowerCase().split(",").length - 1]
        //console.log(contentToReplace)
        inputField.value = inputField.value.replace(contentToReplace, target.textContent) + ", "
        ulField.innerHTML = ``;
      }
    }
  })();
}



function addDateC(t, d, m, date) {
  document.getElementById("block").innerHTML = ``
  document.getElementById("block").innerHTML = `
                    <div class="mb-4">
                    <h3>Gruleiru <strong class="nwtxt">Termine</strong></h3>
                    `
  document.getElementById("block").innerHTML = `
                <div class="mb-4">
                <h3>Gruleiru <strong class="nwtxt">Termine</strong><img class="nwtxt" src="images/add.png" style="height: 30px; margin-left: 20px; margin-bottom: 3px;" id="adddate" onclick="addDate()"></h3>`
  if (mobile() == true) {
    document.getElementById("block").innerHTML = `
                <div class="mb-4">
                <h3>Gruleiru <strong class="nwtxt">Termine</strong><img class="nwtxt" src="images/add.png" style="height: 30px; margin-left: 20px; margin-bottom: 3px;" id="adddate" onclick="addDate()"></h3>
                `
  } else {
    document.getElementById("block").innerHTML = `
                <div class="mb-4">
                <h3>Gruleiru <strong class="nwtxt">Termine</strong><img class="nwtxt" src="images/add.png" style="height: 30px; margin-left: 20px; margin-bottom: 3px;" id="adddate" onclick="addDate()"><img class="nwtxt" src="images/calendar.png" style="height: 32px; margin-left: 10px; margin-bottom: 3px; margin-top: 3px" id="adddate" onclick="window.location.href = 'cal?sid=' + session"></h3>
                `
  }
  document.getElementById("block").innerHTML += `
                <span class="nwtxt">${date} <strong class="nwtxt">${t}</strong></span>
                `


  if (m == "*") {
    members = "alle"
  } else {
    members = m
  }
  document.getElementById("block").innerHTML += `
                <br>
                <span class="nwtxt">Beschreibung: ${d}</span>
                <br>
                <span class="nwtxt">Teilnehmer: ${members}</span>
                `
  paused = true
  var background = document.getElementById('oblock');
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  if(extendedFirst == false){
    origHeight = background.offsetHeight
    extendedFirst = true
  }
  if(background.offsetHeight > origHeight){
    $(".col-md-12").animate({
      height: background.offsetHeight - 600 + ""
    }, function () {
      document.getElementById("add-block").remove();
      $(".col-md-12").animate({
        height: background.offsetHeight + 600 + ""
      })
      addSetBlock()
    })
  } else {
    $(".col-md-12").animate({
      height: background.offsetHeight + 600 + ""
    })
    addSetBlock()
  }
  paused = true

  function addSetBlock() {
    document.getElementById("oblock").innerHTML += `
    <div id="add-block">
    <div class="form-block" id="block">
        <label for="username" id="lbl1" class="nwtxt">Datum:</label><br>
        <input type="date" id="dt" style="border: 0; background-color: white; outline: none;" value="${date}" class="nwtxt">
        <br><br>
        <label for="username" id="lbl1" class="nwtxt">Titel:</label>
        <div class="form-group first">
            <input type="text" class="form-control" id="ti" value="${t}">
        </div>
        <label for="username" id="lbl1" class="nwtxt">Beschreibung:</label>
        <div class="form-group first">
            <input type="text" class="form-control" id="d" value="${d}">
        </div>
        <label for="username" id="lbl1" class="nwtxt">Teilnehmer ("*" um alle Benutzer einzuladen):</label>
        <div class="form-group first">
            <input type="text" class="form-control" id="m" value="${m}">
            <ul id="suggestions"></ul>
        </div>
        <input type="button" value="Übernehmen" class="btn btn-pill text-white btn-block btn-primary" id="bbbtn1" onclick="RepD(ti.value, d.value, m.value, dt.value, '${date}', '${t}')">
        <input type="button" value="Abbrechen" class="btn btn-pill text-white btn-block btn-primary" id="bbbtn1" onclick="CancelDate()">
    </div>
    </div>
    `;
  }
  (function () {

    const url = 'https://regapi.gruleiru.de/fetchmembers';
    Http.open("GET", url);
    Http.send();
    Http.onload = (e) => {
      response = JSON.parse(Http.responseText);
      //console.log(response)
    }

    "use strict";
    let inputField = document.getElementById('m');
    let ulField = document.getElementById('suggestions');
    inputField.addEventListener('input', changeAutoComplete);
    ulField.addEventListener('click', selectItem);

    function changeAutoComplete({ target }) {
      let data = target.value;
      ulField.innerHTML = ``;
      if (data.length) {
        let autoCompleteValues = autoComplete(data);
        autoCompleteValues.forEach(value => { addItem(value); });
      }
    }

    function autoComplete(inputValue) {
      let destination = response["members"];
      return destination.filter(
        (value) => value.toLowerCase().includes(inputValue.toLowerCase().split(", ")[inputValue.toLowerCase().split(",").length - 1])
      );
    }

    function addItem(value) {
      ulField.innerHTML = ulField.innerHTML + `<li>${value}</li>`;
    }

    function selectItem({ target }) {
      if (target.tagName === 'LI') {
        contentToReplace = inputField.value.split(", ")[inputField.value.toLowerCase().split(",").length - 1]
        //console.log(contentToReplace)
        inputField.value = inputField.value.replace(contentToReplace, target.textContent) + ", "
        ulField.innerHTML = ``;
      }
    }
  })();
}

function invite(t, date, d, m) {
  document.getElementById("block").innerHTML = ``
  document.getElementById("block").innerHTML = `
                    <div class="mb-4">
                    <h3>Gruleiru <strong class="nwtxt">Termine</strong></h3>
                    `
  document.getElementById("block").innerHTML = `
                <div class="mb-4">
                <h3>Gruleiru <strong class="nwtxt">Termine</strong><img class="nwtxt" src="images/add.png" style="height: 30px; margin-left: 20px; margin-bottom: 3px;" id="adddate" onclick="addDate()"></h3>`
  if (mobile() == true) {
    document.getElementById("block").innerHTML = `
                <div class="mb-4">
                <h3>Gruleiru <strong class="nwtxt">Termine</strong><img class="nwtxt" src="images/add.png" style="height: 30px; margin-left: 20px; margin-bottom: 3px;" id="adddate" onclick="addDate()"></h3>
                `
  } else {
    document.getElementById("block").innerHTML = `
                <div class="mb-4">
                <h3>Gruleiru <strong class="nwtxt">Termine</strong><img class="nwtxt" src="images/add.png" style="height: 30px; margin-left: 20px; margin-bottom: 3px;" id="adddate" onclick="addDate()"><img class="nwtxt" src="images/calendar.png" style="height: 32px; margin-left: 10px; margin-bottom: 3px; margin-top: 3px" id="adddate" onclick="window.location.href = 'cal?sid=' + session"></h3>
                `
  }
  document.getElementById("block").innerHTML += `
                <span class="nwtxt">${date} <strong class="nwtxt">${t}</strong></span>
                `


  if (m == "*") {
    members = "alle"
  } else {
    members = m
  }
  document.getElementById("block").innerHTML += `
                <br>
                <span class="nwtxt">Beschreibung: ${d}</span>
                <br>
                <span class="nwtxt">Teilnehmer: ${members}</span>
  `
  paused = true
  var background = document.getElementById('oblock');
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  if(extendedFirst == false){
    origHeight = background.offsetHeight
    extendedFirst = true
  }
  if(background.offsetHeight > origHeight){
    $(".col-md-12").animate({
      height: background.offsetHeight - 600 + ""
    }, function () {
      document.getElementById("add-block").remove();
      $(".col-md-12").animate({
        height: background.offsetHeight + 600 + ""
      })
      addInvBlock()
    })
  } else {
    $(".col-md-12").animate({
      height: background.offsetHeight + 600 + ""
    })
    addInvBlock()
  }
  paused = true

  function addInvBlock() {
    document.getElementById("oblock").innerHTML += `
    <div id="add-block">
    <div class="form-block" id="block">
        <span class="nwtxt">Benutzer <strong class="nwtxt">einladen</strong></span><br>
        <label for="m" id="lbl1" class="nwtxt">Benutzer ("*" um alle Benutzer einzuladen):</label>
        <div class="form-group first">
            <input type="text" class="form-control" id="m">
            <ul id="suggestions"></ul>
        </div>
        <input type="button" value="Einladen" class="btn btn-pill text-white btn-block btn-primary" id="bbbtn1" onclick="sendinvite('${date}', '${t}', m.value)">
        <input type="button" value="Abbrechen" class="btn btn-pill text-white btn-block btn-primary" id="bbbtn1" onclick="CancelDate()">
    </div>
    </div>
    `;
  }

  (function () {

    const url = 'https://regapi.gruleiru.de/fetchmembers';
    Http.open("GET", url);
    Http.send();
    Http.onload = (e) => {
      response = JSON.parse(Http.responseText);
      //console.log(response)
    }

    "use strict";
    let inputField = document.getElementById('m');
    let ulField = document.getElementById('suggestions');
    inputField.addEventListener('input', changeAutoComplete);
    ulField.addEventListener('click', selectItem);

    function changeAutoComplete({ target }) {
      let data = target.value;
      ulField.innerHTML = ``;
      if (data.length) {
        let autoCompleteValues = autoComplete(data);
        autoCompleteValues.forEach(value => { addItem(value); });
      }
    }

    function autoComplete(inputValue) {
      let destination = response["members"];
      return destination.filter(
        (value) => value.toLowerCase().includes(inputValue.toLowerCase().split(", ")[inputValue.toLowerCase().split(",").length - 1])
      );
    }

    function addItem(value) {
      ulField.innerHTML = ulField.innerHTML + `<li>${value}</li>`;
    }

    function selectItem({ target }) {
      if (target.tagName === 'LI') {
        contentToReplace = inputField.value.split(", ")[inputField.value.toLowerCase().split(",").length - 1]
        //console.log(contentToReplace)
        inputField.value = inputField.value.replace(contentToReplace, target.textContent)
        ulField.innerHTML = ``;
      }
    }
  })();
}

function sendinvite(d, t, m) {
  paused = false
  // window.location.href = "https://regapi.gruleiru.de/invite?sid=" + session + "&&date=" + d + "&&title=" + t + "&&member=" + m
  const urlSendInvite = "https://regapi.gruleiru.de/invite?sid=" + session + "&&date=" + d + "&&title=" + t + "&&member=" + m
  Http.open("GET", urlSendInvite);
  Http.send();
  Http.onload = (e) => {
    location.reload();
  }
}

function CancelDate() {
  paused = false
  location.reload();
}

function AddD(t, d, m, date) {
  paused = false
  // window.location.href = 'https://regapi.gruleiru.de/addDate?session=' + session + '&&title=' + t + '&&description=' + d + '&&members=' + m + '&&date=' + date
  const urlAddD = 'https://regapi.gruleiru.de/addDate?session=' + session + '&&title=' + t + '&&description=' + d + '&&members=' + m + '&&date=' + date
  Http.open("GET", urlAddD);
  Http.send();
  Http.onload = (e) => {
    location.reload();
  }
}

function RepD(t, d, m, date, dateb, tb) {
  paused = false
  // window.location.href = 'https://regapi.gruleiru.de/repDate?session=' + session + '&&title=' + t + '&&description=' + d + '&&members=' + m + '&&date=' + date + '&&repdate=' + dateb + '&&reptitle=' + tb
  const urlRepD = 'https://regapi.gruleiru.de/repDate?session=' + session + '&&title=' + t + '&&description=' + d + '&&members=' + m + '&&date=' + date + '&&repdate=' + dateb + '&&reptitle=' + tb
  Http.open("GET", urlRepD);
  Http.send();
  Http.onload = (e) => {
    location.reload();
  }
}

function PublishD(t, date, sesssion) {
  paused = false
  console.log(sesssion)
  // window.location.href = 'https://regapi.gruleiru.de/addDate?session=' + session + '&&title=' + t + '&&description=' + d + '&&members=' + m + '&&date=' + date
  const urlPubD = "https://regapi.gruleiru.de/publish?title=" + t + "&&date=" + date + "&&session=" + sesssion
  Http.open("GET", urlPubD);
  Http.send();
  Http.onload = (e) => {
    location.reload();
  }
}

function UnpublishD(t, date, sesssion) {
  paused = false
  console.log(sesssion)
  // window.location.href = 'https://regapi.gruleiru.de/addDate?session=' + session + '&&title=' + t + '&&description=' + d + '&&members=' + m + '&&date=' + date
  const urlUnpubD = "https://regapi.gruleiru.de/unpublish?title=" + t + "&&date=" + date + "&&session=" + sesssion
  Http.open("GET", urlUnpubD);
  Http.send();
  Http.onload = (e) => {
    location.reload();
  }
}

function RemD(t, date, sesssion) {
  paused = false
  console.log(sesssion)
  // window.location.href = 'https://regapi.gruleiru.de/addDate?session=' + session + '&&title=' + t + '&&description=' + d + '&&members=' + m + '&&date=' + date
  const urlRemD = "https://regapi.gruleiru.de/remove?title=" + t + "&&date=" + date + "&&session=" + sesssion
  Http.open("GET", urlRemD);
  Http.send();
  Http.onload = (e) => {
    location.reload();
  }
}


function openUrl(url) {
  window.location.href = url
}

firstInit = true
moreSout = false
moreSiD = ""
function copyToClipboard(text) {
  var dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}
function copyLink(id){
  copyToClipboard(`${domain}/anm?id=${id}`)
  alert('Link zur Anmeldung wurde in die Zwischenablage kopiert!')
};

function MoreS(id, title, description, members, date, published) {
  paused = true
  if(title != "Info") {
    if (moreSiD != "" && moreSiD != id) {
      TmoreSiD = moreSiD
      $("#" + moreSiD).animate({
        height: 0 + ""
      }, function rem(){
        document.getElementById(TmoreSiD).innerHTML = ""

      })
      moreSiD = id
      moreSout = false
    }
    if (moreSout == false) {
      moreSout = true
      moreSiD = id
      document.getElementById(id).innerHTML = `
            <div style="height:2px; background-color: #b3b3b3; border-radius:2px;"></div>
            <a onclick="RemD('${title}', '${date}', '${session}');"><img src="images/delete.png" style="height: 25px; margin-left: 0px"><span style="margin-left: 5px">Löschen</span></a>
            <br><a><img src="images/settings.png" onclick="addDateC('${title}', '${description}', '${members}', '${date}')" style="height: 25px; margin-left: 0px"><span style="margin-left: 5px">Bearbeiten</span></a>
            <br><a><img src="images/add_member.png" onclick="invite('${title}', '${date}', '${description}', '${members}')" style="height: 25px; margin-left: 0px"><span style="margin-left: 5px">Einladen</span></a>
<!--            <br><a style="text-decoration: none" href="${domain}/chat?sid=${session}&&cid=${id}"><img src="images/chat.png" style="height: 25px; margin-left: 0px;"><span style="margin-left: 5px;  color: black;">Chat</span></a>-->
            <br><a style="text-decoration: none" onclick="copyLink('${id}')"><img src="images/link.png" style="height: 23px; margin-top: -2px;"><span style="margin-left: 5px;  color: black;">Anmeldung</span></a>
            <br><a style="text-decoration: none" href="${domain}/members?sid=${session}&&evid=${id}"><img src="images/gruppe.png" style="height: 32px; margin-left: 0px;"><span style="margin-left: 5px; color: black;">Teilnehmer</span></a>
            <br><a style="text-decoration: none" href="${domain}/fbqr?id=${id}"><img src="images/feedback.png" style="height: 26px; margin-left: 0px;"><span style="margin-left: 5px; color: black;">Feedback</span></a>
            <br><a style="text-decoration: none" onclick="createICS(title='${title}', description='${description}', date='${date}')"><img src="images/calendar.png" style="height: 26px; margin-left: 0px;"><span style="margin-left: 5px; color: black;">Zum Kalender hinzufügen</span></a>
                       
`
      $("#" + id).animate({
        height: 0 + ""
      }, 1)
      $("#" + id).animate({
        height: 230 + ""
      })
      if (published == "0") {
        // unpub url: "https://regapi.gruleiru.de/publish?title=${response["dates"][i]["title"]}&&date=${response["dates"][i]["date"]}&&session=${session}
        document.getElementById(id).innerHTML += `
                    <br><a onclick="PublishD('${title}', '${date}', '${session}');"><img src="images/publish.png" style="height: 28px; margin-left: 0px"><span style="margin-left: 5px">Veröffentlichen</span></a>
                    `
      } else {
        document.getElementById(id).innerHTML += `
                    <br><a onclick="UnpublishD('${title}', '${date}', '${session}');"><img src="images/private.png" style="height: 28px; margin-left: 0px"><span style="margin-left: 5px">Privat</span></a>
                    `
      }
    } else {
      $("#" + id).animate({
        height: 0 + ""
      }, function rem(){
        moreSout = false
        document.getElementById(id).innerHTML = ""
        moreSiD = ""
      })

    }
  }


}

function allDates() {

  var cal = ics();
  for (let i = 0; i < response["dates"].length; i++) {
      if (response["dates"][i]["title"] != "Info") {
        let date = response["dates"][i]["date"]
        let str = response["dates"][i]["description"]
        try {
          let time = str.match(/\b\d{1,2}:\d{1,2}\b/)[0];
          if(time.length == 4) {
            var dt = new Date(date + " " + time);
            var hours = dt.getHours() ;
            var AmOrPm = hours >= 12 ? 'pm' : 'am';
            hours = (hours % 12) || 12;
            var minutes = dt.getMinutes() ;
            var finalTime = hours + ":" + minutes + " " + AmOrPm;
            date = date + " " + finalTime
          }
        } catch (e) {
            console.log(e)
        }

        // cal.addEvent(title, description, "", date, date);
        cal.addEvent(response["dates"][i]["title"], response["dates"][i]["description"], "", date, date)
      }
  }
  cal.download()
}

function createICS(title, description, date) {
  let str = description
  try {
    let time = str.match(/\b\d{1,2}:\d{1,2}\b/)[0];
    if(time.length == 4) {
      var dt = new Date(date + " " + time);
      var hours = dt.getHours() ;
      var AmOrPm = hours >= 12 ? 'pm' : 'am';
      hours = (hours % 12) || 12;
      var minutes = dt.getMinutes() ;
      var finalTime = hours + ":" + minutes + " " + AmOrPm;
      date = date + " " + finalTime
    }
  } catch (e) {
    console.log(e)
  }

  var cal = ics();
  if(description === "") {
    description = "Keine Beschreibung"
  }
  cal.addEvent(title, description, "", date, date);
  cal.download(title);
}

function init() {



  if (paused == false) {
    const url = 'https://regapi.gruleiru.de/reminder?session=' + session;
    Http.open("GET", url);
    Http.send();
    Http.onload = (e) => {
      response = JSON.parse(Http.responseText);
      //console.log(response)
      //console.log(response["error"])
      if (response["error"] == "0x1") {
        paused = true
        document.getElementById("block").innerHTML = `
                    <div class="mb-4">
                    <h3>Gruleiru <strong class="nwtxt">Termine</strong></h3>
                    `
        document.getElementById("block").innerHTML += `
                        <img src="images/search.png" style="height: 40px">
                        <!--img src="images/loading.gif" style="height:45px;">-->
                        <br>
                        <span class="nwtxt">Die Session wurde nicht gefunden. Bitte melde dich erneut an!</span>
                    `
      } else {

        if (response["dates"].length == 0) {
          if (fl == true) {
            fl = false
            document.getElementById("block").innerHTML = `
                    <div class="mb-4">
                    <h3>Gruleiru <strong class="nwtxt">Termine</strong><img class="nwtxt" src="images/add.png" style="height: 30px; margin-left: 20px; margin-bottom: 3px;" id="adddate" onclick="addDate()"></h3>
                    `

            if (Math.floor(Math.random() * 20) == 1) {
              document.getElementById("block").innerHTML += `
                        <!--img src="images/search.png" style="height: 40px">-->
                        <img src="images/loading.gif" style="height:45px;">
                        <br>
                        <span class="nwtxt">Du hast die Ente getroffen *KWAK*</span>
                        `
            } else {
              document.getElementById("block").innerHTML += `
                        <img class="nwtxt" src="images/search.png" style="height: 40px">
                        <!--img src="images/loading.gif" style="height:45px;">-->
                        <br>
                        <span class="nwtxt">Wir haben leider keine Termine in der Datenbank finden können</span>
                    `
            }
          }

        } else {
          if (mobile() == true) {
            document.getElementById("block").innerHTML = `
                <div class="mb-4">
                <h3>Gruleiru <strong class="nwtxt">Termine</strong><img class="nwtxt" src="images/add.png" style="height: 30px; margin-left: 20px; margin-bottom: 3px;" id="adddate" onclick="addDate()"><img class="nwtxt" src="images/calendar.png" style="height: 32px; margin-left: 10px; margin-bottom: 3px; margin-top: 3px" id="allDates" onclick="allDates()"></h3>
                `
          } else {
            document.getElementById("block").innerHTML = `
                <div class="mb-4">
                <h3>Gruleiru <strong class="nwtxt">Termine</strong><img class="nwtxt" src="images/add.png" style="height: 30px; margin-left: 20px; margin-bottom: 3px;" id="adddate" onclick="addDate()"><img class="nwtxt" src="images/calendar.png" style="height: 32px; margin-left: 10px; margin-bottom: 3px; margin-top: 3px" id="adddate" onclick="window.location.href = 'cal?sid=' + session"></h3>
                `
          }

        }
        for (let i = 0; i < response["dates"].length; i++) {
          if (response["dates"][i]["title"] == "Info") {
            document.getElementById("block").innerHTML += `
                <span class="nwtxt"><strong class="nwtxt">${response["dates"][i]["title"]}</strong></span>
                `
            document.getElementById("block").innerHTML += `
                <br>
                <span class="nwtxt">Beschreibung: ${response["dates"][i]["description"]}</span>
                `
          } else {
            document.getElementById("block").innerHTML += `
                <span class="nwtxt">${response["dates"][i]["date"]} <strong class="nwtxt">${response["dates"][i]["title"]}</strong></span>
                `


            if (response["dates"][i]["members"] == "*") {
              members = "alle"
            } else {
              members = response["dates"][i]["members"]
            }
            document.getElementById("block").innerHTML += `
                <br>
                <span class="nwtxt">Beschreibung: ${response["dates"][i]["description"]}</span>
                <br>
                <span class="nwtxt">Teilnehmer: ${members}</span>
                `
            document.getElementById("block").innerHTML += `
                <br><a onclick="MoreS('${response["dates"][i]["id"]}', '${response["dates"][i]["title"]}', '${response["dates"][i]["description"]}', '${response["dates"][i]["members"]}', '${response["dates"][i]["date"]}', '${response["dates"][i]["public"]}');"><img src="images/more.png" style="height: 25px;"></a>
                <div id="${response["dates"][i]["id"]}"></div>
`
          }


          //     < a
          // onClick = "RemD('${title}', '${date}', '${session}');" > < img
          // src = "images/delete.png"
          // style = "height: 25px;" > < /a>
          // <a><img src="images/settings.png" onClick="addDateC('${title}', '${description}', '${members}', '${date}')"
          //         style="height: 25px; margin-left: 10px"></a>
          // <a><img src="images/add_member.png" onClick="invite('${title}', '${date}')"
          //         style="height: 25px; margin-left: 10px"></a>
          // <a href="${domain}/chat?sid=${session}&&cid=${id}"><img src="images/chat.png"
          //                                                         style="height: 25px; margin-left: 10px"></a>
          // <a href="${domain}/members?sid=${session}&&evid=${id}"><img src="images/gruppe.png"
          //                                                             style="height: 32px; margin-left: 10px"></a>
          // <a href="${domain}/fbqr?id=${id}"><img src="images/feedback.png" style="height: 26px; margin-left: 10px"></a>

          // if (response["dates"][i]["public"] == "0") {
          //   // unpub url: "https://regapi.gruleiru.de/publish?title=${response["dates"][i]["title"]}&&date=${response["dates"][i]["date"]}&&session=${session}
          //   document.getElementById("block").innerHTML += `
          //           <a onclick="PublishD('${response["dates"][i]["title"]}', '${response["dates"][i]["date"]}', '${session}');"><img src="images/publish.png" style="height: 28px; margin-left: 10px"></a>
          //           `
          // } else {
          //   document.getElementById("block").innerHTML += `
          //           <a onclick="UnpublishD('${response["dates"][i]["title"]}', '${response["dates"][i]["date"]}', '${session}');"><img src="images/private.png" style="height: 28px; margin-left: 10px"></a>
          //           `
          // }

          document.getElementById("block").innerHTML += `
                <div style="height:2px; background-color: #b3b3b3; border-radius:2px;"></div>
                `
        }

      }



    }
  }

  if(firstInit == true) {

    const urlFirstInit = 'https://regapi.gruleiru.de/invites?session=' + session;
    Http.open("GET", urlFirstInit);
    Http.send();
    Http.onload = (e) => {
      console.log("loaded")
      responseFirstInit = JSON.parse(Http.responseText);
      console.log(responseFirstInit)
      if(responseFirstInit["error"] == "ok") {
        if(responseFirstInit["invites"].length == 1) {
          document.getElementById("toast").innerHTML = "Du hast " + responseFirstInit["invites"].length + " Einladung";
          document.getElementById("toast").onclick = function() {
            window.location.href = "https://gruleiru.de/invites?sid=" + session
          }
        } else {
          document.getElementById("toast").innerHTML = "Du hast " + responseFirstInit["invites"].length + " Einladungen";
          document.getElementById("toast").onclick = function() {
            window.location.href = "https://gruleiru.de/invites?sid=" + session
          }
        }
        var x = document.getElementById("toast");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2900);


      }
      firstInit = false
      init()

    }
  }


};

init();



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



(function reload() {
  setTimeout(reload, 5000);
  init();
})();