<template>
  <OffCanvas />
  <!-- OFF CANVAS -->
  <div class="row">
    <Navbar/>
    <div class="col-lg-3">
      <Sidebar/>
    </div>
    <div class="col-lg-9 col-md-12 mt-2">
      <h3>Categories</h3>
      <div class="row">
        <div class="col-md-12">
          <ul class="list-group m-1">
            <li class="list-group-item d-flex justify-content-between">
              <button class="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#addCategoryModal">
                <i class="fa fa-plus"></i> Add category
              </button>
            </li>
            <li class="list-group-item table-container">
              <CategoryTable 
                v-bind:categories="categories"/>
            </li>
            <li class="list-group-item d-flex justify-content-center">
              <Pagination 
                v-bind:linkData="categoryLinks"
                v-on:emitLink="fetchCategories"/>
            </li>
          </ul>
        </div>
      </div>
      <!-- Add Category Modal -->
      <div class="modal fade" id="addCategoryModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <form @submit.prevent="submitCategory">
              <div class="modal-header">
                <h5>Add category</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="mb-3">
                  <label class="form-label">Category: </label>
                  <input type="text" class="form-control" placeholder="Enter category here..." v-model="newCategory">
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Save</button>
              </div>
            </form>
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
import CategoryTable from '@/components/Admin/CategoryTable'
import Pagination from '@/components/Partials/Pagination'
import { mapGetters, mapActions } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'AdminCategories',
  components: {
    OffCanvas, Navbar, Sidebar, CategoryTable, Pagination
  },
  data() {
    return {
      url: 'api/categories/paginate/10',
      newCategory: ''
    }
  },
  computed: {
    ...mapGetters(['categories', 'categoryLinks', 'category'])
  },
  methods: {
    ...mapActions(['fetchCategories', 'addCategory']), 

    submitCategory() {
      if(this.newCategory == "" || this.newCategory == " ") {
        Swal.fire({ title: 'Please add some category', icon: 'warning' })
      } else {
        this.addCategory({ category: this.newCategory})
      }
    }
  },
  created() {
    this.fetchCategories(this.url)
  }
}
</script>

<style scoped>
  .table-container {
    padding: 0px;
    text-align: center;
  }
  .table-container table {
    margin-bottom: 0px;
  }
</style>