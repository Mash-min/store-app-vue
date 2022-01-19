const state = {
  chips: {
    tags: [],
    categories: []
  }
}

const getters = {
  tagChips: (state) => state.chips.tags,
  currentTag: (state) => state.currentTag
}

const actions = {
  addTagChip({ commit }, payload) {
    if(payload != '') {
      commit('addTagChip', payload)
    }
  },

  deleteTagChip({ commit }, index) {
    commit('removeTagChip', index)
  }
}

const mutations = {
  addTagChip: (state, chips) => (state.chips.tags.push(chips)),
  removeTagChip: (state, index) => (state.chips.tags.splice(index, 1))
}

export default {
  state, getters, actions, mutations
}