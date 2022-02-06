<template>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <router-link 
        to="/account"
        class="nav-link text-black" 
        v-bind:class="{ 'active' : tab == 'orders' }">
        <i class="fa fa-truck text-muted"></i> Orders
      </router-link>
    </li>
    <li class="nav-item">
      <router-link 
        to="/saved-products" 
        class="nav-link text-black" 
        v-bind:class="{ 'active' : tab == 'saved-products' }">
        <i class="fa fa-heart text-muted"></i> Saved products
      </router-link>
    </li>
    <li class="nav-item">
      <router-link 
        to="/cart" 
        class="nav-link text-black" 
        v-bind:class="{ 'active' : tab == 'cart' }">
        <i class="fa fa-shopping-cart text-muted"></i> Cart
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'NavTabs',
  props: ['tab']
}
</script>