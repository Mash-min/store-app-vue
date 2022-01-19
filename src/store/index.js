import { createStore } from 'vuex'
import products from '@/store/modules/products'
import categories from '@/store/modules/categories'
import chips from '@/store/modules/chips'

const store = createStore({
  modules: {
    products, categories, chips
  }
})

export default store