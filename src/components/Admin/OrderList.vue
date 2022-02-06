<template>
  <div class="order-list-container">
    <div class="order-list">
      <div 
        class="order-list-item"
        v-for="(order, index) in orders"
        :key="order.id">
        <div 
          class="card mb-1"
          :class="{ 'border-danger' : order.status == 'canceled' }">
          <div class="row p-2">
            <div class="col-md-3 col-6">
              <small 
                class="fw-bolder"
                :class="{ 'text-danger' : order.status == 'canceled' }">
                <i class="fa fa-chevron-right"></i>
                {{ order.cart.product.name }}
              </small><br>
              <small class="text-muted fst-italic">{{ order.slug }}</small><br>
              <small class="text-muted">
                <i class="fa fa-user-circle"></i> {{ order.cart.user.firstname + " " + order.cart.user.lastname}} <br>
                <small class="text-muted fst-italic">#{{ order.cart.user.contact }}</small>
              </small>
            </div>
            <div class="col-md-3 col-6" style="text-align: end">
              <small class="text-muted">Price: </small><small class="fw-bolder">₱{{ order.cart.product.price }}</small><br>
              <small class="text-muted">Shipping fee: </small><small class="fw-bolder">₱ {{ order.cart.product.shipping_fee }}</small><br>
              <small class="text-muted">Quantity: </small><small class="fw-bolder">{{ order.cart.quantity }} pcs</small><br>
              <small class="text-muted">Variants: </small>
              <small 
                class="bg-primary text-white p-1 ms-1"
                v-for="variant in order.cart.variants"
                :key="variant.id">
                {{ variant.item.name }}
              </small>
            </div>
            <div class="col-md-3" style="text-align: center">
              <small class="text-muted">Total: </small>
              <small 
                class="fw-bolder text-success"
                :class="{ 'text-danger' : order.status == 'canceled' }">
                ₱ {{ order.total }}
              </small><br>
              <small 
                class="bg-success p-1 text-white rounded-3"
                :class="{ 'bg-danger' : order.status == 'canceled' }">
                {{ order.status }}
              </small><br>
            </div>
            <div class="col-md-3 mt-1">
              <div class="d-flex justify-content-center">
                <button class="btn btn-sm btn-outline-primary">
                  <i class="fa fa-send"></i>
                </button>
                <button 
                  class="btn btn-sm btn-outline-danger ms-1"
                  @click="deleteOrder({ id: order.id, index })">
                  <i class="fa fa-times"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// import Placeholder from '@/components/Partials/Placeholder'

export default {
  name: 'OrderList',
  components: {
    // Placeholder
  },
  computed: {
    ...mapGetters(['orders'])
  },
  methods: {
    ...mapActions(['deleteOrder'])
  }
}
</script>