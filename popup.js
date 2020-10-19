

const platform = document.getElementById("platform");
const language = document.getElementById("language");
const build = document.getElementById("build");


chrome.storage.local.get(['platform', 'language', 'build'], function(value) {
   console.log(value)
   value.platform ? platform.value = value.platform : platform.value = "PS4"
   value.language ? language.value = value.language : null
   value.build ? build.value = value.build : null
});


platform.addEventListener('change', (e) => {
    chrome.storage.local.set({'platform': e.target.value}, function() {
     console.log(e.target.value)
    });
});

language.addEventListener('input', (e)=>{
    chrome.storage.local.set({'language': e.target.value}, function() {
        console.log(e.target.value)
   
    });
});

build.addEventListener('input', (e)=>{
    chrome.storage.local.set({'build': e.target.value}, function() {
        console.log(e.target.value)

    });
});

