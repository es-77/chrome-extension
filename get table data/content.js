document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('getTableData').addEventListener('click', function () {
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

            console.log(data); // Output the data to console (you can use it as per your requirement)
        } else {
            console.log('Table not found.');
        }
    });
});
