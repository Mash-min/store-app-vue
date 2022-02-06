<template>
    <OffCanvas/>
    <div class="row">
      <Navbar/>
      <div class="col-lg-3">
        <Sidebar/>
      </div>
      <!-- SIDEBAR -->
      <div class="col-lg-9 col-md-12 mt-2">
        <Banner/>
        <div class="row mt-3 mb-3">
          <div class="d-flex justify-content-center">
            <h5>Latest products</h5>
          </div>
          <ProductItem v-bind:products="products"/>
        </div>
        <div class="d-flex mb-5 justify-content-center">
          <div class="col-6">
            <div class="d-grid">
              <router-link to="/products" class="btn btn-outline-primary btn-sm">
                View all products
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <!-- CONTENT -->
    </div>
</template>

<script>
import OffCanvas from '@/components/Partials/OffCanvas'
import Navbar from '@/components/Partials/Navbar'
import Sidebar from '@/components/Partials/Sidebar'
import Banner from '@/components/Partials/Banner'
import ProductItem from '@/components/Partials/ProductItem'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Index',
  components: {
    OffCanvas, Navbar, Sidebar, Banner, ProductItem
  },
  data() {
    return {
      url: 'api/products/paginate/12'
    }
  },
  computed: {
    ...mapGetters(['products'])
  },
  methods: {
    ...mapActions(['fetchProducts'])
  },
  created() {
    this.fetchProducts(this.url)
  }
}
</script>