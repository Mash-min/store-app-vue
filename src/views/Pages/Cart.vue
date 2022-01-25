<template>
    <OffCanvas/>
    <div class="row">
      <Navbar/>
      <div class="col-lg-3">
        <Sidebar/>
      </div>
      <!-- SIDEBAR -->
      <div class="col-lg-9 col-md-12 mt-2">
        <h1>Cart</h1>
        <ul v-for="cart in carts" :key="cart.id">
          <li>Product Name: {{ cart.product.name }}</li>
          <li>Quantity: {{ cart.quantity }} pcs</li>
          <li>Variants: 
            <span v-for="variant in cart.variants" :key="variant.slug" class="badge bg-primary ms-1">
              {{ variant.variant_item.name }}
            </span>
          </li>
        </ul>
      </div>
      <!-- CONTENT -->
    </div>
</template>

<script>
import OffCanvas from '@/components/Partials/OffCanvas'
import Navbar from '@/components/Partials/Navbar'
import Sidebar from '@/components/Partials/Sidebar'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Cart',
  components: {
    OffCanvas, Navbar, Sidebar
  },
  computed: {
    ...mapGetters(['carts'])
  },
  methods: {
    ...mapActions(['fetchCarts'])
  },
  created() {
    this.fetchCarts()
  }
}
</script>