<template>
  <div class="table-container">
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th scope="col">Product name</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Shipping fee</th>
          <th scope="col">Total</th>
          <th scope="col">Status</th>
          <th scope="col">Options</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in orders" :key="order.slug">
          <th class="order-image">
            <img :src="order.cart.product.images[0].image" alt="">
          </th>
          <td>
            <span class="fw-bolder">{{ order.cart.product.name }}</span><br>
            <span 
              class="badge bg-primary ms-1 mb-1" 
              v-for="variant in order.cart.variants" 
              :key="variant.id">
              {{ variant.item.name }}
            </span>
          </td>
          <td>₱ {{ order.cart.product.price }}</td>
          <td>{{ order.cart.quantity }} pcs</td>
          <td>₱ {{ order.cart.product.shipping_fee }}</td>
          <td>₱ {{ order.total }}</td>
          <td><span class="badge bg-success">{{ order.status }}</span></td>
          <td>
            <button class="btn btn-sm btn-outline-danger" @click="cancelOrder({ id: order.id, index })">
              Cancel
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'OrderItem',
  props: ['orders'],
  methods: {
    ...mapActions(['cancelOrder'])
  }
}
</script>

<style scoped>
  .order-image img {
    width: 150px;
    border-radius: 3px;
  }
</style>