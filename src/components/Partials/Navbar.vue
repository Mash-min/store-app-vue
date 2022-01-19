<template>
  <nav class="navbar navbar-dark bg-dark sticky-top">
    <div class="container p-1">
      <a class="navbar-brand" href="/">
        <img src="@/assets/logo2.png" alt="" width="30" height="24">
        Store App
      </a>
      <div class="d-flex">
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit"><i class="fa fa-search"></i></button>
        </form>
        <button class="btn-sm btn btn-outline-primary d-lg-none d-sm-block d-xs-block ms-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop">
          <i class="fa fa-bars"></i>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>