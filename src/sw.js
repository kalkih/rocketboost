self.addEventListener('push', (event) => {
  event.waitUntil(handlePush(event))
})

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

// workbox.clientsClaim()

// // The precaching code provided by Workbox.
// self.__precacheManifest = [].concat(self.__precacheManifest || [])
// workbox.precaching.suppressWarnings()
// workbox.precaching.precacheAndRoute(self.__precacheManifest, {})
// workbox.routing.registerNavigationRoute('/')
