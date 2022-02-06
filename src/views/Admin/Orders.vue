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
        <div class="col-md-12">

          <div class="m-1">
            <OrderTabs 
              v-bind:tab="'orders'"/>
          </div>

          <div class="m-1">
            <form @submit.prevent="submitSearch">
              <div class="d-flex">
                <button class="btn btn-sm btn-outline-success" type="submit"><i class="fa fa-search"></i></button>
                <input 
                  type="text"
                  class="form-control ms-1" 
                  placeholder="Search order here..."
                  v-model="search">
                <div class="input-group ms-1">
                  <label class="input-group-text" for="inputGroupSelect01"><i class="fa fa-sort"></i> Filter order</label>
                  <select class="form-select" @change="filterOrders" v-model="status">
                    <option value="all">All orders</option>
                    <option value="on-process">On process</option>
                    <option value="canceled">Canceled</option>
                  </select>
                </div>
              </div>
            </form>
          </div>

          <div class="m-1">
            <OrderList />
          </div>

          <div class="m-1">
            <div class="d-flex justify-content-center">
              <Pagination
                v-bind:linkData="orderLinks"
                v-on:emitLink="fetchAllOrders"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OffCanvas from '@/components/Admin/OffCanvas'
import Navbar from '@/components/Admin/Navbar'
import Sidebar from '@/components/Admin/Sidebar'
// import OrdersTable from '@/components/Admin/OrdersTable'
import Pagination from '@/components/Partials/Pagination'
import OrderList from '@/components/Admin/OrderList'
import OrderTabs from '@/components/Admin/OrderTabs'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AdminOrders',
  components: {
    OffCanvas, 
    Navbar, 
    Sidebar, 
    // OrdersTable,
    OrderList,
    Pagination,
    OrderTabs
  },
  data() {
    return {
      url: 'api/orders/all-orders/all',
      status: '',
      search: ''
    }
  },
  computed: {
    ...mapGetters(['orders', 'orderLinks'])
  },
  methods: {
    ...mapActions(['fetchAllOrders', 'searchOrder']),

    filterOrders() {
      this.search = ''
      this.fetchAllOrders(`api/orders/all-orders/${this.status}`)
    },

    submitSearch() {
      this.searchOrder(this.search)
    }
  },
  created() {
    this.fetchAllOrders(this.url)
  }
}
</script>