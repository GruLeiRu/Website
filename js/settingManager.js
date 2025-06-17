function changeSetting(settingName, newValue, sessionID) {
  const HttpPublicSettings = new XMLHttpRequest();
  const urlPublicSettings='https://regapi.gruleiru.de/changeSettings?setting=' + settingName + '&value=' + newValue + '&session=' + sessionID;
  HttpPublicSettings.open("GET", urlPublicSettings);
  HttpPublicSettings.send();
  HttpPublicSettings.onload = (e) => {
  }
}