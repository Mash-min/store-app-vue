import axios from "axios"
import Swal from "sweetalert2"

const state = {
  cart: {
    productId: '',
    quantity: '',
    variants: []
  },
  carts: []
}

const getters = {
  cart: (state) => state.cart,
  carts: (state) => state.carts
}

const actions = {
  async fetchCarts({ commit }) {
    try {
      const response = await axios.get('api/carts')
      commit('setCarts', response.data.carts.data)
      console.log(response)
    } catch(err) {
      console.error(err.response)
    }
  },

  async addToCart(_, payload) {
    try {
      const response = await axios.post('api/carts', payload)
      console.log(response)

      const cartVariant = await axios.post('api/carts/variants', {
        cart_id: response.data.cart.id,
        variants: payload.variants
      })
      console.log(cartVariant)
      Swal.fire({ title: 'Product added to cart', icon: 'success' })
    } catch(err) {
      console.error(err.response)
      Swal.fire({ title: err.response.data.message , icon: 'warning' })
    }
  }
}

const mutations = {
  setCarts: (state, carts) => (state.carts = carts)
}

export default {
  state, getters, actions, mutations
}