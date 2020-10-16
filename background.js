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