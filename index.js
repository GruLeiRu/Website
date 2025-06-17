const target = document.getElementById('target')

async function runDetect() {
    let result, real, simulated
    try {
        res = await detectVPN()
        result = res.result
        real = res.real
        simulated = res.simulated
    }
    catch {
        target.innerHTML = 'Unknown Error!'
        return
    }

    if (result) {
        target.innerHTML = ""
    }
    else {
        target.innerHTML = `
        <div style="position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; background-color: #d4d4d479; width: 100%; height: 100vh;"></div>
        <div id="cookiePopup">
        <h4 style="margin-top: 10px;">VPN Gefunden</h4>
        <p>Diese Website kann nicht mit einem VPN verwendet werden, da der Standord ein wichtiger Bestandteil der Datenerhebung ist! Ihr Standort: ${real} | Simulierter Standort: ${simulated}</p>
        </div>
        `
    }
}

target.innerHTML = `
        <div style="position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; background-color: #d4d4d479; width: 100%; height: 100vh;"></div>
        <div id="cookiePopup">
        <h4 style="margin-top: 10px;">Laden...</h4>
        <p>Wir überprüfen gerade, ob sie einen VPN benutzen. Bitte haben sie einen Momment Geduld.</p>
        </div>
        `
runDetect()