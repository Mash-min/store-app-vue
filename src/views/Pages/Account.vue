<template>
    <OffCanvas/>
    <div class="row">
      <Navbar/>
      <div class="col-lg-3">
        <Sidebar/>
      </div>
      <!-- SIDEBAR -->
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
                  <p class="user-fullname">{{ user.firstname}} {{ user.lastname }}</p>
                </div>
              </div>
              <div class="col-md-8">
                <ul class="list-group">
                  <li class="list-group-item">
                    <small class="text-muted fw-bolder">User profile:</small>
                    <div class="row mt-2">
                      <div class="col-md-4 d-flex">
                        <small class="text-muted">Firstname:</small> <span class="ms-3">{{ user.firstname }}</span>
                      </div>
                      <div class="col-md-4 d-flex">
                        <small class="text-muted">Lastname:</small> <span class="ms-3">{{ user.lastname }}</span>
                      </div>
                      <div class="col-md-4 d-flex">
                        <small class="text-muted">Contact:</small> <span class="ms-3">{{ user.contact }}</span>
                      </div>
                    </div>
                    <a href="" class="btn btn-sm btn-outline-success position-absolute top-0 end-0 m-1">
                      <i class="fa fa-pencil"></i>
                    </a>
                  </li>
                  <li class="list-group-item">
                    <small class="text-muted fw-bolder">Address: </small>
                    <div class="row mt-2">
                      <span>{{ user.address }}</span>
                    </div>
                    <a href="" class="btn btn-sm btn-outline-success position-absolute top-0 end-0 m-1">
                      <i class="fa fa-pencil"></i>
                    </a>
                  </li>
                  <li class="list-group-item">
                    <small class="text-muted fw-bolder">Email address: </small>
                    <div class="row mt-2">
                      <span>{{ user.email }}</span>
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

        <ul class="list-group">
          <li class="list-group-item">
            <ul class="nav">
              <li class="nav-item">
                <a class="nav-link text-black" >Orders</a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-black" href="#">Saved Products</a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-black" href="#">Cart</a>
              </li>
            </ul>
          </li>
          <li class="list-group-item table-container">
            <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Product name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Shipping fee</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Sample Product 1</td>
                    <td>PHP 150.00</td>
                    <td>PHP 50.00</td>
                    <td>1 pcs</td>
                    <td>PHP 200.00</td>
                    <td>On Process</td>
                  </tr>
                  <tr>
                    <td colspan="6">No orders yet</td>
                  </tr>
                </tbody>
            </table>
          </li>
          <li class="list-group-item d-flex justify-content-center">
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item"><a class="page-link" href="#"><i class="fa fa-chevron-left"></i></a></li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item"><a class="page-link" href="#"><i class="fa fa-chevron-right"></i></a></li>
              </ul>
            </nav>
          </li>
        </ul>
      </div>
      <!-- CONTENT -->
    </div>
</template>

<script>
import OffCanvas from '@/components/Partials/OffCanvas'
import Navbar from '@/components/Partials/Navbar'
import Sidebar from '@/components/Partials/Sidebar'
import { mapGetters } from 'vuex'

export default {
  name: 'Account',
  components: {
    OffCanvas, Navbar, Sidebar
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>