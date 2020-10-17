const regressType = ["VF", "VO", "CNV", "CNR"]
let platform = "";
let language = "";
let build = "";



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

regressType.forEach((type) => {
    chrome.contextMenus.create({
        id: type,
        title: type,
        contexts: ["editable"],
        documentUrlPatterns: ["*://iwjira.activision.com/*", "*://tajira.activision.com/*"]
    });
});

function getData() {
    chrome.storage.local.get(['platform', 'language', 'build'], function(value) {
        if(value.platform) platform = value.platform
        if(value.language) language = value.language
        if(value.build) build = value.build
    });
}


chrome.contextMenus.onClicked.addListener(function(info, tab) {
    
    getData()

    let comment = "";
    switch (info.menuItemId) {
        case "VF":
            comment = `${platform}: ${info.menuItemId} for ${language} on ${build}. Thanks!`
            break;
        default:
            comment = `${platform}: ${info.menuItemId} for ${language} on ${build}.`
        
    }
    
    chrome.tabs.sendMessage(tab.id, {status: "addComment", message: comment})
});
