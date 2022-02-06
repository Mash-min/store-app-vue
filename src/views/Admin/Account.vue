<template>
  <OffCanvas />
  <!-- OFF CANVAS -->
  <div class="row">
    <Navbar/>
    <div class="col-lg-3">
      <Sidebar/>
    </div>
    <div class="col-lg-9 col-md-12 mt-2">
      <ProfileTab/>
    </div>
  </div>
</template>

<script>
import OffCanvas from '@/components/Admin/OffCanvas'
import Navbar from '@/components/Admin/Navbar'
import Sidebar from '@/components/Admin/Sidebar'
import ProfileTab from '@/components/Partials/ProfileTab'

export default {
  name: 'AdminAccount',
  components: {
    OffCanvas, 
    Navbar, 
    Sidebar,
    ProfileTab
  }
}
</script>