<template>
  <div class="col-lg-3 col-md-4 col-sm-6 col-6 p-1" v-for="(savedProduct, index) in savedProducts" :key="savedProduct.id">
    <div class="card product-item position-relative">
      <div class="position-absolute top-0 end-0 m-1">
        <button class="btn btn-danger" @click="deleteSavedProduct({ id: savedProduct.id, index })">
          <i class="fa fa-times"></i>
        </button>
      </div>
      <img 
        v-if="savedProduct.product.images.length != 0"
        v-bind:src="savedProduct.product.images[0].image" 
        class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">{{ savedProduct.product.name }}</h5>
        <small class="text-muted">{{ savedProduct.product.created_at }}</small>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <small class="text-muted">Price: </small>
          <span class="text-success fw-bolder">₱ {{ savedProduct.product.price }}</span>
        </li>
        <li class="list-group-item">
          <div class="row">
            <div class="col-12 p-1">
              <div class="d-grid">
                <router-link :to="'/products/' + savedProduct.product.slug" class="btn btn-outline-primary btn-sm">
                  View product
                </router-link>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SavedProductItem',
  props: ['savedProducts'],
  methods: {
    ...mapActions(['deleteSavedProduct'])
  }
}
</script>