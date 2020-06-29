import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import actions from './actions'
import mutations from './mutations'
import theme from './modules/theme'
import launches from './modules/launches'
import subscriptions from './modules/subscriptions'
import toasts from './modules/toasts'

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
  },
  plugins: [
    createPersistedState({
      paths: ['launches', 'subscriptions', 'theme'],
    }),
  ],
  actions,
  mutations,
  strict: debug,
})
