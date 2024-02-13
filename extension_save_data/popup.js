// popup.js
document.getElementById('startBtn').addEventListener('click', sendData);
document.getElementById('stopBtn').addEventListener('click', deleteTempFiles);

function sendData() {
    alert(1234)
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "sendData" });
    });
}

function deleteTempFiles() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "deleteTempFiles" });
    });
}
