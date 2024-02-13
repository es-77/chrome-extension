let abortController;
let ongoingRequests = [];
let sendRequestCount = 0;


function extractTableData() {
    var table = document.querySelector('table');
    var headers = [];
    var data = [];
    if (table) {
        var headerRow = table.querySelector('thead tr');
        var headerCells = headerRow.querySelectorAll('th');
        headerCells.forEach(function (cell) {
            headers.push(cell.textContent);
        });

        // Get table data
        var rows = table.querySelectorAll('tbody tr');
        rows.forEach(function (row) {
            var rowData = {};
            var cells = row.querySelectorAll('td');
            cells.forEach(function (cell, index) {
                rowData[headers[index]] = cell.textContent;
            });
            data.push(rowData);
        });

        return data;
    } else {
        return null;
    }
}

function sendData(data) {
    if (abortController) {
        abortController.abort();
        // document.getElementById('sendDataBtn').removeAttribute('disabled');
        // document.getElementById('spinner_loader').removeAttribute('style');
    }
    // document.getElementById('sendDataBtn').setAttribute('disabled', 'disabled');
    // document.getElementById('spinner_loader').setAttribute('style', 'display: block;');
    abortController = new AbortController();

    const chunks = chunkArray(data, 10);
    let totalSendRequests = 0;

    chunks.forEach(chunk => {
        const signal = abortController.signal;
        fetch('http://127.0.0.1:8000/api/save-user-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(chunk),
            signal: signal
        })
            .then(response => {
                if (response.ok) {
                    deleteChunk(chunk, ongoingRequests);
                    sendRequestCount += chunk.length
                    totalSendRequests++;
                    // document.getElementById('spinner_loader').setAttribute('style', 'display: none;');
                    // document.getElementById("request_total_send").innerText = sendRequestCount;
                    chrome.runtime.sendMessage(
                        { action: 'requestSendCount', count: sendRequestCount }
                    )
                } else {
                    console.error('Failed to send data');
                }
            })
            .catch(error => {
                console.error('Error sending data:', error);
            });
    });
}

function stopSendingData() {
    // document.getElementById('sendDataBtn').removeAttribute('disabled');
    // document.getElementById('spinner_loader').setAttribute('style', 'display: none;');

    if (abortController) {
        abortController.abort();
    }
}

function chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
}

function deleteChunk(chunk, ongoingRequests) {
    const index = ongoingRequests.findIndex(request => request.body === JSON.stringify(chunk));
    if (index !== -1) {
        ongoingRequests.splice(index, 1);
    }
}


chrome.runtime.sendMessage(
    "hello background page",
    (response) => {
        console.log(response)
    }
)


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    sendResponse("Thank you");
    if (message.action === "send_data") {
        console.log(sendData(extractTableData()));
    }
    if (message.action === "stop_sending") {
        if (abortController) {
            abortController.abort();
        }
    }
})


