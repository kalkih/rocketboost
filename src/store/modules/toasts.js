const DISMISS_DURATION = 5000
const DEFAULT_TYPE = 'default'

let currentToastId = 0

const initialState = () => ({
  messages: [],
})

function createToast(id, title, text, type, dismissAfter, action) {
  return {
    id,
    title,
    text,
    type,
    dismissAfter,
    action,
  }
}

const actions = {
  add(
    { commit },
    { title, text, type = DEFAULT_TYPE, dismissAfter = DISMISS_DURATION, action = undefined },
  ) {
    currentToastId += 1
    const id = currentToastId
    commit('add', createToast(id, title, text, type, dismissAfter, action))
    if (!action) {
      setTimeout(() => commit('remove', id), dismissAfter)
    }
  },
  remove({ commit }, id) {
    commit('remove', id)
  },
}

const mutations = {
  add(state, toast) {
    state.messages.push(toast)
  },
  remove(state, id) {
    state.messages = state.messages.filter((m) => m.id !== id)
  },
}

export default {
  namespaced: true,
  state: initialState(),
  actions,
  mutations,
}
