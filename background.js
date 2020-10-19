chrome.runtime.onInstalled.addListener(function() {
  
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'iwjira.activision.com'},
        }),
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'tajira.activision.com'},
        })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});


const regressType = ["VF", "VO", "CNV", "CNR"]

regressType.forEach((type) => {
    chrome.contextMenus.create({
        id: type,
        title: type,
        contexts: ["editable"],
        documentUrlPatterns: ["*://iwjira.activision.com/*", "*://tajira.activision.com/*"]
    });
});

function insert (info, tab) {
  chrome.storage.local.get(['platform', 'language', 'build'], function(value) {
    
    let data = [value.platform, value.language, value.build]
  
    let comment = `${data[0]}: ${info.menuItemId} for ${data[1]} on ${data[2]}.`
  
    if (info.menuItemId === 'VF') comment += ' Thanks!'
    
    chrome.tabs.sendMessage(tab.id, {status: "addComment", message: comment})
 });
}


chrome.contextMenus.onClicked.addListener(insert);
