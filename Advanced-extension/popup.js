document.getElementById('send_data').addEventListener('click', function () {
    document.getElementById('spinner_loader').setAttribute('style', 'display: block;');
    document.getElementById('send_data').setAttribute('disabled', 'disabled');
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "send_data" });
    });
});
document.getElementById('stop_sending').addEventListener('click', function () {
    document.getElementById('spinner_loader').setAttribute('style', 'display: none;');
    document.getElementById('send_data').removeAttribute('disabled');
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "stop_sending" });
    });
});

function updatePillText(message) {
    document.getElementById('spinner_loader').setAttribute('style', 'display: none;');
    document.getElementById('send_data').removeAttribute('disabled');
    document.getElementById("request_total_send").innerText = message.count;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.action === "requestSendCount") {
        updatePillText(message);
    }
})

