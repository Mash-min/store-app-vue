<template>
  <nav class="navbar navbar-dark bg-dark p-1 sticky-top">
    <div class="container-fluid container">
      <a class="navbar-brand" href="#">Admin Panel</a>
      <div class="d-flex">
        <button class="btn btn-sm btn-outline-danger">Logout</button>
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