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
        <ProductTabs 
          v-bind:tab="'add-product'"/>
        <div class="col-md-12">
          <!-- =============== Product images ============== -->
          <ul class="list-group m-1 mb-3">
            <li class="list-group-item">
              <small class="text-muted">Product image:</small>
              <div class="input-group mb-3">
                <label class="input-group-text" for="inputGroupFile01"><i class="fa fa-image"></i></label>
                <input type="file" class="form-control" id="inputGroupFile01" multiple @change="handleFile">
              </div>
            </li>
          </ul>
          <!-- =============== Product details ============== -->
          <ul class="list-group m-1 mb-3">
            <li class="list-group-item">
              <div class="mb-3">
                <small class="text-muted">Name:</small>
                <input 
                  :class="{ 'is-invalid' : productErrors.name }"
                  type="text" 
                  class="form-control" 
                  placeholder="Enter product name..." 
                  v-model="newProduct.name">
                <div class="invalid-feedback">
                  Please provide product name.
                </div>
              </div>
            </li>
            <li class="list-group-item">
              <div class="mb-3">
                <small class="text-muted">Description:</small>
                <textarea 
                  :class="{ 'is-invalid' : productErrors.description }"
                  class="form-control" 
                  cols="30" rows="8" 
                  placeholder="Enter product description" 
                  v-model="newProduct.description"></textarea>
                <div class="invalid-feedback">
                  Please provide product description.
                </div>
              </div>
            </li>
            <li class="list-group-item">
              <div class="row">
                <div class="mb-3 col-md-4 p-1">
                  <small class="text-muted">Price:</small>
                  <input 
                    :class="{ 'is-invalid' : productErrors.price }"
                    type="number" 
                    class="form-control" 
                    placeholder="Enter product price..." 
                    v-model="newProduct.price">
                  <div class="invalid-feedback">
                    Please provide product price.
                  </div>
                </div>
                <div class="mb-3 col-md-4 p-1">
                  <small class="text-muted">Shipping fee:</small>
                  <input 
                    :class="{ 'is-invalid' : productErrors.shipping_fee }"
                    type="number" 
                    class="form-control" 
                    placeholder="Enter product shipping fee..." 
                    v-model="newProduct.shipping_fee">
                  <div class="invalid-feedback">
                    Please provide product shipping fee.
                  </div>
                </div>
                <div class="mb-3 col-md-4 p-1">
                  <small class="text-muted">Stock:</small>
                  <input 
                    :class="{ 'is-invalid' : productErrors.stock }"
                    type="number" 
                    class="form-control" 
                    placeholder="Enter product stock..." 
                    v-model="newProduct.stock">
                  <div class="invalid-feedback">
                    Please provide product stock.
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <!-- =============== Product categories ============== -->
          <ul class="list-group m-1 mb-3">
            <li class="list-group-item">
              <small class="text-muted">Categories: </small>
              <div class="row">
                <div 
                  class="col-md-6 p-1"
                  v-for="category in categories" 
                  :key="category.id">
                  <div class="card">
                    <div class="card-body">
                      <div class="d-flex justify-content-between">
                        <span class="text-muted"><i class="fa fa-chevron-right"></i> {{ category.category }}</span>
                        <input 
                          class="form-check-input me-1" 
                          type="checkbox" 
                          v-bind:value="category.category" 
                          v-model="categoryArray">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="p-1 d-flex justify-content-center">
                <button class="btn btn-sm btn-outline-success" 
                  @click="loadMoreCategories(nextPageUrl)"
                  v-bind:class="{ 'disabled btn-outline-dark' : nextPageUrl == null }">
                  Load more categories <i class="fa fa-chevron-down"></i>
                </button>
              </div>
            </li>
          </ul>
          <!-- =============== Product details ============== -->
          <ul class="list-group m-1 mb-3">
            <li class="list-group-item">
              <div class="mb-3">
                <small class="text-muted">Tags: </small>
                <input class="form-control" placeholder="Enter project tags"
                  v-model="tagInput"
                  @keypress.prevent.enter="submitTag" >
              </div>
              <div class="chip-container">
                <div 
                  class="chip" 
                  v-for="(chip, i) of tagChips" 
                  :key="chip.id">
                  {{chip}}
                  <i class="fa fa-times" @click="deleteTagChip(i)"></i>
                </div>
              </div>
            </li>
          </ul>
          <!-- =============== Product variants ============== -->
          <ul class="list-group m-1 mb-3">
            <li class="list-group-item">
              <small class="text-muted">Variants:</small>
              <div class="row">
                <div class="col-md-6 p-1">
                  <div class="mb-3">
                    <small class="text-muted">Variant name (ex. Size, Color)</small>
                    <input type="text" class="form-control" placeholder="Enter variant name..." v-model="variant.name">
                  </div>
                  <div class="mb-3">
                    <form @submit.prevent="submitItem">
                      <small class="text-muted">Variant items (ex. Small, Medium, Large)</small>
                      <input type="text" class="form-control" placeholder="Enter variant item..." v-model="variantItem">
                    </form>
                  </div>
                  <div class="d-grid mb-3">
                    <button 
                      class="btn btn-sm btn-outline-success"
                      @click="addVariant">
                      <i class="fa fa-plus"></i> Add variant
                    </button>
                  </div>
                  <hr>
                  <div class="variant-i">
                    <div 
                      class="card p-2 mb-1" 
                      v-for="(item, index) in variant.items" 
                      :key="item">
                      <div class="d-flex justify-content-between">
                        <span class="text-muted"><i class="fa fa-chevron-right"></i> {{ item }}</span>
                        <button 
                          type="button" 
                          class="btn-close"
                          @click="removeItem(index)">
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 p-1">
                  <div 
                    class="list-group mb-1" 
                    v-for="(variant, index) in variants" 
                    :key="variant">
                    <a class="list-group-item list-group-item-action">
                      <div class="d-flex justify-content-between">
                        <small class="mb-1 text-muted fw-bolder">{{ variant.name }}</small>
                        <button 
                          type="button" 
                          class="btn-close"
                          @click="removeVariant(index)">
                        </button>
                      </div>
                      <small 
                        class="m-1 p-1 bg-secondary text-white rounded-3"
                        v-for="item in variant.items"
                        :key="item">
                        {{ item }}
                      </small>
                    </a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <!-- =============== Submit product ============== -->
          <div class="col-md-4 offset-md-4 m-1">
            <div class="d-grid">
              <button class="btn btn-lg btn-outline-success mb-3" @click="submitProduct">
                <i class="fa fa-save"></i> Save Product
              </button>
            </div>
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
import ProductTabs from '@/components/Admin/ProductTabs'
import { mapGetters,  mapActions } from 'vuex'
 
