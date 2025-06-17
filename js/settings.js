
const Http = new XMLHttpRequest();
var request = new XMLHttpRequest();
request.open("GET", "./down/reason.json", false);
request.send(null);
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const session = urlParams.get('sid')
const sExpand = urlParams.get('expand')
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

function Logout (session) {
  const loutUrl = 'https://regapi.gruleiru.de/logout?session=' + session;
  Http.open("GET", loutUrl);
  Http.send();
  Http.onload = (e) => {
    window.location.href = "https://www.gruleiru.de"
  }
}
const url = 'https://regapi.gruleiru.de/settings?session=' + session;
Http.open("GET", url);
Http.send();
Http.onload = (e) => {
    response = JSON.parse(Http.responseText);
    console.log(response)
    DisplayName = response["name"]

    if (response["error"] == "0x1") {
        document.getElementById("block").innerHTML += `
                      <img src="images/search.png" style="height: 40px">
                      <!--img src="images/loading.gif" style="height:45px;">-->
                      <br>
                      <span>Die Session wurde nicht gefunden. Bitte melde dich erneut an!</span>
                  `
    } else {
        document.getElementById("block").innerHTML += `
            <span class="nwtxt">E-Mail Adresse:</span><br>
            <div class="form-group first">
            <input type="text" class="form-control" value="${response["email"]}" id="mail"  style="filter: blur(5px)">
            </div>

            <span class="nwtxt">Benutzername:</span><br>
            <div class="form-group first">
            <input type="text" class="form-control" value="${response["name"]}" id="n">
            </div>

            <span class="nwtxt">Passwort:</span><br>
            <div class="form-group first">
            <input type="password" class="form-control" id="p">
            </div>

            <span class="nwtxt">Passwort wiederholen:</span><br>
            <div class="form-group first">
            <input type="password" class="form-control" id="p2">
            </div>
            <span style="color: #38d39f;" onclick="expand()">Erweiterte Einstellungen</span><br>
<!--            <span style="color: #38d39f;" onclick="help()">Hilfe</span>-->
<!--            <span style="color: #38d39f;"> | </span>-->
            <span style="color: #38d39f;" onclick="contact()">Kontakt</span><br>
<!--            <span style="color: #38d39f;" onclick="policy()">Datenschutz</span><br>-->
            <span style="color: #38d39f;" onclick="grulli()">UID-Tool</span><br>
            <span style="color: #38d39f;" onclick="plan()">Wochenplan anfordern</span><br>
<!--            <span style="color: #38d39f;" onclick="guidelines()">Richtlinien</span>-->
            <div id="error"></div>
            <br>   

            
            <input type="button" value="Übernehmen" class="btn btn-pill text-white btn-block btn-primary" id="bbbtn1" onclick="cc(mail.value, n.value, p.value, p2.value)">
            `
        document.getElementById('mail').addEventListener('focus', function() {
            this.style.filter = 'none';
        });

        document.getElementById('mail').addEventListener('blur', function() {
            this.style.filter = 'blur(5px)';
        });
    }
    if (sExpand == "true") {
        expand()
    }




}
expanded = 0
function policy() {
    window.open("https://www.gruleiru.de/policy")
}
function grulli() {
    window.open("https://www.gruleiru.de/dev")
}

function plan() {
    name = prompt("Bitte geben Sie ihren vollen Vornamen ein. Sollte dieser fehlerhaft sein, kann der Wochenplan gegebenenfalls nicht erstellt werden. Ebenso müssen Sie Leiter der folgenden Herbstfahrt sein!")
    var url = "https://regapi.gruleiru.de/plan?name=" + name + "&&mail=" + document.getElementById("mail").value
    XMLHttpRequest = new XMLHttpRequest();
    XMLHttpRequest.open("GET", url);
    XMLHttpRequest.send();
    alert("Der Wochenplan wird nun generiert. In kürze erhalten Sie eine E-Mail mit dem Wochenplan. Bitte überprüfen Sie auch ihren Spam-Ordner!")

}
function guidelines() {
    window.open("https://www.gruleiru.de/richtlinien")
}

function contact() {
    window.open("https://www.gruleiru.de/support")
}

