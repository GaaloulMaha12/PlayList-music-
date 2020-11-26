var CACHE_NAME = ["https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css",
"https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900",
"http://localhost:3000/music"];
self.addEventListener("install", event => {
    console.log('Service Worker installé');
});
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(
                [
                    '/',
                    '/bundle.js',
                    '/style.css',
                ]
            );
        })
    );
});
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
fetch(event.request).then(function (response) {
    caches.put(event.request, response.clone());
    return response;
});
function shouldHandleFetch(event) {
    return (
        // On vérifie que la méthode est bien GET
        event.request.method.toLowerCase() === 'get' && (
            // et on vérifie si la ressource provient de media.guim.co.uk (le domaine pour les images)
            event.request.url.indexOf('media.guim.co.uk') !== -1
            // ou si c'est un appel à l'API guardianapis.com
            || event.request.url.indexOf('guardianapis.com') !== -1
        )
    )
}
self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request).catch(function() {
            return caches.match(event.request);
        })
    );
});
self.addEventListener('activate', (event) => {
    // On créer une tableau de caches à "whitelister"
    var cacheWhitelist = [CACHE_NAME]
    event.waitUntil(
        // On récupère l'ensemble des caches disponibles
        caches.keys().then(cacheNames => {
            return Promise.all(
                // On itère sur chacun des caches
                cacheNames.map(cacheName => {
                    // Si il n'est pas whitelisté, on le supprimme
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
})