/**
 * SERVICE WORKER - THE GREEN WALINI
 * File: sw.js
 * Fungsi: Mengaktifkan background notification resmi di Android/Chrome & offline caching
 */

self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

// Menangani klik pada banner notifikasi darurat
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if ('focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('./index.html');
      }
    })
  );
});

// Menerima perintah tampilkan notifikasi dari halaman web
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'TRIGGER_SOS_NOTIFICATION') {
    var title = event.data.title || '🚨 DARURAT POS SATPAM';
    var options = event.data.options || {};
    self.registration.showNotification(title, options);
  }
});
