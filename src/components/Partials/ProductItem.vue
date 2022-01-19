<template>
  <div class="col-lg-3 col-md-4 col-sm-6 col-6 p-1" v-for="product in products" :key="product.id">
    <div class="card product-item">
      <img 
        v-if="product.images.length != 0"
        v-bind:src="product.images[0].image" 
        class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">{{ product.name }}</h5>
        <small class="text-muted">{{ product.created_at }}</small>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <h5 class="text-success">₱ {{ product.price }}</h5>
        </li>
        <li class="list-group-item d-grid">
          <router-link :to="'/products/' + product.slug" class="btn btn-primary btn-sm">
            View product
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductItem',
  props: ['products']
}
</script>