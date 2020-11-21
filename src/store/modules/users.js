import { fetchUsers } from '@/api/users'

const namespaced = true

const state = {
  users: []
}

const mutations = {
  SET_USERS (state, users) {
    state.users = users
  }
}

const actions = {
  async fetchUsers ({ commit }) {
    const users = await fetchUsers()

    console.log(users)
    commit('SET_USERS', users)
  }
}

const getters = { }

export default {
  namespaced,
  state,
  mutations,
  actions,
  getters
}
