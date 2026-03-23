const CACHE_NAME = "ismail-library-v1";

// الملفات الأساسية
const urlsToCache = [
  "/",
  "index.html",
  "style.css",
  "books.json",
  "logo.png",
  "images/ismail_photo.jpg",
  "images/book_default.png"
];

// ===== تثبيت Service Worker =====
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("تم حفظ الملفات");
        return cache.addAll(urlsToCache);
      })
  );
});

// ===== تشغيله =====
self.addEventListener("activate", event => {
  console.log("Service Worker مفعل");
});

// ===== جلب الملفات (بدون إنترنت) =====
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
