<template>
  <div class="nav-tab-container">
    <div class="m-1">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <router-link 
            to="/admin/products"
            class="nav-link"
            v-bind:class="{ 'active' : tab == 'products' }">
            <i class="fa fa-list"></i> Products
          </router-link>
        </li>
        <li class="nav-item">
          <router-link 
            to="/admin/add-product"
            class="nav-link"
            v-bind:class="{ 'active' : tab == 'add-product' }">
            <i class="fa fa-plus"></i> Add product
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#"><i class="fa fa-trash"></i> Trash</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductTabs',
  props: ['tab']
}
</script>