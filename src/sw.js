self.addEventListener('push', (event) => {
  const channel = new BroadcastChannel('sw-push')
  const message = JSON.parse(event.data.text())
  channel.postMessage(message)

  event.waitUntil(showNotification(message))
})

const showNotification = (message) => {
  const { title, body, timestamp } = message.data
  // Possibly utilize notification tag here
  const options = {
    body,
    icon: '/img/icons/android-chrome-any-192x192.png',
    badge: '/img/icons/android-chrome-any-192x192.png',
    timestamp,
  }
  self.registration.showNotification(title || process.env.VUE_APP_NAME, options)
}

// workbox.clientsClaim()

// // The precaching code provided by Workbox.
// self.__precacheManifest = [].concat(self.__precacheManifest || [])
// workbox.precaching.suppressWarnings()
// workbox.precaching.precacheAndRoute(self.__precacheManifest, {})
// workbox.routing.registerNavigationRoute('/')
