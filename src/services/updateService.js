import { GENERIC_NEW_VERSION, GENERIC_ERROR } from '@/lang/errors'
import store from '@/store/index'

const channel = new BroadcastChannel('sw-updated')

const refresh = async () => {
  try {
    const swReg = await navigator.serviceWorker.getRegistration()
    swReg.waiting.postMessage('skipWaiting')
  } catch (error) {
    store.dispatch('toasts/add', { text: GENERIC_ERROR })
  }
}

const updateService = {
  setupUpdateWatcher: async () => {
    channel.onmessage = () => {
      store.dispatch('toasts/add', { text: GENERIC_NEW_VERSION, action: refresh })
    }
    navigator.serviceWorker.addEventListener('controllerchange', () => window.location.reload())
  },
}

export default updateService
