// Service worker minimal : met en cache les ressources statiques uniquement.
// Les pages et l’API (données utilisateur authentifiées) ne sont jamais mises en cache.
const cacheName = 'cadence-static-v8';
const files = ['/assets/icon.svg','/assets/cadence-180.png','/assets/cadence-192.png','/assets/cadence-512.png','/assets/cadence-mask-192.png','/assets/cadence-mask-512.png','/assets/regular.woff','/assets/bold.woff'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(files)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => /^(mosaique-shell|cadence-static)-/.test(key) && key !== cacheName).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (files.includes(url.pathname)) {
    event.respondWith(caches.open(cacheName).then(cache => cache.match(request)).then(cached => cached || fetch(request)));
  }
});
