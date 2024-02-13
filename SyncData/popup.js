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

function updatePillText(message) {
    // document.getElementById("total_send_request").innerText = message.count;
}

async function changeActionIcon(message) {
    for (let index = 1; index < message.total_request; index++) {
        await new Promise(resolve => {
            setTimeout(() => {
                document.getElementById("total_send_request").innerText = index;
                resolve();
            }, 100);
        });
    }
    imageBtn.src = "./images/icons8-pausing.png";
    imageBtn.alt = "pause";
    imageBtn.id = "stop_sending";
    isPlaying = true;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.action == "requestSendCount") {
        updatePillText(message);
    }
    if (message.action == "total_chunk_action") {
        changeActionIcon(message);
    }
})


