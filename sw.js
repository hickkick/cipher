const CACHE_NAME = 'cipher-app-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/main.js',
    '/style.css'
    // Додай сюди інші файли якщо є (CSS, JS)
];

// Встановлення Service Worker і кешування файлів
self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Caching files');
                return cache.addAll(urlsToCache);
            })
    );
});

// Активація Service Worker і очищення старих кешів
self.addEventListener('activate', event => {
    console.log('Service Worker: Activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Обробка запитів - спочатку з кешу, потім з мережі
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Повертаємо з кешу якщо є, інакше робимо запит в мережу
                return response || fetch(event.request);
            })
            .catch(() => {
                // Якщо офлайн і немає в кеші - можна повернути дефолтну сторінку
                console.log('Service Worker: Fetch failed, app is offline');
            })
    );
});