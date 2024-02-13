let abortController;
let ongoingRequests = [];
let sendRequestCount = 0;

document.getElementById('sendDataBtn').addEventListener('click', sendData);
document.getElementById('stopBtn').addEventListener('click', stopSendingData);
document.getElementById('table_data').addEventListener('click', tableDataGet);

function tableDataGet() {
    var table = document.querySelector('table');
    var headers = [];
    var data = [];
    var headerRow = table.querySelector('thead tr');
    var headerCells = headerRow.querySelectorAll('th');
    headerCells.forEach(function (cell) {
        headers.push(cell.textContent);
    });
    var rows = table.querySelectorAll('tbody tr');
    rows.forEach(function (row) {
        var rowData = {};
        var cells = row.querySelectorAll('td');
        cells.forEach(function (cell, index) {
            rowData[headers[index]] = cell.textContent;
        });
        data.push(rowData);
    });

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>", data);
}

function sendData() {
    if (abortController) {
        abortController.abort();
        document.getElementById('sendDataBtn').removeAttribute('disabled');
        document.getElementById('spinner_loader').removeAttribute('style');


    }

    document.getElementById('sendDataBtn').setAttribute('disabled', 'disabled');
    document.getElementById('spinner_loader').setAttribute('style', 'display: block;');


    abortController = new AbortController();

    const tableRows = Array.from(document.querySelectorAll('#userTable tbody tr'));
    const data = tableRows.map(row => {
        return {
            image_url: row.querySelector('[data-id="image"]').getAttribute('src').trim(),
            name: row.querySelector('[data-id="name"]').textContent.trim(),
            last_name: row.querySelector('[data-id="last_name"]').textContent.trim(),
            father_name: row.querySelector('[data-id="father_name"]').textContent.trim()
        };
    });

    const chunks = chunkArray(data, 100);
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
                    document.getElementById('spinner_loader').setAttribute('style', 'display: none;');
                    document.getElementById("request_total_send").innerText = sendRequestCount;
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
    document.getElementById('sendDataBtn').removeAttribute('disabled');
    document.getElementById('spinner_loader').setAttribute('style', 'display: none;');

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

const userData = [
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    { name: "Emmanuel" },
    // Add more user data objects here
];

function generateTableRows(data) {
    const tbody = document.querySelector('#userTable tbody');
    tbody.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        data.forEach((user, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <th scope="row">${index + 1}</th>
                        <td class="w-25">
			      <img data-id="image" src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/sheep-5.jpg" class="img-fluid img-thumbnail" alt="Sheep">
		      </td>
                <td data-id="name"> name ${user.name} ${index + 1}</td>
                <td data-id="last_name"> last_name ${index + 1}</td>
                <td data-id="father_name"> father_name ${index + 1}</td>
            `;
            tbody.appendChild(row);
        });
    }
}

generateTableRows(userData);


// get dom table data

document.querySelector('button').addEventListener('click', function () {
    var table = document.querySelector('table');
    var headers = [];
    var data = [];
    var headerRow = table.querySelector('thead tr');
    var headerCells = headerRow.querySelectorAll('th');
    headerCells.forEach(function (cell) {
        headers.push(cell.textContent);
    });
    var rows = table.querySelectorAll('tbody tr');
    rows.forEach(function (row) {
        var rowData = {};
        var cells = row.querySelectorAll('td');
        cells.forEach(function (cell, index) {
            rowData[headers[index]] = cell.textContent;
        });
        data.push(rowData);
    });

    console.log(data);
});
