import axios from "axios"
import Swal from "sweetalert2"
import showLoader from '@/loaders'

const state = {
  category: {
    category: '',
    slug: ''
  },
  categories: {},
  categoryLinks: [],
  next_page_url: ''
}

const getters = {
  category: (state) => state.category,
  categories: (state) => state.categories,
  categoryLinks: (state) => state.categoryLinks,
  nextPageUrl: (state) => state.next_page_url
}

const actions = {
  fetchCategories({ commit }, url) {
    commit('setCategories', [])
    commit('setCategoryLinks', [])
    showLoader("Loading...")
    axios.get(url)
    .then(res => {
      Swal.close()
      commit('setCategories', res.data.categories.data)
      commit('setCategoryLinks', res.data.categories.links)
      commit('setNextPageUrl', res.data.categories.next_page_url)
    })
    .catch(err => {
      Swal.close()
      console.log(err.response)
    })
  },

  addCategory({ commit }, data) {
    axios.post('api/categories', data)
    .then(res => {
      commit('addCategory', res.data.category)
    })
    .catch(err => console.log(err.response))
  },

  deleteCategory({ commit }, payload) {
    axios.delete(`api/categories/${payload.id}`)
    .then(res => {
      console.log(res)
      commit('removeCategory', payload.index)
    })
    .catch(err => console.log(err.response))
  },

  findCategory({ commit }, id) {
    commit('setCategory', {})
    axios.get(`api/categories/${id}`)
    .then(res => {
      commit('setCategory', res.data.category)
    })
    .catch(err => console.log(err.response))
  },

  updateCategory({ commit }, payload) {
    showLoader("Updating...")
    axios.put(`api/categories/${payload.category.id}`, payload.category)
    .then(res => {
      Swal.fire("Category updated!")
      commit('updateCategory', res.data.category)
    })
    .catch(err => console.log(err.response))
  },

  loadMoreCategories({ commit }, url) {
    if(url != 'null') {
      showLoader("Loading...")
      axios.get(url)
      .then(res => {
        Swal.close()
        res.data.categories.data.forEach(category => commit('loadMoreCategories', category))
        commit('setNextPageUrl', res.data.categories.next_page_url)
      })
      .catch(err => {
        console.log(err.response)
        Swal.close()
      })
    }
  }

}

const mutations = {
  addCategory: (state, category) => (state.categories.unshift(category)),
  setCategory: (state, category) => (state.category = category),
  setCategories: (state, categories) => (state.categories = categories),
  setNextPageUrl: (state, url) => (state.next_page_url = url),
  setCategoryLinks: (state, links) => (state.categoryLinks = links),
  removeCategory: (state, index) => (state.categories.splice(index, 1)),
  updateCategory: (state, data) => (state.categories[state.categories.findIndex(category => category.id == data.id)] = data),
  loadMoreCategories: (state, categories) => (state.categories.push(categories))
}

export default {
  state, getters, actions, mutations
}