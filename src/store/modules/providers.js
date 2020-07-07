import api from '@/api/launch'

const TOPIC = 'providers'

// const defaults = {
//   all: Array(4).fill({}),
// }

const initialState = () => ({
  all: [],
  topic: TOPIC,
})

const actions = {
  async refresh({ commit }) {
    commit('setAll', await api.getTopic(TOPIC))
  },
  async getAll({ commit }) {
    commit('setAll', await api.getTopic(TOPIC))
  },
  async unsetState({ commit }) {
    commit('unset')
  },
}

const mutations = {
  setAll(state, providers) {
    state.all = providers
  },
  unset(state) {
    state.all = []
  },
}

export default {
  namespaced: true,
  state: initialState(),
  actions,
  mutations,
}
