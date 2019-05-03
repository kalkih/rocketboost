export default {
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
}
