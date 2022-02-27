import axios from "axios"
import Swal from "sweetalert2"
import showLoader from '@/loaders'

const state = {
  cart: {},
  carts: [],
  newCart: {
    quantity: 1,
    variants: []
  },
  cartLinks: [],
  cartArr: []
}

const getters = {
  cart: (state) => state.cart,
  carts: (state) => state.carts,
  newCart: (state) => state.newCart,
  cartLinks: (state) => state.cartLinks,
  cartArr: (state) => state.cartArr
}

const actions = {
  async fetchCarts({ commit }, url) {
    showLoader("Loading...")
    commit('setCarts', [])
    commit('setCartLinks', [])
    try {
      const response = await axios.get(url)
      commit('setCarts', response.data.carts.data)
      commit('setCartLinks', response.data.carts.links)
      console.log(response)
      Swal.close()
    } catch(err) {
      console.error(err.response)
    }
  },

  async addToCart({ commit }, payload) {
    try {
      const response = await axios.post('api/carts', payload)
      console.log(response)

      const cartVariant = await axios.post('api/carts/variants', {
        cart_id: response.data.cart.id,
        variants: payload.variants
      })
      console.log(cartVariant)
      Swal.fire({ title: 'Product added to cart', icon: 'success' })
      commit('clearCart')
    } catch(err) {
      console.error(err.response)
      Swal.fire({ title: err.response.data.message , icon: 'warning' })
    }
  },

  deleteCart({ commit }, payload) {
    Swal.fire({
      title: 'Are you sure?',
      text: "The selected product will be removed.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it'
    }).then(result => {
      if(result.isConfirmed) {
        axios.delete(`api/carts/${payload.id}`)
        .then(response => {
          commit('removeCart', payload.index)
          Swal.fire({ title: response.data.message, icon: 'success' })
        })
        .catch(e => {
          console.error(e.response)
        })
      }
    })
  },

  async findCarts({ commit }, payload) {
    commit('setCartArr', [])
    showLoader("Loading...")
    try {
      const response = await axios.post('api/carts/find-carts', {
        slugs: payload
      })
      commit('setCartArr', response.data)
      Swal.close()
    } catch(e) {
      console.error(e.response)
      Swal.close()
    }
  }
}

const mutations = {
  clearCart: (state) => {
    state.newCart.quantity = 1
    state.newCart.variants = []
  },
  setCarts: (state, carts) => (state.carts = carts),
  setCartLinks: (state, links) => (state.cartLinks = links),
  removeCart: (state, index) => (state.carts.splice(index, 1)),
  setCartArr: (state, arr) => (state.cartArr = arr)
}

export default {
  state, getters, actions, mutations
}