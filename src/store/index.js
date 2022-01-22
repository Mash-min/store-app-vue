import { createStore } from 'vuex'
import products from '@/store/modules/products'
import categories from '@/store/modules/categories'
import chips from '@/store/modules/chips'
import users from '@/store/modules/users'

const store = createStore({
  modules: {
    products, 
    categories, 
    chips,
    users
  }
})

export default store