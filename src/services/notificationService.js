const channel = new BroadcastChannel('sw-push')

const notificationService = {
  setupNotificationWatcher: async () => {
    channel.addEventListener('message', event => {
      // To something here if the app is opemn while getting a push
    })
  },
}

export default notificationService