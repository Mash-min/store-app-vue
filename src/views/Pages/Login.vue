<template>
    <OffCanvas/>
    <div class="row">
      <Navbar/>
      <div class="col-lg-3">
        <Sidebar/>
      </div>
      <!-- SIDEBAR -->
      <div class="col-lg-9 col-md-12 mt-2">
        <div class="col-md-4 offset-md-4 mt-5 p-1">
          <form @submit.prevent="submitUser">
            <ul class="list-group">
              <li class="list-group-item" style="text-align: center;">
                <h3>Login</h3>
              </li>
              <li class="list-group-item">
                <div class="mb-3">
                  <label class="form-label">Email address: </label>
                  <input type="email" class="form-control" placeholder="name@example.com" v-model="data.email">
                </div>
              </li>
              <li class="list-group-item">
                <div class="mb-3">
                  <label class="form-label">Password: </label>
                  <input type="password" class="form-control" placeholder="Enter your password here..." v-model="data.password">
                </div>
              </li>
              <li class="list-group-item" style="text-align: center;">
                <div class="d-grid">
                  <button class="btn btn-sm btn-outline-primary" type="submit">
                    Login
                  </button>
                  <span class="text-muted">or</span>
                  <a href="/register">
                    <small>Create account</small>
                  </a>
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
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Login',
  components: {
    OffCanvas, Navbar, Sidebar
  },
  data() {
    return {
      data: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'user', 
      'isAuthenticated'])
  },
  methods: {
    ...mapActions([
      'loginUser']),

    submitUser() {
      this.loginUser(this.data)
    }
  }
}
</script>