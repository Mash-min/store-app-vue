<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">Order ID</th>
        <th scope="col">Product name</th>
        <th scope="col">Total Price</th>
        <th scope="col">Customer</th>
        <th scope="col">Status</th>
        <th scope="col">Options</th>
      </tr>
    </thead>
    <tbody>
      <tr 
        v-for="(order, index) in orders" 
        :key="order.id" 
        :class="{ 'table-danger' : order.status == 'canceled' }">
        <td><small class="fw-bolder">{{ order.slug }}</small></td>
        <td><small>{{ order.cart.product.name }}</small></td>
        <td>₱ {{ order.total }}</td>
        <td><small>{{ order.cart.user.firstname }} {{ order.cart.user.lastname }}</small></td>
        <td>
          <span class="badge" 
            :class="{ 
              'bg-success' : order.status == 'on-process', 
              'bg-danger' : order.status == 'canceled' 
            }">
            {{ order.status }}
          </span>
        </td>
        <td>
          <button 
            class="ms-1 btn btn-sm btn-outline-primary"
            :class="{ 'disabled btn-outline-dark' : order.status == 'canceled' }">
            <i class="fa fa-send"></i>
          </button>
          <button 
            class="ms-1 btn btn-sm btn-outline-danger"
            @click="deleteOrder({ id: order.id, index })">
            <i class="fa fa-times"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'OrdersTable',
  props: ['orders'],
  methods: {
    ...mapActions(['deleteOrder'])
  }
}
</script>