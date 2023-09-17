var alertDiv = document.createElement("div");
alertDiv.style.position = "fixed";
alertDiv.style.top = "0";
alertDiv.style.left = "35%";
alertDiv.style.right = "35%";
alertDiv.style.backgroundColor = "red";
alertDiv.style.color = "white";
alertDiv.style.textAlign = "center";
alertDiv.style.padding = "10px";
alertDiv.style.zIndex = "9999";
alertDiv.innerHTML = "ATENÇÃO: Sua VPN está ativada.";
alertDiv.style.display = "none";
document.body.appendChild(alertDiv);

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.vpnActivated) {
    alertDiv.style.display = "block";
  }
  if (!sessionStorage.getItem("vpnAlertShown")) {
    sessionStorage.setItem("vpnAlertShown", "true");
    alert("ATENÇÃO: Sua VPN está ativada.");
  }
});