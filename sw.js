const CACHE_VERSION = 'v4';
const PRECACHE_NAME = `precache-${CACHE_VERSION}`;
const RUNTIME_NAME  = `runtime-${CACHE_VERSION}`;

const PRECACHE_URLS = [
  '/',
  'https://fonts.bunny.net/css?family=inter:400',
  'https://unpkg.com/open-props',
  'https://unpkg.com/open-props/normalize.min.css',
  '/index.html',
  '/fixtures/index.html',
  '/players/index.html',
  '/css/home.css',
  '/css/footer.css',
  '/css/teams.css',
  '/css/fixtures.css',
  '/css/players.css',
  '/data/teams.json',
  '/data/fixtures.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => ![PRECACHE_NAME, RUNTIME_NAME].includes(k))
          .map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME_NAME);
  const cached = await cache.match(request);
  const networkFetch = fetch(request)
    .then(response => {
      if(response && response.status === 200 && response.type === 'basic') {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => null);
  return cached || networkFetch || caches.match('/offline.html');
}

self.addEventListener('fetch', event => {
  const { request } = event;
  if(request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);
  const isSameOrigin = url.origin === location.origin;

  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(request);
          // Optionally cache successful navigations
          const cache = await caches.open(RUNTIME_NAME);
          cache.put(request, fresh.clone());
          return fresh;
        } catch {
          const cache = await caches.open(PRECACHE_NAME);
          const cached = await cache.match('/index.html');
          return cached || caches.match('/offline.html');
        }
      })()
    );
    return;
  }

  if(isSameOrigin && PRECACHE_URLS.includes(url.pathname)) {
    event.respondWith(
      caches.match(request).then(cached => cached || fetch(request))
    );
    return;
  }

  const isJSON =
    url.pathname.endsWith('.json') ||
    request.headers.get('accept')?.includes('application/json');

  if(isJSON) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  event.respondWith(
    caches.match(request).then(
      cached => cached ||
        fetch(request).catch(() => caches.match('/offline.html'))
    )
  );
});
