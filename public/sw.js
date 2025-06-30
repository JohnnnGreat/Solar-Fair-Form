// public/sw.js - Service Worker file
const CACHE_NAME = "kedco-app-v1";
const OFFLINE_URL = "/offline.html";

// Files to cache for offline use
const urlsToCache = [
   "/",
   "/static/js/bundle.js",
   "/static/css/main.css",
   "/manifest.json",
   OFFLINE_URL,
   // Add your specific routes that should work offline
   "/analytics",
   "/transactions",
   // Add any API endpoints you want to cache
   "/api/mappings/business",
];

// Install event - cache resources
self.addEventListener("install", (event) => {
   event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
         console.log("Opened cache");
         return cache.addAll(urlsToCache);
      }),
   );
   // Force the waiting service worker to become the active service worker
   self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
   event.waitUntil(
      caches.keys().then((cacheNames) => {
         return Promise.all(
            cacheNames.map((cacheName) => {
               if (cacheName !== CACHE_NAME) {
                  console.log("Deleting old cache:", cacheName);
                  return caches.delete(cacheName);
               }
            }),
         );
      }),
   );
   // Ensure the service worker takes control immediately
   self.clients.claim();
});

// Fetch event - serve from cache when offline
self.addEventListener("fetch", (event) => {
   // Only handle GET requests
   if (event.request.method !== "GET") {
      return;
   }

   event.respondWith(
      caches
         .match(event.request)
         .then((response) => {
            // Return cached version or fetch from network
            if (response) {
               return response;
            }

            return fetch(event.request).then((response) => {
               // Don't cache non-successful responses
               if (!response || response.status !== 200 || response.type !== "basic") {
                  return response;
               }

               // Clone the response for caching
               const responseToCache = response.clone();

               caches.open(CACHE_NAME).then((cache) => {
                  cache.put(event.request, responseToCache);
               });

               return response;
            });
         })
         .catch(() => {
            // If both cache and network fail, show offline page
            if (event.request.destination === "document") {
               return caches.match(OFFLINE_URL);
            }
         }),
   );
});

// Background sync for when connection is restored
self.addEventListener("sync", (event) => {
   if (event.tag === "background-sync") {
      event.waitUntil(doBackgroundSync());
   }
});

async function doBackgroundSync() {
   // Sync offline actions when connection is restored
   const offlineActions = await getOfflineActions();

   for (const action of offlineActions) {
      try {
         await syncAction(action);
         await removeOfflineAction(action.id);
      } catch (error) {
         console.error("Failed to sync action:", error);
      }
   }
}

async function getOfflineActions() {
   // Get offline actions from IndexedDB
   return new Promise((resolve) => {
      const request = indexedDB.open("offlineActions", 1);
      request.onsuccess = (event) => {
         const db = event.target.result;
         const transaction = db.transaction(["actions"], "readonly");
         const store = transaction.objectStore("actions");
         const getAllRequest = store.getAll();

         getAllRequest.onsuccess = () => {
            resolve(getAllRequest.result);
         };
      };
   });
}

async function syncAction(action) {
   // Sync individual action with server
   const response = await fetch(action.url, {
      method: action.method,
      headers: action.headers,
      body: action.body,
   });

   if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
   }

   return response;
}

async function removeOfflineAction(actionId) {
   // Remove synced action from IndexedDB
   return new Promise((resolve) => {
      const request = indexedDB.open("offlineActions", 1);
      request.onsuccess = (event) => {
         const db = event.target.result;
         const transaction = db.transaction(["actions"], "readwrite");
         const store = transaction.objectStore("actions");
         const deleteRequest = store.delete(actionId);

         deleteRequest.onsuccess = () => {
            resolve();
         };
      };
   });
}
