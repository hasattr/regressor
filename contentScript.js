

//content script
let textArea = null
document.addEventListener("contextmenu", function(event){
  
  textArea = event.target
  console.log("context", event.target)
}, true);

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(message.status === "addComment") {
      if(textArea.tagName === 'TEXTAREA'&& textArea.id === 'comment') textArea.value = message.message
      if(textArea.tagName === "HTML") textArea.querySelector('p').innerHTML = message.message
      if(textArea.tagName === "P") textArea.innerHTML = message.message

    } 

    if (message.status === "missing") {
      let missing = message.message.join(", ")
      alert("Missing: " + missing)
    }
});