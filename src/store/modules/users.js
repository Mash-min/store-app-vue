import axios from "axios"
import Swal from 'sweetalert2'
import showLoader from '@/loaders'
import router from "../../router"

const state = {
  user: {},
  isAuthenticated: false,
  isAdmin: false
}

const getters = {
  user: (state) => state.user,
  isAuthenticated: (state) => state.isAuthenticated,
  isAdmin: (state) => state.isAdmin
}

const actions = {
  async loginUser({ commit }, payload) {
    showLoader("Logging in...")
    try {
      const response = await axios.post('api/users/login', payload)
      localStorage.setItem('token', response.data.token)
      commit('setUser', response.data.user)
      commit('authenticateUser', true)
      if(response.data.user.role == 'admin') {
        commit('setAdmin', true)
      }
      window.location.href = "/account"
    } catch (error) {
      Swal.fire(error.response.data.message)
    }
  },

  async registerUser({ commit }, payload) {
    try {
      const response = await axios.post('api/users/register', payload)
      commit('setUser', response)
      console.log(response)
    } catch(error) {
      console.error(error.response)
    }
  },

  async logoutUser({ commit }) {
    showLoader("Logging out...")
    try {
      await axios.post('api/users/logout')
      commit('setUser', {})
      commit('authenticateUser', false)
      localStorage.removeItem('token')
      window.location.href = '/'
    } catch (error) {
      console.error(error.response)
    }
  },

  async authenticate({ commit }) {
    try {
      const response = await axios.get('api/users')
      commit('setUser', response.data.user)
      commit('authenticateUser', true)
      if(response.data.user.role == 'admin') {
        commit('setAdmin', true)
      }
    } catch (error) {
      console.log(error.response)
      console.clear()
    }
  },

  async checkAdmin({ commit }) {
    try {
      const response = await axios.get('api/users')
      if(response.data.user.role != 'admin') {
        router.push({ path: '/account' })
        commit('setAdmin', false)
      }
    } catch(e) {
      router.push({ path: '/' })
    }
  }
}

const mutations = {
  setUser: (state, user) => state.user = user,
  authenticateUser: (state, payload) => state.isAuthenticated = payload,
  setAdmin: (state, payload) => state.isAdmin = payload
}

export default {
  state, getters, actions, mutations
}