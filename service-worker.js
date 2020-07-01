importScripts("/precache-manifest.0df9c56100d0b4dfc4dc3459ac144d73.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-globals */

workbox.precaching.precacheAndRoute(self.__precacheManifest)
workbox.routing.registerNavigationRoute('/')

const handlePush = async (event) => {
  const channel = new BroadcastChannel('sw-push')
  const message = JSON.parse(event.data.text())
  channel.postMessage(message)

  const { title, body, timestamp } = message
  // Possibly utilize notification tag here
  const options = {
    body,
    icon: '/img/icons/android-chrome-any-192x192.png',
    badge: '/img/icons/android-chrome-any-192x192.png',
    timestamp,
    vibrate: 100,
  }
  return self.registration.showNotification(title, options)
}

self.addEventListener('push', (event) => {
  event.waitUntil(handlePush(event))
})

