import axios from "axios"
import Swal from 'sweetalert2'
import showLoader from '@/loaders'
import router from "../../router"

const state = {
  user: {},
  isAuthenticated: false,
  isAdmin: false,
  dashboard: {}
}

const getters = {
  user: (state) => state.user,
  isAuthenticated: (state) => state.isAuthenticated,
  isAdmin: (state) => state.isAdmin,
  dashboard: (state) => state.dashboard
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
    showLoader("Loading...")
    try {
      const response = await axios.post('api/users/register', payload)
      commit('setUser', response.data.user)
      commit('authenticateUser', true)
      localStorage.setItem('token', response.data.token)
      window.location.href = "/account"
      Swal.close()
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
      localStorage.removeItem('token')
      console.log(error.response)
      console.clear()
    }
  },

  async checkAdmin() {
    try {
      const response = await axios.get('api/users')
      if(response.data.user.role != 'admin') {
        router.push({ path: '/not-found' })
      }
    } catch(e) {
      router.push({ path: '/' })
    }
  },

  async updateUser({ commit }, payload) {
    showLoader("Updating...")
    try {
      const response = await axios.put('api/users', payload)
      Swal.fire({ title: 'Account updated', icon: 'success' })
      commit('setUser', response.data.user)
    } catch(e) {
      Swal.close()
      console.error(e.response)
    }
  },

  async resetPassword(_, payload) {
    showLoader("Updating...")
    try {
      const response = await axios.put('api/users/reset-password', payload)
      Swal.fire({ title: response.data.message, icon: 'success' })
    } catch(e) {
      console.error(e.response)
    }
  },

  async fetchDashboard({ commit }) {
    try {
      const response = await axios.get('api/users/dashboard')
      commit('setDashboard', response.data)
      console.log(response)
    } catch(e) {
      console.error(e.response)
    }
  }
}

const mutations = {
  setUser: (state, user) => state.user = user,
  authenticateUser: (state, payload) => state.isAuthenticated = payload,
  setAdmin: (state, payload) => state.isAdmin = payload,
  setDashboard: (state, payload) => state.dashboard = payload
}

export default {
  state, getters, actions, mutations
}