const CacheName= "v1"
function register(){
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
        .then((reg) => {
          // registration worked
          console.log('Registration succeeded. Scope is ' + reg.scope);
        }).catch((error) => {
          // registration failed
          console.log('Registration failed with ' + error);
        });
    }
}

self.addEventListener('install', (event)=>{
    event.waitUntil(
        caches.open(CacheName).then((cache)=>{
            fetch('asset-manifest.json')
                .then((response)=>response.json())
                .then((data)=>{
                    let files = Object.values(data.files)
                    cache.addAll(files);
                })
        })
    )
})

self.addEventListener('fetch', (event)=>{
    event.respondWith(
        caches.match(event.request).then((resp)=>{
            if(resp){
                return resp
            }else{
                fetch(event.request).then((response)=>{
                    return caches.open('v1').then((cache)=>{
                        cache.put(event.request, response.clone());
                        return response;
                    })
                })
            }
        })
    )
    
})