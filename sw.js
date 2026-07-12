const CACHE_NAME = 'edukids-ultimate-v3';
const OFFLINE_URL = './index.html';

const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './manifest.json'
];

// Install - Cache assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Caching app assets');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Activate - Clean old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
    self.clients.claim();
});

// Fetch - Serve from cache, fallback to network
self.addEventListener('fetch', event => {
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).catch(() => {
                return caches.match(OFFLINE_URL);
            })
        );
        return;
    }
    
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).then(fetchResponse => {
                // Cache new assets dynamically
                if (event.request.url.startsWith('http')) {
                    const responseClone = fetchResponse.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseClone);
                    });
                }
                return fetchResponse;
            }).catch(() => {
                // Fallback for images
                if (event.request.destination === 'image') {
                    return new Response('', { status: 404 });
                }
            });
        })
    );
});

// Background sync (for future analytics)
self.addEventListener('sync', event => {
    if (event.tag === 'sync-progress') {
        event.waitUntil(syncProgress());
    }
});

async function syncProgress() {
    // Future: sync player progress to cloud
    console.log('Background sync triggered');
}

// Push notifications (for future daily reminders)
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'Waktunya belajar! 📚',
        icon: './icon-192.png',
        badge: './icon-192.png',
        vibrate: [200, 100, 200],
        data: { url: './index.html' }
    };
    
    event.waitUntil(
        self.registration.showNotification('EduKids Adventure', options)
    );
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});