function help() {
    window.open("https://www.gruleiru.de/help")
}


function expand() {
    if (expanded == 0) {
        $(".form-block").animate({
            height: "1080"
        })
        expanded = 1
        document.getElementById("block").innerHTML += `
        <div id="tempsettings">
    <br>
    <div style="width: auto; height: 2px; background-color: gray; align: center; border-radius: 5px;"></div>
    <br>
    <input type="button" value="Light/Dark Mode" class="btn btn-pill text-white btn-block btn-primary" id="theme" onclick="themeToggle()">
    <input type="button" value="Super Session " class="btn btn-pill text-white btn-block btn-primary" id="sSes" onclick="superSession()">
    <input type="button" value="OTP Login" class="btn btn-pill text-white btn-block btn-primary" id="bbbtn1" onclick="createotp(n.value)">
    <input type="button" value="Mobile Login" class="btn btn-pill text-white btn-block btn-primary" id="bbbtn1" onclick="requestQR()">
    <input type="button" value="Passkey Login" class="btn btn-pill text-white btn-block btn-primary" id="passkey" onclick="checkPasskey()">
    <input type="button" value="Beta Betreten" class="btn btn-pill text-white btn-block btn-primary" id="beta" onclick="beta()">
    </div>
    <div id="qrplace"></div>
    `
    } else {
        $(".form-block").animate({
            height: "660"
        })
        document.getElementById("qrplace").innerHTML = ""
        var gfg_down =
            document.getElementById("tempsettings");
        gfg_down.parentNode.removeChild(gfg_down)
        expanded = 0
    }
    if (localStorage.getItem("sessionType") == "super") {
        console.log("normal")
        document.getElementById("sSes").setAttribute("value", "Normal Session")
    }
    if (localStorage.getItem("beta") == "1") {
        console.log("normal")
        document.getElementById("beta").setAttribute("value", "Beta Verlassen")
    }
}

function toBase64(arrayBuffer) {
    const bytes = new Uint8Array(arrayBuffer);
    const base64 = btoa(String.fromCharCode.apply(null, bytes));
    return base64;
}

function toBase64URL(arrayBuffer) {
    const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));
    return base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function checkPasskey() {


    cl = Uint8Array.from(session, c => c.charCodeAt(0)) // change!!
    // console.log(toBase64URL(cl))

    if (window.PublicKeyCredential &&
        PublicKeyCredential.isConditionalMediationAvailable) {
        const isCMA =  PublicKeyCredential.isConditionalMediationAvailable();
        if (isCMA) {

            const GetCredential = navigator.credentials.get({
                publicKey: {
                    challenge: cl,
                    rpId: "gruleiru.de",
                    allowCredentials: [],
                    userVerification: "required",
                }
            });
            GetCredential.then((newCredentialInfo) => {
                jsonCreds = {
                    "id": newCredentialInfo.id,
                    "rawId": newCredentialInfo.id,
                    "response": {
                        "authenticatorData": toBase64(newCredentialInfo.response.authenticatorData),
                        "clientDataJSON": toBase64(newCredentialInfo.response.clientDataJSON),
                        "signature": toBase64(newCredentialInfo.response.signature),
                        "userHandle": toBase64(newCredentialInfo.response.userHandle),
                    },
                    "type": newCredentialInfo.type,
                    "authenticatorAttachment": "cross-platform",
                    "clientExtensionResults": {}
                }

                console.log(jsonCreds)

                let url = 'https://regapi.gruleiru.de/verifypasskey?credentials=' + JSON.stringify(jsonCreds);
                Http.open("GET", url);
                Http.send();
                Http.onload = (e) => {
                    console.log(Http.responseText)
                }
            });




        }
    }

}

function createPasskey() {
    const publicKeyCredentialCreationOptions = {
        challenge: Uint8Array.from(session, c => c.charCodeAt(0)), // change!!
        rp: {
            name: "GruLeiRu",
            id: "gruleiru.de",
        },
        user: {
            id: Uint8Array.from("187", c => c.charCodeAt(0)), // change to uid!!
            name: DisplayName,
            displayName: DisplayName,
        },
        pubKeyCredParams: [{alg: -7, type: "public-key"},{alg: -257, type: "public-key"}],
        authenticatorSelection: {
            requireResidentKey: true,
        }
    };

    const credential = navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions
    });
    credential.then((newCredentialInfo) => {
        console.log(newCredentialInfo);
    });


}