export default {
  name: 'ProductAdd',
  components: {
    OffCanvas, 
    Navbar, 
    Sidebar, 
    ProductTabs
  },
  data() {
    return {
      images: [],
      tagInput: '',
      categoryArray: [],
      categoryUrl: 'api/categories/paginate/6',
      variants: [],
      variant: {
        name: '',
        items: []
      },
      variantItem: ''
    }
  },
  computed: {
    ...mapGetters([
      'categories', 
      'nextPageUrl', 
      'tagChips',
      'currentTag',
      'newProduct',
      'productErrors'])
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

    submitItem() {
      this.variant.items.push(this.variantItem)
      this.variantItem = ''
    },

    removeItem(index) {
      this.variant.items.splice(index, 1)
    },

    removeVariant(index) {
      this.variants.splice(index, 1)
    },

    addVariant() {
      const payload = {
        name: this.variant.name,
        items: this.variant.items
      }
      this.variants.push(payload)
      this.variant.name = "",
      this.variant.items = []
    },

    submitProduct() {
      let payload = {
        product: this.newProduct,
        images: [...this.images],
        categories: [...this.categoryArray],
        tags: [...this.tagChips],
        variants: [...this.variants]
      }
      this.addProduct(payload)
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
  .card-body {
    padding: 2px 5px 2px 5px;
  }
</style>