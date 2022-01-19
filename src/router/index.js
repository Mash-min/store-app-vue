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

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/products/page=:number',
    name: 'ProductsPaginated',
    component: Products
  },
  {
    path: '/products/:slug',
    name: 'Product',
    component: Product
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/admin/products',
    name: 'AdminProducts',
    component: AdminProducts
  },
  {
    path: '/admin/add-product',
    name: 'ProductAdd',
    component: ProductAdd
  },
  {
    path: '/admin/categories',
    name: 'AdminCategories',
    component: AdminCategories
  },
  {
    path: '/admin/orders',
    name: 'AdminOrders',
    component: AdminOrders
  },
  {
    path: '/admin/account',
    name: 'AdminAccount',
    component: AdminAccount
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
