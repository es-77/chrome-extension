// let fetching = false;
// let intervalId = null;

// function fetchData() {
//     // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
//     fetch('https://jsonplaceholder.typicode.com/users')
//         .then(response => response.json())
//         .then(data => {
//             document.getElementById('output').innerText = JSON.stringify(data);
//         })
//         .catch(error => console.error('Error fetching data:', error));
// }

// function toggleFetching() {
//     fetching = !fetching;
//     if (fetching) {
//         intervalId = setInterval(fetchData, 5000); // Adjust interval as needed (e.g., every 5 seconds)
//         document.getElementById('toggleButton').innerText = 'Stop Fetching';
//     } else {
//         clearInterval(intervalId);
//         document.getElementById('toggleButton').innerText = 'Start Fetching';
//     }
// }

// document.getElementById('toggleButton').addEventListener('click', toggleFetching);

document.getElementById('startBtn').addEventListener('click', sendData);
document.getElementById('stopBtn').addEventListener('click', deleteTempFiles);

function sendData() {
    alert(123)
    const data = collectDataFromTable();
    if (data.length > 0) {
        // Check if data needs to be chunked
        if (data.length > 100) {
            chunkAndSendData(data);
        } else {
            sendDataToBackend(data);
        }
    }
}

function collectDataFromTable() {
    const rows = document.querySelectorAll('#userTable tbody tr');
    const data = [];
    rows.forEach(row => {
        const name = row.querySelector('[data-id="name"]').textContent;
        const lastName = row.querySelector('[data-id="last_name"]').textContent;
        const fatherName = row.querySelector('[data-id="father_name"]').textContent;
        data.push({ name, last_name: lastName, father_name: fatherName });
    });
    return data;
}

function sendDataToBackend(data) {
    const endpoint = 'user-save-data';
    const payload = JSON.stringify(data);
    // Perform AJAX request to send data to backend
    // Example using fetch API
    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: payload
    })
        .then(response => {
            if (response.ok) {
                console.log('Data sent successfully');
            } else {
                console.error('Failed to send data');
            }
        })
        .catch(error => {
            console.error('Error sending data:', error);
        });
}

function chunkAndSendData(data) {
    // Chunk data into batches of 100
    while (data.length > 0) {
        const chunk = data.splice(0, 100);
        sendDataToBackend(chunk);
    }
}

function deleteTempFiles() {
    // Code to delete temporary files
    console.log('Temporary files deleted');
}
