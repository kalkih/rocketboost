/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-globals */
importScripts('./env-vars.js')

workbox.precaching.precacheAndRoute(self.__precacheManifest)
workbox.routing.registerNavigationRoute('/')

const handlePush = async (event) => {
  const channel = new BroadcastChannel('sw-push')
  const message = JSON.parse(event.data.text())
  channel.postMessage(message)

  const { title, body, timestamp, id, topic } = message
  // Possibly utilize notification tag here
  const options = {
    body,
    icon: '/img/icons/android-chrome-any-192x192.png',
    badge: '/img/icons/android-chrome-any-192x192.png',
    timestamp,
    vibrate: 100,
    data: { id, topic },
  }
  return self.registration.showNotification(title, options)
}

self.addEventListener('notificationclick', (event) => {
  const { id, topic } = event.notification.data || {}
  event.notification.close()
  clients.openWindow(`${BASE_URL}/${topic}/${id}`)
})

self.addEventListener('push', (event) => {
  event.waitUntil(handlePush(event))
})
