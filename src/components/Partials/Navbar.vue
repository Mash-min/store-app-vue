<template>
  <nav class="navbar navbar-dark bg-dark sticky-top">
    <div class="container p-1">
      <router-link to="/" class="navbar-brand">
        <img src="@/assets/logo2.png" alt="" width="30" height="24">
        Store App
      </router-link>
      <div class="d-flex">
        <form @submit.prevent="submitSearch" class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" v-model="search">
          <button class="btn btn-sm btn-outline-success" type="submit"><i class="fa fa-search"></i></button>
        </form>
        <button class="btn-sm btn btn-outline-primary d-lg-none d-sm-block d-xs-block ms-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop">
          <i class="fa fa-bars"></i>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Navbar',
  data() {
    return {
      search: ''
    }
  },
  methods: {
    ...mapActions(['searchProduct']),

    submitSearch() {
      this.searchProduct(this.search)
    }
  }
}
</script>