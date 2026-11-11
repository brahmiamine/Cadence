const cacheName = 'mosaique-shell-v7';
const files = ['./','./style.css','./app.js','./model.js','./manifest.webmanifest','./assets/icon.svg','./assets/cadence-180.png','./assets/cadence-192.png','./assets/cadence-512.png','./assets/cadence-mask-192.png','./assets/cadence-mask-512.png','./assets/regular.woff','./assets/bold.woff'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(files)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('mosaique-shell-') && key !== cacheName).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  const scope = new URL(self.registration.scope);
  if (request.mode === 'navigate' && [scope.pathname, new URL('index.html', scope).pathname].includes(url.pathname)) {
    // The host redirects /index.html. Chrome rejects redirected cached responses for navigation.
    event.respondWith(caches.open(cacheName).then(cache => cache.match('./')).then(cached => cached && !cached.redirected ? cached : fetch(request)));
    return;
  }
  if (files.some(file => new URL(file, self.registration.scope).href === url.href)) {
    event.respondWith(caches.open(cacheName).then(cache => cache.match(request)).then(cached => cached || fetch(request)));
  }
});
