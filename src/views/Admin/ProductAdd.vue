<template>
  <OffCanvas />
  <!-- OFF CANVAS -->
  <div class="row">
    <Navbar/>
    <div class="col-lg-3">
      <Sidebar/>
    </div>
    <div class="col-lg-9 col-md-12 mt-2">
      <div class="row">
        <div class="col-md-12">
          <ul class="list-group m-1 mb-5">
            <li class="list-group-item">
              <div class="mb-3">
                <small class="text-muted">Name:</small>
                <input type="text" class="form-control" placeholder="Enter product name..." v-model="product.name">
              </div>
            </li>
            <li class="list-group-item">
              <div class="mb-3">
                <small class="text-muted">Description:</small>
                <textarea class="form-control" cols="30" rows="8" placeholder="Enter product description" v-model="product.description"></textarea>
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
                  <input type="number" class="form-control" placeholder="Enter product price..." v-model="product.price">
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
              <p>
                <button class="btn btn-sm btn-outline-success" type="button" data-bs-toggle="collapse" data-bs-target="#categoryCollapse" aria-expanded="false" aria-controls="collapseExample">
                  Choose product category <i class="fa fa-chevron-down"></i>
                </button>
              </p>
              <div class="collapse" id="categoryCollapse">
                <ul class="list-group">
                  <li class="list-group-item" v-for="category in categories" :key="category.id">
                    <input class="form-check-input me-1" type="checkbox" v-bind:value="category.category" v-model="categoryArray">
                    {{ category.category }}
                  </li>
                  <li class="list-group-item">
                    <button class="btn btn-sm btn-outline-success" 
                      @click="loadMoreCategories(nextPageUrl)"
                      v-bind:class="{ 'disabled btn-outline-dark' : nextPageUrl == null }">
                      Load more categories
                    </button>
                  </li>
                </ul>
              </div>
            </li>
            <li class="list-group-item">
              <div class="mb-3">
                <small class="text-muted">Tags: </small>
                <input class="form-control" placeholder="Enter project tags"
                  v-model="tagInput"
                  @keypress.prevent.enter="submitTag" >
              </div>
              <div class="chip-container">
                <div class="chip" 
                  v-for="(chip, i) of tagChips" 
                  :key="chip.id">
                  {{chip}}
                  <i class="fa fa-times" @click="deleteTagChip(i)"></i>
                </div>
              </div>
            </li>
            <li class="list-group-item">
              <small class="text-muted">Product variants:</small>
            </li>
            <li class="list-group-item">
              <div class="col-md-4">
                <div class="d-grid">
                  <button class="btn btn-sm btn-outline-primary" type="submit" @click="submitProduct">
                    Save product
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OffCanvas from '@/components/Admin/OffCanvas'
import Navbar from '@/components/Admin/Navbar'
import Sidebar from '@/components/Admin/Sidebar'
import { mapGetters,  mapActions } from 'vuex'
 
export default {
  name: 'ProductAdd',
  components: {
    OffCanvas, Navbar, Sidebar
  },
  data() {
    return {
      product: {
        name: '',
        description: '',
        price: '',
        stock: '',
        shipping_fee: '',
        user_id: 1,
      },
      images: [],
      tagInput: '',
      categoryArray: [],
      categoryUrl: 'api/categories/paginate/5'
    }
  },
  computed: {
    ...mapGetters([
      'categories', 
      'nextPageUrl', 
      'tagChips',
      'currentTag'])
  },
  methods: {
    ...mapActions([
      'addProduct', 
      'loadMoreCategories',
      'fetchCategories', 
      'addTagChip',
      'deleteTagChip']),

    submitTag() {
      this.addTagChip(this.tagInput)
      this.tagInput = ''
    },

    deleteCategoryChip(index) {
      this.categoryChips.splice(index, 1)
    },

    handleFile(e) {
      this.images = e.target.files
    },

    submitProduct() {
      let payload = {
        product: this.product,
        images: [...this.images],
        categories: [...this.categoryArray],
        tags: [...this.tagChips],
      }
      this.addProduct(payload)
      // console.log(payload)
    }
  },
  created() {
    this.fetchCategories(this.categoryUrl)
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
  .modal-footer button {
    width: 100%;
  }
</style>