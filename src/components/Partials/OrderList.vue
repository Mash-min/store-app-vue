<template>
  <div class="order-list-container">
    <div class="order-list">
      <div 
        class="order-list-item mb-1"
        v-for="(order, index) in orders"
        :key="order.slug">
        <div class="card p-2">
          <div class="row">
            <div class="col-md-3 col-6 p-1">
              <small class="fw-bolder"><i class="fa fa-chevron-right"></i> {{ order.cart.product.name }}</small><br>
              <small class="text-muted fst-italic">{{ order.slug }}</small><br>
              <small 
                class="p-1 text-white ms-1 bg-success"
                v-for="variant in order.cart.variants"
                :key="variant.id">
                {{variant.item.name }}
              </small>
            </div>
            <div class="col-md-3 col-6 p-1">
              <small class="text-muted">Price: </small><small class="fw-bolder">₱ {{ order.cart.product.price }}</small><br>
              <small class="text-muted">Shipping fee: </small><small class="fw-bolder">₱ {{ order.cart.product.shipping_fee }}</small><br>
              <small class="text-muted">Quantity: </small><small class="fw-bolder">{{ order.cart.quantity }}</small>
            </div>
            <div class="col-md-3 col-6 p-1">
              <small class="text-muted">Total: </small><small class="fw-bolder text-success">₱ {{ order.total }}</small><br>
              <small class="bg-success p-1 text-white">{{ order.status }}</small>
            </div>
            <div class="col-md-3 col-6 p-1">
              <button 
                class="btn btn-sm btn-outline-danger"
                 @click="cancelOrder({ id: order.id, index })">
                cancel order
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
  name: 'OrderList',
  computed: {
    ...mapGetters(['orders'])
  },
  methods: {
    ...mapActions(['cancelOrder'])
  }
}
</script>