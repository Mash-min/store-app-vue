import axios from "axios"
import Swal from "sweetalert2"
import showLoader from '@/loaders'

const state = {
  product: {},
  productLinks: [],
  products: [],
}

const getters = {
  product: (state) => state.product,
  products: (state) => state.products,
  productLinks: (state) => state.productLinks
}

const actions = {
  fetchProducts({ commit }, url) {
    commit('setProducts', null)
    commit('setProductLinks', null)
    showLoader("Loading")
    axios.get(url)
    .then(res => {
      // console.log(res)
      Swal.close()
      commit('setProducts', res.data.products.data)
      commit('setProductLinks', res.data.products.links)
    })
    .catch(err => console.log(err.response))
  },

  findProduct({ commit }, slug) {
    commit('setProduct', {})
    showLoader("Loading...")
    axios.get(`api/products/${slug}`)
    .then(res => {
      Swal.close()
      commit('setProduct', res.data.product)
    })
    .catch(err => console.log(err.response))
  },

  async addProduct({ commit }, payload) {
    showLoader("Adding product...")
    try {
      // ============ Upload product data=============
      const response = await axios.post('api/products', payload.product)
      let productId = response.data.product.id
      commit('setProduct', response.data.product)

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
      payload.images.forEach(image => {
        let formData = new FormData()
        formData.append('file', image)
        formData.append('upload_preset', 'c12awmea')
        fetch('https://api.cloudinary.com/v1_1/dv1tdnpbu/image/upload', {
          method: 'POST',
          body: formData
        })
        .then(res => { return res.json() })
        .then(data => {
          console.log(data)
          axios.post('api/product-images', {
            image: data.url,
            product_id: productId
          })
        })
        .catch(err => console.log(err.response))
      })

      Swal.fire("Product added!")
    } catch (err) {
      Swal.close()
      console.error(err.response.data.errors)
    }
  },

  async deleteProduct({ commit }, id) {
    try {
      const response = await axios.delete(`api/products/${id}`)
      commit('removeProduct', id)
      Swal.fire(response.data.message)
    } catch (error) {
      console.error(error.response)
    }
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
      Swal.fire("Product updated!")
    } catch (error) {
      Swal.close()
      console.error(error.response)
    }
  },

  archiveProduct({ commit }, id) {
    axios.put(`api/products/archive-product/${id}`)
    .then(res => {
      console.log(res)
      commit('updateProduct', res.data.product)
    })
    .catch(err => console.log(err.response))
  },

  restoreProduct({ commit }, id) {
    axios.put(`api/products/restore-product/${id}`)
    .then(res => {
      console.log(res)
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
  }
}

const mutations = {
  setProduct: (state, product) => (state.product = product),
  setProducts: (state, products) => (state.products = products),
  setProductLinks: (state, links) => (state.productLinks = links),
  removeProduct: (state, id) => (state.products.splice(state.products.findIndex(product => product.id == id), 1)),
  updateProduct: (state, data) => (state.products[state.products.findIndex(product => product.id == data.id)] = data)
}

export default {
  state, getters, actions, mutations
}