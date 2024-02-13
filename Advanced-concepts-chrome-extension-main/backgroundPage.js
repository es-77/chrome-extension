chrome.tabs.onActivated.addListener((tab) => {
    console.log(tab)
    chrome.tabs.get(tab.tabId, (CurrentTabData) => {
        console.log('CurrentTabData', CurrentTabData)
        chrome.scripting.executeScript({
            target: { tabId: CurrentTabData.id },
            files: ['contentScript.js']
        });
    })
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message)
    console.log(sender)

    sendResponse("hi")
})
