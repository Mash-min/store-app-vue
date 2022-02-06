<template>
  <div class="table-responsive table-container">
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th scope="col">Image</th>
          <th scope="col">Product name</th>
          <th scope="col">Price</th>
          <th scope="col">Shipping fee</th>
          <th scope="col">Quantity</th>
          <th scope="col">Total</th>
          <th scope="col">Options</th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="(cart, index) in carts" 
          :key="cart.slug">
          <td>
            <div class="form-check d-flex justify-content-center">
              <input 
                class="form-check-input" 
                type="checkbox"
                :value="cart.slug"
                v-model="selectedCarts">
            </div>
          </td>
          <td class="cart-image-container">
            <img :src="cart.product.images[0].image" alt="">
          </td>
          <td>
            <span class="fw-bolder">{{ cart.product.name }}</span><br>
            <span 
              class="badge bg-primary m-1"
              v-for="variant in cart.variants"
              :key="variant.id">
              {{ variant.item.name }}
            </span>
          </td>
          <td>₱ {{ cart.product.price }}</td>
          <td>₱ {{ cart.product.shipping_fee }}</td>
          <td>{{ cart.quantity }} pcs</td>
          <td>₱ {{ cart.product.price * cart.quantity + cart.product.shipping_fee }}</td>
          <td>
            <button 
              class="btn btn-sm btn-outline-danger"
              @click="deleteCart({ id: cart.id, index })">
              <i class="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-center p-1">
      <button 
        :class="{ 'disabled btn-outline-dark' : carts.length == 0 }"
        class="btn btn-outline-success btn-sm" 
        data-bs-toggle="modal" 
        data-bs-target="#checkOutModal"
        @click="checkOut" >
        Proceed to checkout
      </button>
    </div>
  </div>
  <CheckoutModal
    v-bind:selectedCarts="selectedCarts"/>
</template>

<script>
import { mapActions } from 'vuex'
import CheckoutModal from '@/components/Partials/CheckoutModal'

export default {
  name: 'CartTable',
  components: {
    CheckoutModal
  },
  props: ['carts'],
  data() {
    return {
      selectedCarts: []
    }
  },
  methods: {
    ...mapActions(['deleteCart', 'findCarts']),

    checkOut() {
      this.findCarts(this.selectedCarts)
    }
  }
}
</script>

<style scoped>
  .cart-image-container img {
    width: 150px;
    border-radius: 5px;
  }
</style>