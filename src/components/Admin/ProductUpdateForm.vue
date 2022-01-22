<template>
  <div class="modal fade" id="editProductModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <form @submit.prevent="submitProduct">
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit product</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <ul class="list-group">
              <li class="list-group-item">
                <div class="mb-3">
                  <label>Name:</label>
                  <input type="text" class="form-control" v-model="product.name">
                </div>
              </li>
              <li class="list-group-item">
                <div class="mb-3">
                  <label>Description:</label>
                  <textarea cols="30" rows="8" class="form-control" v-model="product.description"></textarea>
                </div>
              </li>
              <li class="list-group-item">
                <small class="text-muted">Product image:</small>
                <div class="input-group mb-3">
                  <label class="input-group-text" for="inputGroupFile01"><i class="fa fa-image"></i></label>
                  <input type="file" class="form-control" id="inputGroupFile01" multiple @change="handleFile">
                </div>
              </li>
              <li class="list-group-item">
                <div class="row">
                  <div class="mb-3 col-md-4 p-1">
                    <small class="text-muted">Price:</small>
                    <input type="text" class="form-control" placeholder="Enter product price..." v-model="product.price">
                  </div>
                  <div class="mb-3 col-md-4 p-1">
                    <small class="text-muted">Shipping fee:</small>
                    <input type="number" class="form-control" placeholder="Enter product shipping fee..." v-model="product.shipping_fee">
                  </div>
                  <div class="mb-3 col-md-4 p-1">
                    <small class="text-muted">Stock:</small>
                    <input type="number" class="form-control" placeholder="Enter product stock..." v-model="product.stock">
                  </div>
                </div>
              </li>
              <li class="list-group-item">
                <button class="btn btn-sm btn-outline-primary mb-3" 
                type="button" 
                data-bs-target="#editCategoryModal" 
                data-bs-toggle="modal"
                @click="fetchCategories(categoryUrl)">
                  Add Category
                </button>
                <div class="chip-container">
                  <div class="chip" v-for="(chip, i) of product.categories" :key="chip.id">
                    {{chip.category}}
                    <i class="fa fa-times" @click="deleteCategoryChip(i)"></i>
                  </div>
                </div>
              </li>
              <li class="list-group-item">
                <div class="mb-3">
                  <label class="form-label">Tags: </label>
                  <input v-model="tagInput" @keypress.prevent.enter="addTagChip" class="form-control" placeholder="Enter project tags">
                </div>
                <div class="chip-container">
                  <div class="chip" v-for="(chip, i) of product.tags" :key="chip.label">
                    {{chip.tag}}
                    <i class="fa fa-times" @click="deleteTagChip(i)"></i>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Save</button>
          </div>
        </div>
      </div>
    </form>
  </div>
  
  <div class="modal fade" id="editCategoryModal" data-bs-backdrop="static" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalToggleLabel2">Choose Category</h5>
        </div>
        <div class="modal-body">
          <div class="modal-body">
            <ul class="list-group">
              <li class="list-group-item" v-for="category in categories" :key="category.id">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" v-bind:value="category.category" v-model="editCategoryChips">
                  <label class="form-check-label" for="flexCheckDefault">
                    {{ category.category }}
                  </label>
                </div>
              </li>
              <li class="list-group-item">
                <div class="d-grid">
                  <button class="btn btn-sm btn-outline-success"
                    @click="loadMoreCategories(nextPageUrl)"
                    v-bind:class="{ 'disabled' : nextPageUrl == null }">
                    <i class="fa fa-chevron-down"></i>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-sm btn-outline-danger" data-bs-target="#editProductModal" data-bs-toggle="modal">Cancel</button>
          <button class="btn btn-sm btn-outline-success" data-bs-target="#editProductModal" data-bs-toggle="modal" @click="saveCategories">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProductUpdateForm',
  computed: {
    ...mapGetters([
      'product', 
      'categories',
      'nextPageUrl'])
  },
  data() {
    return {
      tagChips: [],
      categoryChips: [],
      tagInput: '',
      categoryUrl: 'api/categories/paginate/5',
      editCategoryChips: []
    }
  }, 

  methods: {
    ...mapActions(['updateProduct', 'fetchCategories', 'loadMoreCategories']),

    deleteCategoryChip(index) {
      this.product.categories.splice(index, 1)
    },

    deleteTagChip(index) {
      this.product.tags.splice(index, 1)
    },

    addTagChip() {
      if(this.tagInput != '') {
        this.product.tags.push({ tag: this.tagInput})
        this.tagInput = ''
      }
    },

    saveCategories() {
      this.product.categories = []
      console.log(this.editCategoryChips)
      this.editCategoryChips.forEach(category => {
        this.product.categories.push({ category: category })
      })
      this.editCategoryChips = []
    },

    submitProduct() {
      let payload = {
        product: this.product,
        tags: this.product.tags.map(product => product.tag),
        categories: this.product.categories.map(category => category.category)
      }
      // console.log(payload)
      this.updateProduct(payload)
    }
  }
}
</script>

<style scoped>
  .chip-container {
    min-height: 34px;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
  }
  .chip-container .chip {
    margin: 4px;
    background: #e0e0e0;
    padding: 5px 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
    align-items: center;
  }
  .chip-container .chip i {
    cursor: pointer;
    opacity: 0.56;
    margin-left: 8px;
}
</style>