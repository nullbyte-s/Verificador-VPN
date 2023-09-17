document.addEventListener("DOMContentLoaded", function () {
  var ipDisplay = document.getElementById("ipDisplay");

  fetch('https://api.ipify.org?format=json')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var ip = data.ip;

      chrome.storage.sync.get(["vpnIp"], function (result) {
        var vpnIp = result.vpnIp || "";

        if (ip === vpnIp) {
          ipDisplay.textContent = "IP Atual: " + ip;
          ipDisplay.classList.add("green");
        } else {
          ipDisplay.textContent = "IP Atual: " + ip;
          ipDisplay.classList.add("red");
        }
      });
    })
    .catch(function (error) {
      console.error('Erro ao obter o IP:', error);
    });
});