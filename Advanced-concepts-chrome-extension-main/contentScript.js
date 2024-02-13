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

// console.log('extractTableData', extractTableData())
chrome.runtime.sendMessage(
    "hello background page",
    (response) => {
        console.log(response)
    }
)

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message)
    console.log(sender)

    sendResponse("Thank you")
})