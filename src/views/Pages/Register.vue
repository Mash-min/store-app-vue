<template>
    <OffCanvas/>
    <div class="row">
      <Navbar/>
      <div class="col-lg-3">
        <Sidebar/>
      </div>
      <!-- SIDEBAR -->
      <div class="col-lg-9 col-md-12 mt-2">
        <div class="col-md-8 offset-md-2 mb-3 mt-1 p-1">
          <form @submit.prevent="submitUser">
            <ul class="list-group">
              <li class="list-group-item" style="text-align: center;">
                <h3>Register</h3>
              </li>
              <li class="list-group-item">
                <div class="row">
                  <div class="mb-3 col-md-6 p-1">
                    <label class="form-label">Firstname: </label>
                    <input 
                      type="text" 
                      class="form-control" 
                      placeholder="Enter your firstname here..."
                      v-model="user.firstname">
                  </div>
                  <div class="mb-3 col-md-6 p-1">
                    <label class="form-label">Lastname: </label>
                    <input 
                      type="text" 
                      class="form-control" 
                      placeholder="Enter your lastname here..."
                      v-model="user.lastname">
                  </div>
                </div>
              </li>
              <li class="list-group-item">
                <div class="mb-3">
                  <label class="form-label">Contact: </label>
                  <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Enter your contact here..."
                    v-model="user.contact">
                </div>
              </li>
              <li class="list-group-item">
                <div class="mb-3">
                  <label class="form-label">Email: </label>
                  <input 
                    type="email" 
                    class="form-control" 
                    placeholder="Enter your email here..."
                    v-model="user.email">
                </div>
              </li>
              <li class="list-group-item">
                <div class="mb-3">
                  <label class="form-label">Password: </label>
                  <input 
                    type="password" 
                    class="form-control" 
                    placeholder="Enter your password here..."
                    v-model="user.password">
                </div>
              </li>
              <li class="list-group-item">
                <div class="mb-3">
                  <label class="form-label">Password Confirmation: </label>
                  <input 
                    type="password" 
                    class="form-control" 
                    placeholder="Re-enter your password here..."
                    v-model="user.password_confirmation">
                </div>
              </li>
              <li class="list-group-item" style="text-align: center;">
                <div class="d-grid">
                  <button class="btn btn-sm btn-outline-success" type="submit">
                    Register
                  </button>
                  <span class="text-muted">or</span>
                  <router-link to="/login">Login your account</router-link>
                </div>
              </li>
            </ul>
          </form>
        </div>
      </div>
      <!-- CONTENT -->
    </div>
</template>

<script>
import OffCanvas from '@/components/Partials/OffCanvas'
import Navbar from '@/components/Partials/Navbar'
import Sidebar from '@/components/Partials/Sidebar'
import { mapActions } from 'vuex'

export default {
  name: 'Register',
  components: {
    OffCanvas, Navbar, Sidebar
  },
  data() {
    return {
      user: {
        firstname: '',
        lastname: '',
        contact: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  methods: {
    ...mapActions(['registerUser']),

    submitUser() {
      this.registerUser(this.user)
    }
  },
}
</script>