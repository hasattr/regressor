

const platform = document.getElementById("platform");
const build = document.getElementById("build");

chrome.storage.sync.get(['platform'], function(value) {
   if(value.platform) platform.value = value.platform
});

chrome.storage.sync.get(['build'], function(value) {
   if (value.build) build.value = value.build
});

platform.addEventListener('change', (e) => {
    chrome.storage.sync.set({platform: e.target.value}, function() {
        console.log('Platfrom: ' + e.target.value);
    });
});

build.addEventListener('input', (e)=>{
    chrome.storage.sync.set({build: e.target.value}, function() {
        console.log('Build: ' + e.target.value);
    });
});