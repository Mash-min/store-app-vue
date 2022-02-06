<template>
  <div 
    class="modal fade" 
    id="checkOutModal" 
    data-bs-backdrop="static" 
    data-bs-keyboard="false" 
    tabindex="-1" 
    aria-labelledby="exampleModalLabel" 
    aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Checkout</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-3 p-1" 
              v-for="cart in cartArr" 
              :key="cart.id">
              <div class="card product-item">
                <div class="card-body">
                  <img 
                    v-if="cart.product.images.length != 0"
                    v-bind:src="cart.product.images[0].image" 
                    class="card-img-top" alt="...">
                  <span class="badge bg-primary m-1" v-for="variant in cart.variants" :key="variant.id">
                    {{ variant.item.name }}
                  </span>
                  <div class="card-body">
                    <h5 class="card-title">{{ cart.product.name }}</h5>
                  </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      <small class="text-muted">Price: </small><span class="text-success fw-bolder">₱ {{ cart.product.price }}</span><br>
                      <small class="text-muted">Quantity: </small><span>{{ cart.quantity }} pcs</span><br>
                      <small class="text-muted">Shipping fee: </small><span>{{ cart.product.shipping_fee }} pcs</span><br>
                    </li>
                  </ul>
                </div>
                <div class="card-footer">
                  <small class="text-muted">Total: </small>
                  <small class="fw-bolder text-success">
                    ₱ {{ cart.product.price * cart.quantity + cart.product.shipping_fee }}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-sm btn-outline-danger" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-sm btn-outline-primary" @click="submitCheckout">Checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'CheckoutModal',
  props: ['selectedCarts'],
  computed: {
    ...mapGetters(['cartArr'])
  },
  methods: {
    ...mapActions(['checkOut']),

    submitCheckout() {
      const payload = {
        carts: this.selectedCarts,
        contact: '00000000000'
      }
      this.checkOut(payload)
    }
  }
}
</script>