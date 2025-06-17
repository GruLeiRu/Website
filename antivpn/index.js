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
        target.innerHTML = 'Failed to request simulated location!<br>'
        return
    }

    if (result) {
        target.innerHTML = `
            VPN not detected<br>
            <b>Location:</b> ${real}<br>
        `
    }
    else {
        target.innerHTML = `
            VPN detected<br>
            <b>Real Location:</b> ${real}<br>
            <b>Simulated location:</b> ${simulated}<br>
        `
    }
}

target.innerText = 'Detecting...'
runDetect()