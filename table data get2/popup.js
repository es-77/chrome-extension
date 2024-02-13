document.getElementById("getTableData").addEventListener("click", () => {
    chrome.runtime.sendMessage({ message: "getTableData" });
});