/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    async ready (registration) {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered (registration) {
      console.log('Service worker has been registered.')
      registration.addEventListener('push', (event) => {
        console.log('push')
        if (event.data) {
          console.log('Push event!! ', event.data.text())
        } else {
          console.log('Push event but no data')
        }
      })
      self.addEventListener('push', (event) => {
        console.log('push')
        if (event.data) {
          console.log('Push event!! ', event.data.text())
        } else {
          console.log('Push event but no data')
        }
      })
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated () {
      console.log('New content is available; please refresh.')
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    },
  })
}
