self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open('whatto-v2').then(c => c.addAll([])));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== 'whatto-v2').map(k => caches.delete(k)))));
});
self.addEventListener('fetch', e => {
  // Ne cachiramo API pozive, samo fetchamo network
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
