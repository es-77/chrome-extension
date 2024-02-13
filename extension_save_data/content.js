// content.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action == "sendData") {
        const data = collectDataFromTable();
        if (data.length > 0) {
            sendDataToBackend(data);
        }
    } else if (request.action == "deleteTempFiles") {
        deleteTempFiles();
    }
});

function collectDataFromTable() {
    // Collect data from the table
}

function sendDataToBackend(data) {
    alert('data send into console and backend')
    console.log('datadatadata', data)
    // Send data to backend
}

function deleteTempFiles() {
    // Delete temporary files
}
