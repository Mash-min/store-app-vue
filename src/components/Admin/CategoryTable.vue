<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <!-- <th>ID</th> -->
          <th>Date added</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, index) in categories" :key="category.id">
          <td>{{ category.category }}</td>
          <!-- <td>{{ category.slug }}</td> -->
          <td>{{ category.created_at }}</td>
          <td>
            <button class="btn btn-sm btn-outline-success ms-1" @click="findCategory(category.id)" data-bs-toggle="modal" data-bs-target="#editCategoryModal">
              <i class="fa fa-pencil"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger ms-1" @click="deleteCategory({ id:category.id, index})">
              <i class="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Edit Category Modal -->
    <div class="modal fade" id="editCategoryModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit.prevent="submitCategory">
            <div class="modal-header">
              <h5>Edit category</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <input type="text" class="form-control" placeholder="Enter category here..." v-model="category.category">
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
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'CategoryTable',
  props: ['categories'],
  methods: {
    ...mapActions(['deleteCategory', 'findCategory', 'updateCategory']),

    submitCategory() {
      this.updateCategory({ category: this.category, index: this.category.id})
    }
  },
  computed: {
    ...mapGetters(['category'])
  }
}
</script>