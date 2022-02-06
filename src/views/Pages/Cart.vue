<template>
    <OffCanvas/>
    <div class="row">
      <Navbar/>
      <div class="col-lg-3">
        <Sidebar/>
      </div>
      <!-- SIDEBAR -->
      <div class="col-lg-9 col-md-12 mt-2 mb-3">
        <ProfileTab />
        <div class="m-1">
          <NavTabs 
            v-bind:tab=" 'cart' "/>
        </div>
        <div class="m-1">
          <CartList 
            v-bind:carts="carts"/>
        </div>
        <div class="m-1">
          <div class="d-flex justify-content-center mt-3">
            <Pagination
            v-bind:linkData="cartLinks"
            v-on:emitLink="fetchCarts"/>
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
// import CartTable from '@/components/Partials/CartTable'
import NavTabs from '@/components/Partials/NavTabs'
import Pagination from '@/components/Partials/Pagination'
import ProfileTab from '@/components/Partials/ProfileTab'
import CartList from '@/components/Partials/CartList'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Cart',
  components: {
    OffCanvas, 
    Navbar, 
    Sidebar, 
    // CartTable, 
    NavTabs, 
    Pagination,
    ProfileTab,
    CartList
  },
  data() {
    return {
      url: 'api/carts'
    }
  },
  computed: {
    ...mapGetters(['user', 'carts', 'cartLinks'])
  },
  methods: {
    ...mapActions(['fetchCarts']),

    checkOut() {
      console.log(this.selectedCarts)
    }
  },
  created() {
    this.fetchCarts(this.url)
  }
}
</script>