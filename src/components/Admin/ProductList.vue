<template>
  <div class="product-list-container">
    <div class="product-list m-1">
      <!-- Product list item -->
      <div class="product-list-item mb-1" 
        v-for="product in products" 
        :key="product.slug">
        <div class="card position-relative"
          :class="{ 'bg-dark text-white' : product.status != 'active' }">
          <div class="position-absolute top-0 end-0 m-1">
            <div class="dropdown">
              <button 
                :class="{ 
                  'text-white' : product.status != 'active',
                }"
                class="btn btn-sm dropdown-toggle" 
                type="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false">
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <button class="dropdown-item"  
                    @click="findProduct(product.slug)"
                    data-bs-toggle="modal" 
                    data-bs-target="#editProductModal">
                    Edit
                  </button>
                </li>
                <li>
                  <button class="dropdown-item" 
                    @click="deleteProduct({ id: product.id, index })">
                    Delete
                  </button>
                </li>
                <li>
                  <router-link :to="'/products/' + product.slug" class="dropdown-item">
                    View product
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="row p-2">
            <div class="col-md-4 col-7">
              <small class="fw-bolder"><i class="fa fa-chevron-right"></i> {{ product.name }}</small><br>
              <small class="text-muted">{{ product.slug }}</small><br>
              <small class="text-muted fst-italic">{{ product.created_at }}</small>
            </div>
            <div class="col-md-4 col-5">
              <small class="text-muted">Price: </small><small class="fw-bolder">₱ {{ product.price }}</small><br>
              <small class="text-muted">Shipping fee: </small><small class="fw-bolder">₱ {{ product.shipping_fee }}</small><br>
              <small class="text-muted">Stock: </small><small class="fw-bolder">{{ product.stock }} pcs</small>
            </div>
            <div class="col-md-4 col-12" style="text-align: center">
              <div 
                class="form-check form-switch d-flex justify-content-center"
                v-if="product.status == 'active'">
                <input class="form-check-input" type="checkbox" role="switch" checked @change="archiveProduct(product.id)">
                <label class="ms-1">{{ product.status }}</label>
              </div>
              <div v-else class="form-check form-switch d-flex justify-content-center">
                <input class="form-check-input" type="checkbox" role="switch" @change="restoreProduct(product.id)">
                <label class="ms-1">{{ product.status }}</label>
              </div>
              <button 
                class="btn btn-sm"
                :class="{ 
                  'disabled btn-secondary' : product.status != 'active', 
                  'btn-outline-secondary' : product.status == 'active' }">
                <i class="fa fa-image"></i> Edit image
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProductList',
  computed: {
    ...mapGetters(['products'])
  },
  methods: { 
    ...mapActions([
      'findProduct',
      'deleteProduct',
      'archiveProduct',
      'restoreProduct'
    ])
  }
}
</script>