<template>
    <OffCanvas/>
    <div class="row">
      <Navbar/>
      <div class="col-lg-3">
        <Sidebar/>
      </div>
      <!-- SIDEBAR -->
      <div class="col-lg-9 col-md-12 mt-2">
        <div class="row mt-3 mb-5">
          <ProductItem v-bind:products="products"/>
        </div>
        <div class="d-flex justify-content-center">
          <Pagination 
            v-bind:linkData="productLinks"
            v-on:emitLink="fetchProducts"/>
        </div>
      </div>
      <!-- CONTENT -->
    </div>
</template>

<script>
import OffCanvas from '@/components/Partials/OffCanvas'
import Navbar from '@/components/Partials/Navbar'
import Sidebar from '@/components/Partials/Sidebar'
import Pagination from '@/components/Partials/Pagination'
import ProductItem from '@/components/Partials/ProductItem'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Products',
  components: {
    OffCanvas, Navbar, Sidebar, Pagination, ProductItem
  },
  data() {
    return {
      url: `/api/products/paginate/16?page=${this.$route.params.number}`
    }
  },
  computed: {
    ...mapGetters(['products', 'productLinks'])
  },
  methods: {
    ...mapActions(['fetchProducts'])
  },
  created() {
    this.fetchProducts(this.url)
  }
}
</script>