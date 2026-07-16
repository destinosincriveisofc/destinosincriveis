// Custom Service Worker logic for Web Push Notifications
self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Event Received.');
  let payload = {};
  
  try {
    payload = event.data ? event.data.json() : {};
  } catch (e) {
    console.warn('[Service Worker] Failed to parse push data as JSON, using fallback.', e);
    payload = {
      title: event.data ? event.data.text() : 'Alerta de Oferta no ar!'
    };
  }
  
  const title = payload.title || 'Alerta de Oferta no ar!';
  const options = {
    body: payload.body || 'Clique para ver todas as ofertas no DIJA Club.',
    icon: payload.icon || '/icon-192.png',
    badge: payload.badge || '/icon-192.png',
    data: {
      url: payload.url || '/ofertas/'
    },
    vibrate: [100, 50, 100],
    actions: [
      {
        action: 'explore',
        title: 'Ver Oferta'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification Clicked.');
  event.notification.close();
  
  let targetUrl = event.notification.data && event.notification.data.url
    ? event.notification.data.url
    : '/ofertas/';
    
  if (targetUrl.startsWith('/')) {
    targetUrl = new URL(targetUrl, self.location.origin).href;
  }
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(function(windowClients) {
        for (let i = 0; i < windowClients.length; i++) {
          const client = windowClients[i];
          if (client.url === targetUrl && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      })
  );
});
