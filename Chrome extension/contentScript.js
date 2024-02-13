// Function to extract table data
function extractTableData() {
    var table = document.querySelector('table');
    var headers = [];
    var data = [];

    // Check if table exists
    if (table) {
        // Get table headers
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
        return null; // Return null if table not found
    }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getTableData") {
        // Send table data to popup
        chrome.runtime.sendMessage({
            action: "tableData",
            data: extractTableData()
        });
    }
});
