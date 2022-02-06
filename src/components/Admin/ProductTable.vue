<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Price</th>
        <th scope="col">Shipping fee</th>
        <th scope="col">Stock</th>
        <th scope="col">Status</th>
        <th scope="col">Options</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(product, index) in products" :key="product.id"
        v-bind:class="{ 'table-danger text-muted' : product.status == 'archived'}">
        <td><small class="fw-bolder">{{ product.name }}</small></td>
        <td>₱ {{ product.price }}</td>
        <td>₱ {{ product.shipping_fee }}</td>
        <td>{{ product.stock }} pcs</td>
        <td>
          <div v-if="product.status == 'active'"  class="form-check form-switch d-flex justify-content-center">
            <input class="form-check-input" type="checkbox" role="switch" checked @change="archiveProduct(product.id)">
          </div>
          <div v-else class="form-check form-switch d-flex justify-content-center">
            <input class="form-check-input" type="checkbox" role="switch" @change="restoreProduct(product.id)">
          </div>
        </td>
        <td>
          <button class="btn btn-sm btn-outline-success ms-1 mb-1" 
            @click="findProduct(product.slug)"
            data-bs-toggle="modal" 
            data-bs-target="#editProductModal">
            <i class="fa fa-pencil"></i>
          </button>
          <button class="btn btn-sm btn-outline-danger ms-1 mb-1" 
            @click="deleteProduct({ id: product.id, index })">
            <i class="fa fa-trash"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ProductTable',
  props: ['products'],
  computed: {
    ...mapGetters(['product'])
  },
  methods: {
    ...mapActions(['deleteProduct', 'findProduct', 'archiveProduct', 'restoreProduct']),

    changeStatus() {
      console.log("Working")
    }
  }
}
</script>

<style scoped>
  .form-check-input:checked {
    background-color: #4ca546;
    border-color: #4ca546;
  }
</style>