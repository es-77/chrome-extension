chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "getTableData") {
        if (sender.tab && sender.tab.id) {
            chrome.tabs.executeScript(
                sender.tab.id,
                { code: `getTableData()` },
                () => {
                    console.log("Table data has been logged.");
                }
            );
        } else {
            console.error("Unable to find sender tab or tab ID is missing.");
        }
    }
});

function getTableData() {
    const tables = document.getElementsByTagName("table");
    const tableData = [];

    for (const table of tables) {
        const rows = table.getElementsByTagName("tr");
        for (const row of rows) {
            const cols = row.getElementsByTagName("td");
            const colValues = [];
            for (const col of cols) {
                colValues.push(col.innerText);
            }
            tableData.push(colValues.join(","));
        }
    }

    console.log(tableData);
}