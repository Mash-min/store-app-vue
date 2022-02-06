import axios from "axios"
import Swal from "sweetalert2"
import showLoader from '@/loaders'

const state = {
  savedProducts: []
}

const getters = {
  savedProducts: (state) => state.savedProducts
}

const actions = {
  async saveProduct(_, payload) {
    try {
      const response = await axios.post('api/saved-products', {
        product_id: payload
      })
      Swal.fire(response.data.message)
    } catch (e) {
      console.error(e.response)
    }
  },

  async fetchSavedProducts({ commit }) {
    showLoader("Loading...")
    try {
      const response = await axios.get('api/saved-products')
      commit('setSavedProducts', response.data.products.data)
      Swal.close()
    } catch(e) {
      console.error(e.response)
    }
  },

  async deleteSavedProduct({ commit }, payload) {
    try {
      const response = await axios.delete(`api/saved-products/${payload.id}`)
      commit('removeSavedProduct', payload.index)
      Swal.fire({ title: response.data.message, icon: 'success' })
    } catch(e) {
      console.error(e.response)
    }
  }
}

const mutations = {
  setSavedProducts: (state, products) => (state.savedProducts = products),
  removeSavedProduct: (state, index) => (state.savedProducts.splice(index, 1))
}

export default {
  state, getters, actions, mutations
}