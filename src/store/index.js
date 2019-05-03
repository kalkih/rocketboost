import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import theme from './modules/theme'
import launches from './modules/launches'

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
  },
  actions: actions,
  mutations: mutations,
  strict: debug,
})
