import axios from "axios"
import Swal from "sweetalert2"
import showLoader from '@/loaders'
import router from '@/router'

const state = {
  product: {},
  productLinks: [],
  products: [],
  newProduct: {
    name: '',
    description: '',
    price: '',
    stock: '',
    shipping_fee: '',
  },
  productErrors: []
}

const getters = {
  product: (state) => state.product,
  products: (state) => state.products,
  productLinks: (state) => state.productLinks,
  newProduct: (state) => state.newProduct,
  productErrors: (state) => state.productErrors
}

const actions = {
  async fetchProducts({ commit }, url) {
    commit('setProducts', null)
    commit('setProductLinks', null)
    showLoader("Loading...")
    try {
      const response = await axios.get(url)
      commit('setProducts', response.data.products.data)
      commit('setProductLinks', response.data.products.links)
      Swal.close()
    } catch(e) {
      Swal.fire({ title: e.response.data.message, icon: 'warning'})
      console.error(e.response)
    }
  },

  async findProduct({ commit }, slug) {
    commit('clearCart')
    commit('setProduct', {})
    showLoader("Loading...")
    try {
      const response = await axios.get(`api/products/${slug}`)
      commit('setProduct', response.data.product)
      Swal.close()
    } catch(e) {
      Swal.close()
      if(e.response.status == 404) {
        router.push({ path: '/not-found' })
      } else {
        console.error(e.response)
      }
    }
  },

  async addProduct({ commit }, payload) {
    showLoader("Adding product...")
    commit('setProductErrors', [])
    try {
      // ============ Upload product data=============
      const response = await axios.post('api/products', payload.product)
      let productId = response.data.product.id
      commit('setNewProduct')
      // ============ Upload product tags=============
      const tags = await axios.post('api/product-tags', {
        product_id: productId,
        tags: payload.tags
      })
      console.log(tags)
      // ============ Upload product categories=============
      const categories = await axios.post('api/product-categories', {
        product_id: productId,
        categories: payload.categories
      })
      console.log(categories)
      // ============ Upload product image =============
      // payload.images.forEach(image => {
      //   let formData = new FormData()
      //   formData.append('file', image)
      //   formData.append('upload_preset', 'c12awmea')
      //   fetch('https://api.cloudinary.com/v1_1/dv1tdnpbu/image/upload', {
      //     method: 'POST',
      //     body: formData
      //   })
      //   .then(res => { return res.json() })
      //   .then(data => {
      //     console.log(data)
      //     axios.post('api/product-images', {
      //       image: data.url,
      //       product_id: productId
      //     })
      //   })
      //   .catch(err => console.log(err.response))
      // })
      // ============ Upload product variants =============
      payload.variants.forEach(variant => {
        axios.post('api/variants', {
          product_id: productId,
          title: variant.name
        })
        .then(res => {
          axios.post('api/variant-items', {
            variant_id: res.data.variant.id,
            items: variant.items
          })
        })
      })
      Swal.fire("Product added!")
      commit('clearTagChips')
    } catch (e) {
      Swal.close()
      console.error(e.response)
      commit('setProductErrors', e.response.data.errors)
    }
  },

  deleteProduct({ commit }, payload) {
    Swal.fire({
      title: 'Are you sure?',
      text: "The selected product will be deleted.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it'
    }).then(result => {
      if(result.isConfirmed) {
        showLoader("Deleting product...")
        axios.delete(`api/products/${ payload.id }`)
        .then(response => {
          commit('removeProduct', payload.index)
          Swal.fire({ title: response.data.message, icon: 'success' })
        })
        .catch(e => {
          console.error(e.response)
        })
      }
    })
  },

  async updateProduct({ commit }, payload) {
    showLoader("Updating...")
    try {
      // =========== Update product data ============
      const response = await axios.put(`api/products/${payload.product.id}`, payload.product)
      commit('updateProduct', response.data.product)

      // =========== Update product tags ============
      const tags = await axios.put('api/product-tags', {
        product_id: payload.product.id,
        tags: payload.tags
      })
      console.log(tags.data.message)

      // =========== Update product categories ============
      const categories = await axios.put('api/product-categories', {
        product_id: payload.product.id,
        categories: payload.categories
      })
      console.log(categories.data.message)
      Swal.fire({ title: "Product updated", icon: 'success' })
    } catch (error) {
      Swal.close()
      console.error(error.response)
    }
  },

  archiveProduct({ commit }, id) {
    axios.put(`api/products/archive-product/${id}`)
    .then(res => {
      commit('updateProduct', res.data.product)
    })
    .catch(err => console.log(err.response))
  },

  restoreProduct({ commit }, id) {
    axios.put(`api/products/restore-product/${id}`)
    .then(res => {
      commit('updateProduct', res.data.product)
    })
    .catch(err => console.log(err.response))
  },

  addVariants(_, payload) {
    payload.variants.forEach(variant => {
      // Upload Product Variant
      showLoader("Saving variants...")
      axios.post('api/variants', {
        product_id: payload.product_id,
        title: variant.name
      })
      .then((res) => {
        // Upload variant items
        axios.post('api/variant-items', {
          variant_id: res.data.variant.id,
          items: variant.items
        })
        .then(res => console.log(res))
        .catch(err => console.log(err.response))
        Swal.fire("Variants saved")
      })
    })
  },

  async searchProduct({ commit }, payload) {
    showLoader("Searching...")
    try {
      const response = await axios.get(`api/products/search/${payload}`)
      commit('setProducts', response.data.products.data)
      commit('setProductLinks', response.data.products.links)
      Swal.close()
    } catch(e){
      Swal.close()
      console.error(e.response)
    }
  }
}

const mutations = {
  setProduct: (state, product) => (state.product = product),
  setNewProduct: (state) => {
    state.newProduct.name = ''
    state.newProduct.description = ''
    state.newProduct.price = ''
    state.newProduct.shipping_fee = ''
    state.newProduct.stock = ''
  },
  setProducts: (state, products) => (state.products = products),
  setProductLinks: (state, links) => (state.productLinks = links),
  removeProduct: (state, index) => (state.products.splice(index, 1)),
  updateProduct: (state, data) => (state.products[state.products.findIndex(product => product.id == data.id)] = data),
  setProductErrors: (state, errors) => (state.productErrors = errors)
}

export default {
  state, getters, actions, mutations
}