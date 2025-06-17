
const Http = new XMLHttpRequest();
var request = new XMLHttpRequest();
request.open("GET","./down/reason.json", false);
request.send(null);
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const domain = "https://www.gruleiru.de"
var jsonData = JSON.parse(request.responseText);
if(jsonData["reason"] == "none") {

} else {
    location.href = jsonData["reason"] + ".html"
}
function reg(id) {
    window.location = "https://www.gruleiru.de/anm?id=" + id
}

function speed(element, evid) {
    // check for username cookie
    if (localStorage.getItem("username") === null) {
        window.location = "https://www.gruleiru.de/speedreg"
    } else {
        evids = localStorage.getItem("evid") + " " + evid
        localStorage.setItem("evid", evids)
        pname = localStorage.getItem("username")
        pmail = localStorage.getItem("email")
        tnm = localStorage.getItem("tnm")
        cname = localStorage.getItem("cname")
        console.log(pname.value)
        const url = `https://hefa.gruleiru.de/regev?pname=${pname}&&cname=${cname}&&tel=${tnm}&&evid=${evid}&&pmail=${pmail}`
        Http.open("GET", url);
        Http.send();
        // cookie does not exist
        element.style.backgroundColor = "#FFF"
        element.style.borderColor = "#FFF"
        element.style.boxShadow = "0 0 0px 0 rgba(0, 0, 0, 0)"
        element.innerHTML = `
        <div class="success-checkmark" style="scale: 0.475; position: absolute; margin-top: -30px; margin-left: -20px;">
            <div class="check-icon">
                <span class="icon-line line-tip"></span>
                <span class="icon-line line-long"></span>
                <div class="icon-circle" style="color: rgba(255, 255, 255, 0);"></div>
                <div class="icon-fix"></div>
            </div>
        </div>
        `

    }
}

const url='https://regapi.gruleiru.de/public';
	Http.open("GET", url);
	Http.send();
	Http.onload = (e) => {
		response = JSON.parse(Http.responseText);
        console.log(response)

        if(response["error"] == "0x1") {
            document.getElementById("block").innerHTML += `
                      <img src="images/search.png" style="height: 40px">
                      <!--img src="images/loading.gif" style="height:45px;">-->
                      <br>
                      <span>Es gibt noch keine öffentlichen Termine!</span>

                  `
        } else {
            for (let i = 0; i < response["dates"].length; i++) {
                document.getElementById("block").innerHTML += `
                <span>${response["dates"][i]["date"]} <strong>${response["dates"][i]["title"]}</strong></span><br>
                <span>Beschreibung: ${response["dates"][i]["description"]}</span>
                <input type="button" value="Anmelden" class="btn btn-pill text-white btn-block btn-primary" id="bbbtn1" style="width: auto; height: auto; box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2)" onclick="reg(${response["dates"][i]['id']})">
                <div id="speed.${response["dates"][i]['id']}" style="width: 40px; height: 38px; box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2); background-color: #FFCD38; border-color: #FFCD38; border-radius: 20px; position: absolute; margin-top: -38px; margin-left: 155px" onclick="speed(this, ${response["dates"][i]['id']})"><img src="/images/blitz.png" style="height: 80%; margin-left: 12%; margin-top: 10%"></div>
                <div style="height:2px; background-color: #b3b3b3; border-radius:2px; margin-top: 15px;"></div>
                `
                if (localStorage.getItem("evid").includes(response["dates"][i]['id'])) {
                    element = document.getElementById(`speed.${response["dates"][i]['id']}`)
                    element.style.backgroundColor = "#FFF"
                    element.style.borderColor = "#FFF"
                    element.style.boxShadow = "0 0 0px 0 rgba(0, 0, 0, 0)"
                    element.innerHTML = `
                    <div class="success-checkmark" style="scale: 0.475; position: absolute; margin-top: -30px; margin-left: -20px;">
                        <div class="check-icon">
                            <span class="icon-line line-tip"></span>
                            <span class="icon-line line-long"></span>
                            <div class="icon-circle" style="color: rgba(255, 255, 255, 0);"></div>
                            <div class="icon-fix"></div>
                        </div>
                    </div>
                    `
                }
            }
        }



        
    }
