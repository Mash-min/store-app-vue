<template>
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
            <p class="user-fullname" style="margin: 0px">{{ user.firstname}} {{ user.lastname }}</p>
          </div>
          <div class="d-flex justify-content-center">
            <small class="text-muted">{{ user.email }}</small>
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
              <button 
                class="btn btn-sm btn-outline-success position-absolute top-0 end-0 m-1" 
                data-bs-toggle="modal" 
                data-bs-target="#updateAccountModal">
                <i class="fa fa-pencil"></i>
              </button>
            </li>
            <li class="list-group-item">
              <small class="text-muted fw-bolder">Address: </small>
              <div class="row mt-2">
                <span>{{ user.address }}</span>
              </div>
            </li>
            <li class="list-group-item">
              <small class="text-muted fw-bolder">Password: </small>
              <div class="row mt-2">
                <button 
                  class="btn btn-sm btn-outline-dark" 
                  data-bs-toggle="modal" 
                  data-bs-target="#resetPasswordModal">
                  Reset Password
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </li>
  </ul>

  <!-- Modal -->
  <div class="modal fade" id="updateAccountModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <form @submit.prevent="submitAccount">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-1">
              <small class="text-muted">Firstname: </small>
              <input type="text" class="form-control" v-model="user.firstname">
            </div>
            <div class="mb-1">
              <small class="text-muted">Lastname: </small>
              <input type="text" class="form-control" v-model="user.lastname">
            </div>
            <div class="mb-1">
              <small class="text-muted">Email: </small>
              <input type="text" class="form-control" v-model="user.email">
            </div>
            <div class="mb-1">
              <small class="text-muted">Adress: </small>
              <input type="text" class="form-control" v-model="user.address">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-sm btn-outline-danger" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-sm btn-outline-primary">Save changes</button>
          </div>
        </div>
      </form>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="resetPasswordModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <form @submit.prevent="submitPassword">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Reset Password</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-1">
              <small class="text-muted">Current Password: </small>
              <input 
                type="password" 
                class="form-control"
                v-model="current_password" 
                placeholder="Enter your current password...">
            </div>
            <div class="mb-1">
              <small class="text-muted">New Password: </small>
              <input 
                type="password" 
                class="form-control"
                v-model="password" 
                placeholder="Enter your new password...">
            </div>
            <div class="mb-1">
              <small class="text-muted">Password confirmation: </small>
              <input 
                type="password" 
                class="form-control"
                v-model="password_confirmation" 
                placeholder="Re-enter your current password...">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-sm btn-outline-danger" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-sm btn-outline-primary">Save changes</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'ProfileTab',
  computed: {
    ...mapGetters(['user'])
  },
  data() {
    return {
      current_password: '',
      password: '',
      password_confirmation: ''
    }
  },
  methods: {
    ...mapActions(['updateUser', 'resetPassword']),

    submitAccount() {
      this.updateUser(this.user)
    },

    submitPassword() {
      const payload = {
        current_password: this.current_password,
        password: this.password,
        password_confirmation: this.password_confirmation
      }
      this.resetPassword(payload)
    }
  }
}
</script>