<template>
  <div class="col-lg-3 col-md-4 col-sm-6 col-6 p-1" v-for="product in products" :key="product.id">
    <div class="card product-item">
      <img 
        v-if="product.images.length != 0"
        v-bind:src="product.images[0].image" 
        class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">{{ product.name }}</h5>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <small class="text-muted">Price: </small><small class="text-success fw-bolder">₱ {{ product.price }}</small>
        </li>
        <li class="list-group-item">
          <div class="row">
            <div class="col-3 p-1">
              <div class="d-grid">
                <button 
                  :class="{ 'disabled' : product.status != 'active' }"
                  class="btn btn-sm btn-outline-dark"
                  data-bs-toggle="modal" 
                  data-bs-target="#addToCartModal"
                  @click="findProduct(product.slug)"
                  v-if="isAuthenticated">
                  <i class="fa fa-shopping-cart"></i>
                </button>
                <router-link 
                  class="btn btn-sm btn-outline-dark"
                  to="/login"
                  v-else>
                  <i class="fa fa-shopping-cart"></i>
                </router-link>
              </div>
            </div>
            <div class="col-9 p-1">
              <div class="d-grid">
                <router-link :to="'/products/' + product.slug" class="btn btn-outline-primary btn-sm">
                  View product
                </router-link>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <CartAddModal 
    v-bind:product="product"/>
</template>

<script>
import CartAddModal from '@/components/Partials/CartAddModal'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProductItem',
  components: {
    CartAddModal
  },
  props: ['products'],
  computed: {
    ...mapGetters(['product', 'isAuthenticated'])
  },
  methods: {
    ...mapActions(['findProduct'])
  }
}
</script>