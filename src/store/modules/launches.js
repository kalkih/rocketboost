import { cloneDeep } from 'lodash'
import api from '@/api/launch'
import placeholder from './schemas'

const defaults = {
  filter: '',
  next: Array(5).fill(placeholder),
  past: Array(4).fill(placeholder),
}

const initialState = () => ({
  current: placeholder,
  id: '',
  home: cloneDeep(defaults),
  rocket: cloneDeep(defaults),
  location: cloneDeep(defaults),
  lsp: cloneDeep(defaults),
  search: cloneDeep(defaults),
})

const getters = {}

const actions = {
  async refresh({ commit, state }, payload) {
    const noOfNextLaunchesToGet = state[payload.state].next.length || 5
    const noOfPastLaunchesToGet = state[payload.state].past.length || 4
    commit('setNext', {
      launches: await api.getNext(noOfNextLaunchesToGet, { ...payload }),
      payload,
    })
    commit('setPast', {
      launches: await api.getPast(noOfPastLaunchesToGet, { ...payload }),
      payload,
    })
  },
  async getPastLaunches({ commit }, payload) {
    commit('setPast', { launches: await api.getPast(4, { ...payload }), payload })
  },
  async getNextLaunches({ commit }, payload) {
    commit('setNext', { launches: await api.getNext(5, { ...payload }), payload })
  },
  async getMorePastLaunches({ commit }, payload) {
    const launches = await api.getPast(4, { ...payload })
    commit('addPast', { launches, payload })
    return launches.length
  },
  async getMoreNextLaunches({ commit }, payload) {
    const launches = await api.getNext(4, { ...payload })
    commit('addNext', { launches, payload })
    return launches.length
  },
  async getLaunch({ commit }, id) {
    commit('setCurrent', await api.getLaunch(id))
  },
  async getSearchResults({ commit }, payload) {
    commit('setSearch', payload.search)
    commit('setNext', { launches: await api.getNext(5, { ...payload }), payload })
    commit('setPast', { launches: await api.getPast(4, { ...payload }), payload })
  },
  async setCurrentLaunch({ commit }, launch) {
    commit('setCurrent', launch)
  },
  async unsetCurrent({ commit }, { id }) {
    commit('unsetCurrent', id)
  },
  async unsetState({ commit }, opts) {
    commit('unset', opts)
  },
}

const mutations = {
  setPast(state, { launches, payload }) {
    if (payload.filterValue) {
      state[payload.state].id = payload.filterValue
    }
    if (payload.state === 'home') {
      state[payload.state].past.splice(0, launches.length, ...launches)
    } else {
      state[payload.state].past = launches
    }
  },
  addPast(state, { launches, payload }) {
    state[payload.state].past.push(...launches)
  },
  setNext(state, { launches, payload }) {
    if (payload.filterValue) {
      state[payload.state].id = payload.filterValue
    }
    if (payload.state === 'home') {
      state[payload.state].next = [...launches]
    } else {
      state[payload.state].next = launches
    }
  },
  addNext(state, { launches, payload }) {
    state[payload.state].next.push(...launches)
  },
  setCurrent(state, launch) {
    state.current = launch
    state.id = launch.id
  },
  setSearch(state, search) {
    state.search.search = search
  },
  unsetCurrent(state, id) {
    if (state.id !== Number(id)) {
      state.current = placeholder
    }
  },
  unset(state, opts) {
    if (state[opts.state].filter !== opts.filter) {
      state[opts.state] = cloneDeep(defaults)
    }
  },
}

export default {
  namespaced: true,
  state: initialState(),
  getters,
  actions,
  mutations,
}
