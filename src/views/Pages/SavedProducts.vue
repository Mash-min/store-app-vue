<template>
    <OffCanvas/>
    <div class="row">
      <Navbar/>
      <div class="col-lg-3">
        <Sidebar/>
      </div>
      <!-- SIDEBAR -->
      <div class="col-lg-9 col-md-12 mt-2">
        <ProfileTab />
        
        <div class="m-1">
          <NavTabs 
            v-bind:tab=" 'saved-products' "/>
        </div>
        <div class="m-1">
          <div class="row">
            <SavedProductItem 
              v-bind:savedProducts="savedProducts"/>
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
import SavedProductItem from '@/components/Partials/SavedProductItem'
import NavTabs from '@/components/Partials/NavTabs'
import ProfileTab from '@/components/Partials/ProfileTab'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'SavedProducts',
  components: {
    OffCanvas, 
    Navbar, 
    Sidebar, 
    SavedProductItem, 
    NavTabs,
    ProfileTab
  },
  computed: {
    ...mapGetters(['user', 'savedProducts'])
  },
  methods: {
    ...mapActions(['fetchSavedProducts'])
  },
  created() {
    this.fetchSavedProducts()
  }
}
</script>