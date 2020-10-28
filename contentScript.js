

//content script
let textArea;

document.addEventListener("contextmenu", function(event){  
  textArea = event.target
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if(message.status === "addComment" && textArea) {
      console.log("sender", sender)
      let add = window.parent.document.querySelector("input[disabled='disabled']")
      add && add.removeAttribute("disabled")
      if(textArea.tagName === 'TEXTAREA' && textArea.id === 'comment') textArea.value = message.message
      if(textArea.tagName === "HTML") textArea.querySelector('p').innerHTML = message.message
      if(textArea.tagName === "P") textArea.innerHTML = message.message
     
    } 

    if (message.status === "missing") {
      let missing = message.message.join(", ")
      alert("Missing: " + missing)
    }
});