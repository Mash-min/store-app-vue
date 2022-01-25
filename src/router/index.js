import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/Pages/Index'
import Products from '@/views/Pages/Products'
import Product from '@/views/Pages/Product'
import Categories from '@/views/Pages/Categories'
import Cart from '@/views/Pages/Cart'
import Login from '@/views/Pages/Login'
import Register from '@/views/Pages/Register'
import Account from '@/views/Pages/Account'
import Dashboard from '@/views/Admin/Dashboard'
import AdminProducts from '@/views/Admin/Products'
import ProductAdd from '@/views/Admin/ProductAdd'
import AdminCategories from '@/views/Admin/Categories'
import AdminOrders from '@/views/Admin/Orders'
import AdminAccount from '@/views/Admin/Account'
import store from '@/store'

const routes = [
  // ================= INDEX PAGE =====================
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  // ================= PRODUCTS PAGE =====================
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  // ================= PRODUCTS PAGE =====================
  {
    path: '/products/page=:number',
    name: 'ProductsPaginated',
    component: Products
  },
  // ================= PRODUCT PAGE =====================
  {
    path: '/products/:slug',
    name: 'Product',
    component: Product
  },
  // ================= CATEGORY PAGE =====================
  {
    path: '/categories',
    name: 'Categories',
    component: Categories
  },
  // ================= USER CART =====================
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: {
      auth: true
    }
  },
  // ================= LOGIN PAGE =====================
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      guest: true
    }
  },
  // ================= REGISTER PAGE =====================
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      guest: true
    }
  },
  // ================= USER ACCOUNT =====================
  {
    path: '/account',
    name: 'Account',
    component: Account,
    meta: {
      auth: true
    }
  },
  // ================= ADMIN DASHBOARD =====================
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      admin: true
    }
  },
  // ================= ADMIN PRODUCT LIST =====================
  {
    path: '/admin/products',
    name: 'AdminProducts',
    component: AdminProducts,
    meta: {
      admin: true
    }
  },
  // ================= ADMIN ADD PRODUCT =====================
  {
    path: '/admin/add-product',
    name: 'ProductAdd',
    component: ProductAdd,
    meta: {
      admin: true
    }
  },
  // ================= ADMIN CATEGORIES =====================
  {
    path: '/admin/categories',
    name: 'AdminCategories',
    component: AdminCategories,
    meta: {
      admin: true
    }
  },
  // ================= ADMIN ORDERS =====================
  {
    path: '/admin/orders',
    name: 'AdminOrders',
    component: AdminOrders,
    meta: {
      admin: true
    }
  },
  // ================= ADMIN ACCOUNT =====================
  {
    path: '/admin/account',
    name: 'AdminAccount',
    component: AdminAccount,
    meta: {
      admin: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  store.dispatch('authenticate')
  if(to.matched.some(record => record.meta.auth == true)) {
      // ================= Check user token if null ================
      if(localStorage.getItem('token') == null) {
        router.push({ path: '/login' })
      } else {
        next()
      }
  } else if(to.matched.some(record => record.meta.guest == true)) {
      // ================= Check user token if null ================
      if(localStorage.getItem('token') != null) {
        router.push({ path: '/' })
      } else {
        next()
      }
  } else if(to.matched.some(record => record.meta.admin == true)) {
      // ================= Check user token if null ================
      if(localStorage.getItem('token') == null) {
        router.push({ path: '/login' })
      } else {
        store.dispatch('checkAdmin')
        next()
      }
  } else {
    next()
  }
}) 

export default router
