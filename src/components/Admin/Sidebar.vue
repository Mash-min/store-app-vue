<template>
  <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidebar d-none d-lg-block d-xxl-block" style="width: 280px;">
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <router-link to="/" class="nav-link text-white">
          <i class="fa fa-home"></i>
          <span class="ms-3">Home</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/admin/dashboard" class="nav-link text-white">
          <i class="fa fa-dashboard"></i>
          <span class="ms-3">Dashboard</span>
        </router-link>
      </li>
      <li>
        <router-link to="/admin/products" class="nav-link text-white">
          <i class="fa fa-shopping-basket"></i>
          <span class="ms-3">Products</span>
        </router-link>
      </li>
      <li>
        <router-link to="/admin/categories" class="nav-link text-white">
          <i class="fa fa-list"></i>
          <span class="ms-3">Categories</span>
        </router-link>
      </li>
      <li>
        <router-link to="/admin/orders" class="nav-link text-white">
          <i class="fa fa-truck"></i>
          <span class="ms-3">Orders</span>
        </router-link>
      </li>
      <li>
        <router-link to="/admin/account" class="nav-link text-white">
          <i class="fa fa-user"></i>
          <span class="ms-3">Account</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>