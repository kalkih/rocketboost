const state = {
  theme: 'default',
  pageTheme: 'earth',
}

const getters = {}

const actions = {
  setTheme ({ commit }, theme) {
    commit('setTheme', theme)
  },
  setPageTheme ({ commit }, theme) {
    commit('setPageTheme', theme)
  },
}

const mutations = {
  setTheme (state, theme) {
    state.theme = theme
  },
  setPageTheme (state, theme) {
    state.pageTheme = theme
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
