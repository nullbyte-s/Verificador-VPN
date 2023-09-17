let ipVpn = "";
let ipAtual = "";

async function obterIP() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Erro ao obter o IP:', error);
    return null;
  }
}

chrome.runtime.onStartup.addListener(function () {
  ipAtual = obterIP();
});

chrome.webNavigation.onCompleted.addListener(async function (details) {
  chrome.storage.sync.get(["updateIPAutomatically"], async function (result) {
    if (result.updateIPAutomatically) {
      ipAtual = await obterIP();
    }
    // else if (ipAtual === "") {
    //     ipAtual = await obterIP();
    // }
    chrome.storage.sync.get(["ipVpn"], function (result) {
      ipVpn = result.ipVpn || "";
      verificarVPN(ipAtual, ipVpn, details);
    });
  });
});

function verificarVPN(ip, ipVpn, details) {
  if (ip != ipVpn) {
    chrome.tabs.sendMessage(details.tabId, { vpnActivated: true });
  }
}