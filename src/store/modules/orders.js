import axios from 'axios'
import Swal from 'sweetalert2'
import showLoader from '@/loaders'

const state = {
  order: {},
  orders: [],
  orderLinks: []
}

const getters = {
  orders: (state) => state.orders,
  orderLinks: (state) => state.orderLinks
}

const actions = {
  async fetchOrders({ commit }, url) {
    showLoader("Loading...")
    commit('setOrders', [])
    commit('setOrderLinks', [])
    try {
      const response = await axios.get(url)
      commit('setOrders', response.data.orders.data)
      commit('setOrderLinks', response.data.orders.links)
      Swal.close()
    } catch(e){
      console.error(e.response)
    }
  },

  async checkOut(_, payload) {
    try {
      const response = await axios.post('api/orders', payload)
      console.log(response)
      window.location.href = "/account"
    } catch(e) {
      console.error(e.response)
    }
  },

  cancelOrder({ commit }, payload) {
    Swal.fire({
      title: 'Are you sure?',
      text: "The selected order will be canceled.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it'
    }).then(result => {
      if(result.isConfirmed) {
        axios.put(`api/orders/${payload.id}`, { status: 'canceled' })
        .then(res => {
          Swal.fire({ title: "Order canceled", icon: 'success' })
          console.log(res)
          commit('removeOrder', payload.index)
        })
        .catch(e => {
          console.error(e.response)
        })
      }
    })
  },

  async fetchAllOrders({ commit }, url) {
    showLoader("Loading...")
    commit('setOrders', [])
    commit('setOrderLinks', [])
    try {
      const response = await axios.get(url)
      commit('setOrders', response.data.orders.data)
      commit('setOrderLinks', response.data.orders.links)
      Swal.close()
    } catch(e) {
      console.error(e.response)
    }
  },

  deleteOrder({ commit }, payload) {
    Swal.fire({
      title: 'Are you sure?',
      text: "The selected order will be deleted.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it'
    }).then(result => {
      if(result.isConfirmed) {
        axios.delete(`api/orders/${payload.id}`)
        .then((res) => {
          Swal.fire({ title: res.data.message, icon: 'success' })
          commit('removeOrder', payload.index)
        })
        .catch(e => {
          console.error(e.response)
        })
      }
    })
  },

  async searchOrder({ commit }, data) {
    showLoader('Searching...')
    try {
      const response = await axios.get(`api/orders/search/${data}`)
      commit('setOrders', response.data.orders.data)
      commit('setOrderLinks', response.data.orders.links)
      Swal.close()
    } catch(e) {
      Swal.close()
      console.error(e.response)
    }
  }
  
}

const mutations = {
  setOrders: (state, orders) => state.orders = orders,
  setOrderLinks: (state, links) => state.orderLinks = links,
  removeOrder: (state, index) => state.orders.splice(index, 1)
}

export default {
  state, getters, actions, mutations
}