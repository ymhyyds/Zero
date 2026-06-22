import { login, getInfo } from '@/api/auth'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router from '@/router'

const state = {
  token: getToken() || '',
  name: '',
  avatar: '',
  roles: []
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_USER(state, user) {
    state.name = user.name
    state.avatar = user.avatar
    state.roles = user.roles || []
  },
  RESET_USER(state) {
    state.token = ''
    state.name = ''
    state.avatar = ''
    state.roles = []
  }
}

const actions = {
  async login({ commit }, form) {
    const data = await login(form)
    commit('SET_TOKEN', data.token)
    setToken(data.token)
  },
  async getInfo({ commit }) {
    const data = await getInfo()
    commit('SET_USER', data)
    return data
  },
  async logout({ commit }) {
    removeToken()
    commit('RESET_USER')
    if (router.currentRoute.path !== '/login') {
      router.replace('/login')
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
