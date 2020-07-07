import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import actions from './actions'
import mutations from './mutations'
import theme from './modules/theme'
import launches from './modules/launches'
import subscriptions from './modules/subscriptions'
import toasts from './modules/toasts'
import providers from './modules/providers'
import rockets from './modules/rockets'
import locations from './modules/locations'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
  currentThreadID: null,
  menuActive: false,
  searchActive: false,
}

export default new Vuex.Store({
  state,
  modules: {
    launches,
    subscriptions,
    theme,
    toasts,
    providers,
    rockets,
    locations,
  },
  plugins: [
    createPersistedState({
      paths: ['launches', 'subscriptions', 'theme', 'providers', 'rockets', 'locations'],
    }),
  ],
  actions,
  mutations,
  strict: debug,
})
