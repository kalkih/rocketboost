import Vue from 'vue'
import launches from './modules/launches'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
  currentThreadID: null,
  theme: 'default',
  pageTheme: 'earth',
  menuActive: false,
  searchActive: false,
}

export default new Vuex.Store({
  state,
  modules: {
    launches,
  },
  actions: {
    setTheme ({ commit }, theme) {
      commit('setTheme', theme)
    },
    setPageTheme ({ commit }, theme) {
      commit('setPageTheme', theme)
    },
    toggleMenu ({ commit }) {
      commit('toggleMenu')
    },
    toggleSearch ({ commit }) {
      commit('toggleSearch')
    },
    setSearch ({ commit }, status) {
      commit('setSearch', status)
    },
    setMenu ({ commit }, status) {
      commit('setMenu', status)
    },
  },
  mutations: {
    setTheme (state, theme) {
      state.theme = theme
    },
    setPageTheme (state, theme) {
      state.pageTheme = theme
    },
    toggleMenu (state) {
      state.menuActive = !state.menuActive
      if (state.menuActive) {
        state.searchActive = false
      }
    },
    toggleSearch (state) {
      state.searchActive = !state.searchActive
      if (state.searchActive) {
        state.menuActive = false
      }
    },
    setSearch (state, status) {
      state.searchActive = status
    },
    setMenu (state, status) {
      state.menuActive = status
    },
  },
  strict: debug,
})
