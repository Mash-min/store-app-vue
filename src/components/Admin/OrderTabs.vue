<template>
  <div class="nav-tab-container">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link 
          to="/admin/products"
          class="nav-link"
          v-bind:class="{ 'active' : tab == 'orders' }">
          <i class="fa fa-list"></i> Orders
        </router-link>
      </li>
      <li class="nav-item">
        <a href="" class="nav-link disabled">
          <i class="fa fa-truck"></i> On shipping
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">
          <i class="fa fa-check"></i> Delivered
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">
          <i class="fa fa-trash"></i> Trash
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'OrderTabs',
  props: ['tab']
}
</script>