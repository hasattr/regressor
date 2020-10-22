

const eltPlatform = document.getElementById("platform")
const eltLanguage = document.getElementById("language")
const eltBuild = document.getElementById("build")


function setStorage(name, value) {
  chrome.storage.local.set({[name]: value}, function() {
    console.log(name, value)
   });
}


chrome.storage.local.get(['platform', 'language', 'build'], function(value) {
    
  const { platform, language, build } = value
  
  const elts = [
    { element: eltPlatform, value: platform, name: 'platform', default: 'PS4' },
    { element: eltLanguage, value: language, name: 'language', default: 'AR' },
    { element: eltBuild, value: build, name: 'build', default: ''}
  ]

  elts.forEach( elt =>{
    if (elt.value) {
      elt.element.value = elt.value
      setStorage(elt.name, elt.value)
    } else {
      elt.element.value = elt.default
      setStorage(elt.name, elt.default)
    }
  })

  
});


platform.addEventListener('change', (e) => {
    setStorage('platform', e.target.value)
});

language.addEventListener('change', (e)=>{
    setStorage('language', e.target.value)
});

build.addEventListener('input', (e)=>{
    setStorage('build', e.target.value)
});

