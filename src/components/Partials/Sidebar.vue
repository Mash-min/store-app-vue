<template>
  <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidebar d-none d-lg-block d-xxl-block" style="width: 300px;">
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <router-link to="/" class="nav-link text-white">
          <i class="fa fa-home"></i>
          <span class="ms-3">Home</span>
        </router-link>
      </li>
      <li>
        <router-link to="/products" class="nav-link text-white">
          <i class="fa fa-shopping-basket"></i>
          <span class="ms-3">Products</span>
        </router-link>
      </li>
      <li>
        <router-link to="/categories" class="nav-link text-white">
          <i class="fa fa-list"></i>
          <span class="ms-3">Categories</span>
        </router-link>
      </li>
      <li>
        <router-link to="/cart" class="nav-link text-white">
          <i class="fa fa-shopping-cart"></i>
          <span class="ms-3">Cart</span>
        </router-link>
      </li>
      <li>
        <router-link to="/login" class="nav-link text-white">
          <i class="fa fa-user"></i>
          <span class="ms-3">Join us</span>
        </router-link>
      </li>
      <li>
        <router-link to="/account" class="nav-link text-white">
          <i class="fa fa-user-circle"></i>
          <span class="ms-3">Account</span>
        </router-link>
      </li>
      <hr>
      <li>
        <router-link to="/admin/dashboard" class="nav-link text-white">
          <i class="fa fa-dashboard"></i>
          <span class="ms-3">Dashboard</span>
        </router-link>
      </li>
      <li>
        <a href="#" class="nav-link text-white">
          <i class="fa fa-sign-out"></i>
          <span class="ms-3">Logout</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>