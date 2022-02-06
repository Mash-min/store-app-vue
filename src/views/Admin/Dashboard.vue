<template>
  <OffCanvas />
  <!-- OFF CANVAS -->
  <div class="row">
    <Navbar/>
    <div class="col-lg-3">
      <Sidebar/>
    </div>
    <div class="col-lg-9 col-md-12 mt-2">
      <div class="m-1">
        <h3>Dashboard</h3>
        <div class="p-5 mb-4 text-white bg-dark rounded-3">
          <div class="container-fluid">
            <h3 class="display-5 fw-bold">Welcome back {{ user.firstname }}</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet obcaecati magni tempora assumenda possimus nihil debitis hic libero praesentium voluptatem doloremque tenetur sed ab officia, officiis ea quod provident veritatis.</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 p-1">
          <div class="card">
            <div class="card-body">
              <h5><i class="fa fa-shopping-basket"></i> Products: {{ dashboard.products }}</h5>
            </div>
          </div>
        </div>
        <div class="col-md-4 p-1">
          <div class="card">
            <div class="card-body">
              <h5><i class="fa fa-truck"></i> Orders: {{ dashboard.orders }}</h5>
            </div>
          </div>
        </div>
        <div class="col-md-4 p-1">
          <div class="card">
            <div class="card-body">
              <h5><i class="fa fa-user-circle"></i> Users: {{ dashboard.users }}</h5>
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
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Dashboard',
  components: {
    OffCanvas, Navbar, Sidebar
  },
  computed: {
    ...mapGetters(['user', 'products', 'dashboard'])
  },
  methods: {
    ...mapActions(['fetchDashboard'])
  },
  created() {
    this.fetchDashboard()
  }
}
</script>