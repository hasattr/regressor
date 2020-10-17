

//content script
let textArea = null;

document.addEventListener("contextmenu", function(event){
    textArea = event.target
    console.log("TEXTAREA", textArea)
}, true);

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(message.status === "addComment") {
        console.log("MESSAGE", message)
        textArea.value = message.message
        sendResponse({value: "commented"})
    }
});