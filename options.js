document.addEventListener("DOMContentLoaded", function () {
  var vpnIpInput = document.getElementById("vpnIp");
  var saveButton = document.getElementById("save");
  var getAndSaveIpButton = document.getElementById("getAndSaveIp");
  var alertCheckbox = document.getElementById("alertCheckbox");
  var updateIPCheckbox = document.getElementById("updateIPCheckbox");

  chrome.storage.sync.get(["vpnIp", "showVPNAlert", "updateIPAutomatically"], function (result) {
    vpnIpInput.value = result.vpnIp || "";
    alertCheckbox.checked = result.showVPNAlert || false;
    updateIPCheckbox.checked = result.updateIPAutomatically || false;
  });

  saveButton.addEventListener("click", function () {
    var vpnIp = vpnIpInput.value;
    var showVPNAlert = alertCheckbox.checked;
    var updateIPAutomatically = updateIPCheckbox.checked;

    chrome.storage.sync.set({ vpnIp: vpnIp, showVPNAlert: showVPNAlert, updateIPAutomatically: updateIPAutomatically }, function () {
      alert("Configurações salvas com sucesso.");
    });
  });

  getAndSaveIpButton.addEventListener("click", function () {
    fetch('https://api.ipify.org?format=json')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var currentIp = data.ip;
        chrome.storage.sync.set({ vpnIp: currentIp }, function () {
          vpnIpInput.value = currentIp;
          alert("IP da VPN atualizado e salvo com sucesso.");
        });
      })
      .catch(function (error) {
        console.error('Erro ao obter o IP:', error);
      });
  });
});