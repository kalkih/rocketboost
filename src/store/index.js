import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import theme from './modules/theme'
import launches from './modules/launches'
import subscriptions from './modules/subscriptions'
import createPersistedState from 'vuex-persistedstate'

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
    theme,
    launches,
    subscriptions,
  },
  plugins: [
    createPersistedState({
      paths: ['theme', 'subscriptions'],
    }),
  ],
  actions: actions,
  mutations: mutations,
  strict: debug,
})
