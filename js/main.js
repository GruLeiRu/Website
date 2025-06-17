if (localStorage.getItem("theme") == "dark-mode") {
  const addCSS = css => document.head.appendChild(document.createElement("style")).innerHTML = css;

  addCSS(`html:not(#ente){filter: invert(1) hue-rotate(180deg);}#ente{filter: invert(1) hue-rotate(180deg);}`)
} else {

}



document.getElementById("bbbtn1").onclick = function () { login() }
username = document.getElementById("username")
password = document.getElementById("password")
label = document.getElementById("lbl1")
const Http = new XMLHttpRequest();
var request = new XMLHttpRequest();
request.open("GET", "./down/reason.json", false);
request.send(null);
var jsonData = JSON.parse(request.responseText);
const qString = window.location.search;
const uParams = new URLSearchParams(qString);
const r = uParams.get('redirect')
const uFromUrl = uParams.get('u')
const pFromUrl = uParams.get('p')
if (uFromUrl != null && pFromUrl != null) {
  username.value = uFromUrl
  password.value = pFromUrl
  login()
}
if (r != "false") {
    if (jsonData["reason"] == "none") {

    } else {
        location.href = jsonData["reason"] + ".html"
    }

}
down = 0



function login() {


  //////////////////////////////////////////////Data//////////////////////////////////////////////
  (function (window) {
    {
      var unknown = '-';

      // screen
      var screenSize = '';
      if (screen.width) {
        width = (screen.width) ? screen.width : '';
        height = (screen.height) ? screen.height : '';
        screenSize += '' + width + " x " + height;
      }

      // browser
      var nVer = navigator.appVersion;
      var nAgt = navigator.userAgent;
      var browser = navigator.appName;
      var version = '' + parseFloat(navigator.appVersion);
      var majorVersion = parseInt(navigator.appVersion, 10);
      var nameOffset, verOffset, ix;

      // Opera
      if ((verOffset = nAgt.indexOf('Opera')) != -1) {
        browser = 'Opera';
        version = nAgt.substring(verOffset + 6);
        if ((verOffset = nAgt.indexOf('Version')) != -1) {
          version = nAgt.substring(verOffset + 8);
        }
      }
      // Opera Next
      if ((verOffset = nAgt.indexOf('OPR')) != -1) {
        browser = 'Opera';
        version = nAgt.substring(verOffset + 4);
      }
      // Legacy Edge
      else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
        browser = 'Microsoft Legacy Edge';
        version = nAgt.substring(verOffset + 5);
      }
      // Edge (Chromium)
      else if ((verOffset = nAgt.indexOf('Edg')) != -1) {
        browser = 'Microsoft Edge';
        version = nAgt.substring(verOffset + 4);
      }
      // MSIE
      else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
        browser = 'Microsoft Internet Explorer';
        version = nAgt.substring(verOffset + 5);
      }
      // Chrome
      else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
        browser = 'Chrome';
        version = nAgt.substring(verOffset + 7);
      }
      // Safari
      else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
        browser = 'Safari';
        version = nAgt.substring(verOffset + 7);
        if ((verOffset = nAgt.indexOf('Version')) != -1) {
          version = nAgt.substring(verOffset + 8);
        }
      }
      // Firefox
      else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
        browser = 'Firefox';
        version = nAgt.substring(verOffset + 8);
      }
      // MSIE 11+
      else if (nAgt.indexOf('Trident/') != -1) {
        browser = 'Microsoft Internet Explorer';
        version = nAgt.substring(nAgt.indexOf('rv:') + 3);
      }
      // Other browsers
      else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
        browser = nAgt.substring(nameOffset, verOffset);
        version = nAgt.substring(verOffset + 1);
        if (browser.toLowerCase() == browser.toUpperCase()) {
          browser = navigator.appName;
        }
      }
      // trim the version string
      if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
      if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
      if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

      majorVersion = parseInt('' + version, 10);
      if (isNaN(majorVersion)) {
        version = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
      }

      // mobile version
      var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

      // cookie
      var cookieEnabled = (navigator.cookieEnabled) ? true : false;

      if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
        document.cookie = 'testcookie';
        cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
      }

      // system
      var os = unknown;
      var clientStrings = [
        {s:'Windows 10', r:/(Windows 10.0|Windows NT 10.0)/},
        {s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
        {s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
        {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
        {s:'Windows Vista', r:/Windows NT 6.0/},
        {s:'Windows Server 2003', r:/Windows NT 5.2/},
        {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
        {s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
        {s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
        {s:'Windows 98', r:/(Windows 98|Win98)/},
        {s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
        {s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
        {s:'Windows CE', r:/Windows CE/},
        {s:'Windows 3.11', r:/Win16/},
        {s:'Android', r:/Android/},
        {s:'Open BSD', r:/OpenBSD/},
        {s:'Sun OS', r:/SunOS/},
        {s:'Chrome OS', r:/CrOS/},
        {s:'Linux', r:/(Linux|X11(?!.*CrOS))/},
        {s:'iOS', r:/(iPhone|iPad|iPod)/},
        {s:'Mac OS X', r:/Mac OS X/},
        {s:'Mac OS', r:/(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
        {s:'QNX', r:/QNX/},
        {s:'UNIX', r:/UNIX/},
        {s:'BeOS', r:/BeOS/},
        {s:'OS/2', r:/OS\/2/},
        {s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
      ];
      for (var id in clientStrings) {
        var cs = clientStrings[id];
        if (cs.r.test(nAgt)) {
          os = cs.s;
          break;
        }
      }

      var osVersion = unknown;

      if (/Windows/.test(os)) {
        osVersion = /Windows (.*)/.exec(os)[1];
        os = 'Windows';
      }

      switch (os) {
        case 'Mac OS':
        case 'Mac OS X':
        case 'Android':
          osVersion = /(?:Android|Mac OS|Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh) ([\.\_\d]+)/.exec(nAgt)[1];
          break;

        case 'iOS':
          osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
          osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
          break;
      }

      // flash (you'll need to include swfobject)
      var flashVersion = 'no check';
      if (typeof swfobject != 'undefined') {
        var fv = swfobject.getFlashPlayerVersion();
        if (fv.major > 0) {
          flashVersion = fv.major + '.' + fv.minor + ' r' + fv.release;
        }
        else  {
          flashVersion = unknown;
        }
      }
    }

    window.jscd = {
      screen: screenSize,
      browser: browser,
      browserVersion: version,
      browserMajorVersion: majorVersion,
      mobile: mobile,
      os: os,
      osVersion: osVersion,
      cookies: cookieEnabled,
      flashVersion: flashVersion
    };
  }(this));
  //////////////////////////////////////////////Data//////////////////////////////////////////////

  os = jscd.os +' '+ jscd.osVersion
  browser = jscd.browser
  mobile = jscd.mobile

  document.getElementById("bbbtn1").value = "Logging in...";
  const url = 'https://regapi.gruleiru.de/login?u=' + username.value + "&&psw=" + password.value + '&&device=' + os + "&&browser=" + browser + "&&mobile=" + mobile;
  Http.open("GET", url);
  Http.send();
  Http.onload = (e) => {
    response = JSON.parse(Http.responseText);
    console.log(response)
    if (response["auth"] == "1") {
      if (document.getElementById("staylgd").checked) {
        if (localStorage.getItem("sessionType") != "super") {
          localStorage.setItem("session", response["session"] + "");
          localStorage.setItem("sessionType", "normal");
        } else {
          localStorage.setItem("sessionP", btoa(password.value) + "");
          localStorage.setItem("sessionU", btoa(username.value) + "");
        }
      }
      window.location = "https://www.gruleiru.de/panel?sid=" + response["session"]


    /*

      const url2 = 'http://www.gruleiru.de:5007/logdevice?device=' + os + "&&browser=" + browser + "&&mobile=" + mobile;
      Http.open("GET", url2);
      Http.send();
      Http.onload = (e) => {
        window.location = "https://www.gruleiru.de/panel?sid=" + response["session"]
      }
      */
    } else {
      if(down == 0) {
        down = 1
        $(".btn").animate({
          marginTop: "115"
        })
      }
      $(".form-block").animate({
        height: "560"
      }, function errorMsgs(){
        document.getElementById("bbbtn1").style.marginTop = "50px"
        if (response["timeout"] == "1") {
          document.getElementById("bbbtn1").value = "Log In"
          document.getElementById("tdiv1").innerHTML = `
          <div class="d-flex mb-5 align-items-center">
            <span style="color:red;">Bitte versuche es in 1 Minute erneut</span> 
          </div>
          `
        } else if (response["auth"] == "0") {
          const url = 'https://2fa.gruleiru.de/verify?user=' + username.value + "&&code=" + password.value;
          Http.open("GET", url);
          Http.send();
          Http.onload = (e) => {
            response2 = JSON.parse(Http.responseText);
            if (response2["code"] == "True") {
              if (document.getElementById("staylgd").checked) {
                if (localStorage.getItem("sessionType") != "super") {
                  localStorage.setItem("session", response2["session"] + "");
                  localStorage.setItem("sessionType", "normal");
                } else {
                  localStorage.setItem("sessionP", btoa(password.value) + "");
                  localStorage.setItem("sessionU", btoa(username.value) + "");
                }
              }
              window.location = "https://www.gruleiru.de/panel?sid=" + response2["session"]
            } else {
              document.getElementById("bbbtn1").value = "Log In"
              document.getElementById("tdiv1").innerHTML = `
              <div class="d-flex mb-5 align-items-center" style="margin-top: -24px">
              <br><br><br>
              <a style="color:red;" onclick="reset('${username.value}')"><u>Passwort Vergessen?</u></a>
                <!--span class="ml-auto" style="color:red;">Name oder Passwort falsch.</span> -->
              </div>
          `
            }
          }
        } else if (response["auth"] == "3") {
          document.getElementById("bbbtn1").value = "Log In"
          document.getElementById("tdiv1").innerHTML = `
          <a style="color:red;" onclick="unlock('${username.value}')"><u>Konto entsperren/aktivieren</u></a>
<!--          <div class="d-flex mb-5 align-items-center" style="margin-top: -24px">-->
<!--            <span class="ml-auto" style="color:red;">Konto gesperrt oder nicht aktiviert.</span> -->
<!--            -->
<!--          </div>-->
          `
        } else {
          document.getElementById("bbbtn1").value = "Log In"
          document.getElementById("tdiv1").innerHTML = `
          <div class="d-flex mb-5 align-items-center">
            <span class="ml-auto" style="color:red;">Unknown Error!</span> 
          </div>
          `
        }
      })
      

    }

  }
}

function unlock(u) {

  const url = 'https://regapi.gruleiru.de/flock?u=' + username.value;
  Http.open("GET", url);
  Http.send();
  Http.onload = (e) => {
    response = JSON.parse(Http.responseText);
    console.log(response)
    if (response["email"] == undefined) {
      document.getElementById("bbbtn1").value = "Log In"
      document.getElementById("tdiv1").innerHTML = `
        <div class="d-flex mb-5 align-items-center">
          <span class="ml-auto" style="color:red;">Es konnte keine E-Mail gesendet werden. Bitte überprüfe die Angaben und stelle sicher, dass du deine E-Mail-Adresse mit dem Konto verknüpft hast!</a></span> 
        </div>
        `
    } else {
      document.getElementById("bbbtn1").value = "Log In"
      document.getElementById("tdiv1").innerHTML = `
        <div class="d-flex mb-5 align-items-center">
          <span class="ml-auto" style="color:red;">Es wurde eine Mail zum Zurücksetzen an ${response["email"]} gesendet</a></span> 
        </div>
        `
    }
  }
}

function reset(u) {

  const url = 'https://regapi.gruleiru.de/reset?u=' + username.value;
  Http.open("GET", url);
  Http.send();
  Http.onload = (e) => {
    response = JSON.parse(Http.responseText);
    console.log(response)
    document.getElementById("bbbtn1").value = "Log In"
    if (response["email"] == undefined) {
      document.getElementById("tdiv1").innerHTML = `
        <div class="d-flex mb-5 align-items-center">
          <span class="ml-auto" style="color:red;">Es konnte keine E-Mail gesendet werden, da keine E-Mail-Adresse mit dem Konto <strong>${username.value}</strong> verbunden ist oder das Konto nicht gefunden wurde. Bitte überprüfe die Angaben und stelle sicher, dass du deine E-Mail Adresse mit dem Konto verknüpft hast!</a></span> 
        </div>
        `
    } else {
      document.getElementById("tdiv1").innerHTML = `
        <div class="d-flex mb-5 align-items-center">
          <span class="ml-auto" style="color:red;">Es wurde eine Mail mit einem Token an ${response["email"]} gesendet</a></span> 
        </div>
        `
    }

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