export default {
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
}
