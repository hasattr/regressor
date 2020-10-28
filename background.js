chrome.runtime.onInstalled.addListener(function() {
  
  const regressType = ["VF", "VO", "CNV", "CNR"]
  
  regressType.forEach((type) => {
      chrome.contextMenus.create({
          id: type,
          title: type,
          contexts: ["editable", "frame"],
          documentUrlPatterns: ['about:blank', '*://tajira.activision.com/*', '*://iwjira.activision.com/*']
      });
  });

});



function insert (info, tab) {
  chrome.storage.local.get(['platform', 'language', 'build'], function(value) {
    
    const {platform, language, build } = value;

    if (platform && language && build) {
    
      let comment = `${platform}: ${info.menuItemId} for ${language} on build ${build}.`
      if (info.menuItemId === 'VF') comment += ' Thanks!'
      chrome.tabs.sendMessage(tab.id, {status: "addComment", message: comment})
 
    } else {
      let missing = [];
      if(!platform) missing.push("Platform")
      if(!language) missing.push("Language")
      if(!build) missing.push("Build Number")

      chrome.tabs.sendMessage(tab.id, {status: "missing", message: missing})
      
    }
  });
}


chrome.contextMenus.onClicked.addListener(insert);
