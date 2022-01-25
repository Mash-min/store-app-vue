import { createStore } from 'vuex'
import products from '@/store/modules/products'
import categories from '@/store/modules/categories'
import chips from '@/store/modules/chips'
import users from '@/store/modules/users'
import carts from '@/store/modules/carts'

const store = createStore({
  modules: {
    products, 
    categories, 
    chips,
    users,
    carts
  }
})

export default store