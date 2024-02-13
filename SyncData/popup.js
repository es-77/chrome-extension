let isPlaying = true;
const imageBtn = document.querySelector('.image_btn');
imageBtn.addEventListener('click', function () {
    if (isPlaying) {
        imageBtn.src = "./images/icons8-play.gif";
        imageBtn.alt = "play";
        imageBtn.id = "send_data";
        isPlaying = false;
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "send_data" });
        });
    } else {
        imageBtn.src = "./images/icons8-pausing.png";
        imageBtn.alt = "pause";
        imageBtn.id = "stop_sending";
        isPlaying = true;
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "stop_sending" });
        });
    }
});

// let isPlaying = false;
// const imageBtn = document.querySelector('.image_btn');

// function toggleImage() {
//     alert('function')
//     if (isPlaying) {
//         alert('if')
//         imageBtn.src = "./images/icons8-play.gif";
//         imageBtn.alt = "play";
//         imageBtn.id = "send_data";
//         chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//             chrome.tabs.sendMessage(tabs[0].id, { action: "send_data" });
//         });
//     } else {
//         alert('else')
//         imageBtn.src = "./images/icons8-pausing.png";
//         imageBtn.alt = "pause";
//         imageBtn.id = "stop_sending";
//         chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//             chrome.tabs.sendMessage(tabs[0].id, { action: "stop_sending" });
//         });
//     }
//     isPlaying = !isPlaying;
// }

// imageBtn.addEventListener('click', toggleImage);


// document.getElementById('send_data').addEventListener('click', function () {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, { action: "send_data" });
//     });
// });
// const stopSendingButton = document.getElementById('stop_sending');

// if (stopSendingButton) {
//     stopSendingButton.addEventListener('click', function () {
//         chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//             chrome.tabs.sendMessage(tabs[0].id, { action: "stop_sending" });
//         });
//     });
// } else {
//     console.log("Element with ID 'stop_sending' does not exist.");
// }


function updatePillText(message) {
    document.getElementById("total_send_request").innerText = message.count;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.action == "requestSendCount") {
        updatePillText(message);
    }
})