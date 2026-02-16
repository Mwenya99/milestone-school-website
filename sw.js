// Service Worker for Milestone School Website
// Version 1.0.3 (pass-through; no caching)
const CACHE_VERSION = 'v1.0.3';

// Install event - no precache
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Activate event - clean up all old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
    })
  );
  self.clients.claim();
});

// Fetch event - pass-through (no caching)
self.addEventListener('fetch', () => {});
