<template>
  <OffCanvas />
  <!-- OFF CANVAS -->
  <div class="row">
    <Navbar/>
    <div class="col-lg-3">
      <Sidebar/>
    </div>
    <div class="col-lg-9 col-md-12 mt-2">
      <h3>Products</h3>
      <div class="row">
        <div class="col-md-12">
          <ul class="list-group m-1">
            <li class="list-group-item">
              <div class="d-flex">
                <div class="col-8">
                  <form action="">
                    <div class="d-flex">
                      <button class="btn btn-sm btn-outline-success" type="submit"><i class="fa fa-search"></i></button>
                      <input type="text" class="form-control ms-1" placeholder="Search product here...">
                    </div>
                  </form>
                </div>
                <div class="col-4 ms-1">
                  <select class="form-select" aria-label="Default select example">
                    <option selected>Open this select menu</option>
                    <option value="1">All</option>
                    <option value="2">Active</option>
                    <option value="3">Archived</option>
                  </select>
                </div>
              </div>  
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <router-link to="/admin/add-product" class="btn btn-sm btn-outline-primary">
                <i class="fa fa-plus"></i> Add product  
              </router-link>
            </li>
            <li class="list-group-item table-container">
              <ProductTable
                v-bind:products="products"/>
            </li>
            <li class="list-group-item d-flex justify-content-center">
              <Pagination 
                v-bind:linkData="productLinks"
                v-on:emitLink="fetchProducts"/>
            </li>
          </ul>
        </div>
      </div>
      <ProductUpdateForm/>
      <ProductAddVariant/>
    </div>
  </div>
</template>

<script>
import OffCanvas from '@/components/Admin/OffCanvas'
import Navbar from '@/components/Admin/Navbar'
import Sidebar from '@/components/Admin/Sidebar'
import ProductTable from '@/components/Admin/ProductTable'
import Pagination from '@/components/Partials/Pagination'
import ProductUpdateForm from '@/components/Admin/ProductUpdateForm'
import ProductAddVariant from '@/components/Admin/ProductAddVariant'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AdminProducts',
  components: {
    OffCanvas, 
    Navbar, 
    Sidebar, 
    ProductTable, 
    Pagination, 
    ProductUpdateForm,
    ProductAddVariant
  },
  data() {
    return {
      url: 'api/products/paginate/10'
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

<style scoped>
  .table-container {
    padding: 0px;
    text-align: center;
  }
  .table-container table {
    margin-bottom: 0px;
  }
</style>