function beta() {
    if (localStorage.getItem("beta") == "1") {
        localStorage.setItem("beta", "0");
        window.location.href = "?sid=" + session + "&&expand=true"
    } else {
        localStorage.setItem("beta", "1");
        window.location.href = "?sid=" + session + "&&expand=true"
    }
}

function superSession() {
    if (localStorage.getItem("sessionType") == "super") {
        localStorage.setItem("sessionType", "normal");
    } else {
        localStorage.setItem("sessionType", "super");
    }
    document.getElementById("toast").innerHTML = "Melden sie sich erneut an um immer angemeldet zu bleiben!";
    var x = document.getElementById("toast");
    x.className = "show";
    const loutUrl = 'https://regapi.gruleiru.de/logout?session=' + session;
    Http.open("GET", loutUrl);
    Http.send();
    Http.onload = (e) => {
        window.location.href = "https://www.gruleiru.de"
    }

}

function requestQR() {
    $(".form-block").animate({
        height: "1580"
    })
    document.getElementById("qrplace").innerHTML = `<br><span>Bitte scannen Sie diesen QR-Code mit ihrem Handy um sich einfacher und ohne Passwort und Benutzername anzumelden!</span><br><img src="${'https://2fa.gruleiru.de/genpermsession?session=' + session}">`
}




function createotp(user) {
    $(".form-block").animate({
        height: "1580"
    })
    console.log("created otp")
    const url2 = 'https://2fa.gruleiru.de/create?user=' + user + "&&session=" + session;
    document.getElementById("qrplace").innerHTML = `<br><span>Bitte scannen Sie diesen QR-Code mit ihrer Authentifizierungs-App um sich zukünftig mit den Codes der App einloggen zu können!</span><br><img src="${url2}" style="width: 100%; height: 100%;">`
}


if (Math.floor(Math.random() * 20) == 1) {
    document.getElementById("ente").src = "images/EggEnte2.png"
}


function themeToggle() {
    let element = document.body;
    element.classList.toggle("dark-mode");

    let theme = localStorage.getItem("theme");
    if (theme && theme === "dark-mode") {
        localStorage.setItem("theme", "light-mode");
        const addCSS = css => document.head.appendChild(document.createElement("style")).innerHTML = css;

        addCSS(`html:not(#ente){filter: invert(0) hue-rotate(0deg);}#ente{filter: invert(0) hue-rotate(0deg);}`)
    } else {
        localStorage.setItem("theme", "dark-mode");
        const addCSS = css => document.head.appendChild(document.createElement("style")).innerHTML = css;

        addCSS(`html:not(#ente){filter: invert(1) hue-rotate(180deg);}#ente{filter: invert(1) hue-rotate(180deg);}`)
    }

    document.getElementById("theme").textContent = localStorage.getItem("theme");
}

function cc(m, n, p, p2) {
    if (p2 == p) {
        if (p == "" || p.length >= 8) {
            document.getElementById("toast").innerHTML = "Sie werden weitergeleitet...";
            var x = document.getElementById("toast");
            x.className = "show";
            setTimeout(function(){
                const ccUrl = 'https://regapi.gruleiru.de/changeSettings?session=' + session + '&&mail=' + m + '&&name=' + n + '&&password=' + p
                Http.open("GET", ccUrl);
                Http.send();
                Http.onload = (e) => {
                    const loutUrl = 'https://regapi.gruleiru.de/logout?session=' + session;
                    Http.open("GET", loutUrl);
                    Http.send();
                    Http.onload = (e) => {
                        window.location.href = "https://www.gruleiru.de"
                    }
                }
            }, 2500);
        } else {
            document.getElementById("toast").innerHTML = "Passwort muss mindestens 8 Zeichen lang sein!";
            var x = document.getElementById("toast");
            x.className = "show";
        }


    } else {
        document.getElementById("error").innerHTML += `
        <span class="ml-auto" style="color:red;">Die Passwörter stimmen nicht überein</span> 
        <br><br>
        `
    }


}