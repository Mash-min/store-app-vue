<template>
  <OffCanvas />
  <!-- OFF CANVAS -->
  <div class="row">
    <Navbar/>
    <div class="col-lg-3">
      <Sidebar/>
    </div>
    <div class="col-lg-9 col-md-12 mt-2">
      <ul class="list-group mb-3">
        <li class="list-group-item">
          <div class="row">
            <div class="col-md-4">
              <div class="d-flex justify-content-center mb-3">
                <div class="user-image-container">
                  <img src="@/assets/images/avatar.jpg" alt="">
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <p class="user-fullname">Mashiyyat Delos Santos</p>
              </div>
            </div>
            <div class="col-md-8">
              <ul class="list-group">
                <li class="list-group-item">
                  <small class="text-muted fw-bolder">User profile:</small>
                  <div class="row mt-2">
                    <div class="col-md-4 d-flex">
                      <small class="text-muted">Firstname:</small> <span class="ms-3">Mashiyyat</span>
                    </div>
                    <div class="col-md-4 d-flex">
                      <small class="text-muted">Lastname:</small> <span class="ms-3">Delos Santos</span>
                    </div>
                    <div class="col-md-4 d-flex">
                      <small class="text-muted">Contact:</small> <span class="ms-3">0000-000-0000</span>
                    </div>
                  </div>
                  <a href="" class="btn btn-sm btn-outline-success position-absolute top-0 end-0 m-1">
                    <i class="fa fa-pencil"></i>
                  </a>
                </li>
                <li class="list-group-item">
                  <small class="text-muted fw-bolder">Address: </small>
                  <div class="row mt-2">
                    <span>Unset</span>
                  </div>
                  <a href="" class="btn btn-sm btn-outline-success position-absolute top-0 end-0 m-1">
                    <i class="fa fa-pencil"></i>
                  </a>
                </li>
                <li class="list-group-item">
                  <small class="text-muted fw-bolder">Email address: </small>
                  <div class="row mt-2">
                    <span>delossantos.mash@gmail.com</span>
                  </div>
                  <a href="" class="btn btn-sm btn-outline-success position-absolute top-0 end-0 m-1">
                    <i class="fa fa-pencil"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import OffCanvas from '@/components/Admin/OffCanvas'
import Navbar from '@/components/Admin/Navbar'
import Sidebar from '@/components/Admin/Sidebar'

export default {
  name: 'AdminAccount',
  components: {
    OffCanvas, Navbar, Sidebar
  }
}
</script>