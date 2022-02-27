<template>
  <div class="cart-list-container">
    <div class="cart-list">
        <!-- Cart list item -->
      <div 
        class="cart-list-item mb-1"
        v-for="(cart, index) in carts"
        :key="cart.id">
          <div class="card position-relative">
            <div class="dropdown">
              <button 
                class="btn btn-sm dropdown-toggle position-absolute top-0 end-0" 
                type="button" 
                :id="cart.slug" 
                data-bs-toggle="dropdown" 
                aria-expanded="false">
              </button>
              <ul class="dropdown-menu" :aria-labelledby="cart.slug">
                <li>
                  <button 
                    @click="deleteCart({ id: cart.id, index })"
                    class="dropdown-item">
                    Remove from cart
                  </button>
                </li>
                <li>
                  <router-link 
                    :to="'/products/'+ cart.product.slug"
                    class="dropdown-item">
                    View product
                  </router-link>
                </li>
              </ul>
            </div>
            <div class="row p-2">
              <div class="col-md-4 col-6">
                <small class="fw-bolder d-flex">
                  <div class="form-check">
                    <input 
                      class="form-check-input" 
                      type="checkbox" 
                      :value="cart.slug"
                      v-model="selectedCarts">
                  </div> 
                  <img :src="cart.product.images[0].image" alt="" class="cart-image"><br>
                  <span class="ms-1">{{ cart.product.name }}</span>
                </small><br>
                <small 
                  class="bg-success text-white ms-1 p-1 rounded-2"
                  v-for="variant in cart.variants"
                  :key="variant.id">
                  {{ variant.item.name }}
                </small>
              </div>
              <div class="col-md-4 col-6">
                <small class="text-muted">Price: </small><small class="fw-bolder">₱ {{ cart.product.price }}</small><br>
                <small class="text-muted">Shipping fee: </small><small class="fw-bolder">₱ {{ cart.product.shipping_fee }}</small><br>
                <small class="text-muted">Quantity: </small><small class="fw-bolder">{{ cart.quantity }}</small>
              </div>
              <div class="col-md-4 mt-3 col-12" style="text-align: center">
                <small class="text-muted">Total: </small>
                <small class="fw-bolder text-success">
                  ₱ {{ cart.product.price * cart.quantity + cart.product.shipping_fee }}
                </small><br>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
  <div class="d-flex justify-content-center p-1">
    <button 
      :class="{ 
        'disabled' : carts.length == 0 || selectedCarts.length == 0 }"
      class="btn btn-success" 
      data-bs-toggle="modal" 
      data-bs-target="#checkOutModal"
      @click="checkOut" >
      Proceed to checkout
    </button>
  </div>
  <CheckoutModal 
    v-bind:selectedCarts="selectedCarts"/>
</template>

<script>
import { mapActions } from 'vuex'
import CheckoutModal from '@/components/Partials/CheckoutModal'

export default {
  name: 'CartList',
  props: ['carts'],
  components: {
    CheckoutModal
  },
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
  .cart-image {
    width: 100px;
    height: 100px;
  }
</style>