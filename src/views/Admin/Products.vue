<template>
  <OffCanvas />
  <!-- OFF CANVAS -->
  <div class="row">
    <Navbar/>
    <div class="col-lg-3">
      <Sidebar/>
    </div>
    <div class="col-lg-9 col-md-12 mt-2">
      <div class="row">
        <ProductTabs 
          v-bind:tab="'products'"/>
        <div class="search-form-container">
          <div class="m-1">
            <form @submit.prevent="submitSearch">
              <div class="d-flex">
                <button class="btn btn-sm btn-primary">
                  <i class="fa fa-search"></i>
                </button>
                <input type="text" class="form-control ms-1" placeholder="Search product..." v-model="search">
                <button type="button" class="btn btn-sm btn-primary ms-1" @click="fetchProducts(url)">
                  <i class="fa fa-refresh"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
        <ProductList/>
        <div class="d-flex justify-content-center mt-3">
          <Pagination 
            v-bind:linkData="productLinks"
            v-on:emitLink="fetchProducts"/>
        </div>
      </div>
      <ProductUpdateForm/>
    </div>
  </div>
</template>

<script>
import OffCanvas from '@/components/Admin/OffCanvas'
import Navbar from '@/components/Admin/Navbar'
import Sidebar from '@/components/Admin/Sidebar'
import Pagination from '@/components/Partials/Pagination'
import ProductUpdateForm from '@/components/Admin/ProductUpdateForm'
import ProductTabs from '@/components/Admin/ProductTabs'
import ProductList from '@/components/Admin/ProductList'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AdminProducts',
  components: {
    OffCanvas, 
    Navbar, 
    Sidebar, 
    Pagination, 
    ProductUpdateForm,
    ProductTabs,
    ProductList
  },
  data() {
    return {
      url: 'api/products/paginate/15',
      search: ''
    }
  },
  computed: {
    ...mapGetters(['productLinks'])
  },
  methods: {
    ...mapActions(['fetchProducts', 'searchProduct']),

    submitSearch() {
      if(this.search != " " || this.search == null) {
        this.searchProduct(this.search)
      } else {
        this.fetchProducts(this.url)
      }
    }
  },
  created() {
    this.fetchProducts(this.url)
  }
}
</script>

<style scoped>
  .table-container {
    padding: 0px;
    text-align: center;
  }
  .table-container table {
    margin-bottom: 0px;
  }
</style>