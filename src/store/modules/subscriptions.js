import api from '../../api/notification'
import { urlBase64ToUint8Array } from '../../utils/helpers.js'

const vapidPublicKey = process.env.VUE_APP_API_VAPID_PUBLIC_KEY
const base64VapidPublicKey = urlBase64ToUint8Array(vapidPublicKey)

const PUSH_OPTIONS = {
  userVisibleOnly: true,
  applicationServerKey: base64VapidPublicKey,
}

const TOPIC = {
  LAUNCH: 'launch',
  LOCATION: 'location',
  PROVIDER: 'lsp',
  ROCKET: 'rocket',
}

const state = {
  all: [],
  endpoint: '',
}

const getters = {
  providers: (state) => state.all.filter(sub => sub.topic === TOPIC.PROVIDER),
  locations: (state) => state.all.filter(sub => sub.topic === TOPIC.LOCATION),
  rockets: (state) => state.all.filter(sub => sub.topic === TOPIC.ROCKET),
  launches: (state) => state.all.filter(sub => sub.topic === TOPIC.LAUNCH),
}

const actions = {
  async subscribe ({ commit, dispatch }, { id, topic = TOPIC.LAUNCH, label }) {
    try {
      const subscription = await dispatch('getPushSubscription')

      try {
        commit('addSubscription', { id, topic, label, subscription })
        await api.subscribeTopic(id, topic, subscription)
      } catch (error) {
        commit('removeSubscription', { id, topic, subscription })
      }
    } catch (error) {
      throw error
    }
  },
  async unsubscribe ({ commit, dispatch }, { id, topic = TOPIC.LAUNCH, label }) {
    try {
      const subscription = await dispatch('getSubscription', { id, topic })

      try {
        commit('removeSubscription', { id, topic })
        await await api.unsubscribeTopic(id, topic, subscription.subscription)
      } catch (error) {
        commit('addSubscription', { id, topic, subscription, label })
      }
    } catch (error) {
      throw error
    }
  },
  unsubscribeAll ({ commit }) {
    commit('clearSubscriptions')
  },
  getSubscription ({ state }, { id, topic = TOPIC.LAUNCH }) {
    const subscription = state.all.find(sub => sub.topic === topic && sub.id === id)
    if (!subscription) {
      throw new Error('Subscription was not found')
    }
    return subscription
  },
  isSubscribedTo ({ state }, { id, topic = TOPIC.LAUNCH }) {
    return !!(state.all.find(sub => sub.topic === topic && sub.id === id))
  },
  async getPushSubscription ({ commit, state }) {
    try {
      if (!navigator.serviceWorker.controller) {
        throw new Error()
      }
      const swreg = await navigator.serviceWorker.ready
      let subscription = {}
      subscription = await swreg.pushManager.getSubscription()

      if (!subscription) {
        subscription = await swreg.pushManager.subscribe(PUSH_OPTIONS)
      }

      if (state.endpoint !== subscription.endpoint) {
        // if (state.endpoint && subscription.endpoint) {
        //   // should probably send to API to clear previous as well
        // }
        commit('setEndpoint', subscription.endpoint)
      }

      return subscription
    } catch (error) {
      throw error
    }
  },
}

const mutations = {
  addSubscription (state, { topic, id, subscription, label }) {
    state.all.push({ topic, id, subscription, label })
  },
  removeSubscription (state, { topic = TOPIC.LAUNCH, id }) {
    state.all = state.all.filter(sub => !(sub.topic === topic && sub.id === id))
  },
  setEndpoint (state, endpoint) {
    state.endpoint = endpoint
  },
  clearSubscriptions (state) {
    state.all = []
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
