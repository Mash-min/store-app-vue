<template>
  <div class="modal fade" id="addProductVariantModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add variant - ({{ product.name }})</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-6 p-1">
              <ul class="list-group">
                <li class="list-group-item">
                  <div class="mb-3">
                    <label class="form-label text-muted">Variant Name (ex. Color, Size)</label>
                    <input type="text" class="form-control" placeholder="Enter variant name" v-model="variant.name">
                  </div>
                  <div class="mb-3">
                    <label class="form-label text-muted">Variant Item (ex. Red, Blue, Green)</label>
                    <form @submit.prevent="addVariantItem">
                      <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Enter variant item" v-model="variantItem">
                        <button class="btn btn-outline-success" type="submit">Add item</button>
                      </div>
                    </form>
                  </div>
                </li>
                <li class="list-group-item">
                  <small class="text-muted">Items:</small>
                  <ul class="list-group">
                    <li class="list-group-item position-relative" v-for="(item, i) in variant.items" :key="item.id">
                      {{ item }} 
                      <button type="button" 
                        class="btn-close position-absolute top-50 end-0 translate-middle-y mx-3" 
                        aria-label="Close"
                        @click="removeVariantItem(i)">
                      </button>
                    </li>
                  </ul>
                </li>
                <li class="list-group-item">
                  <div class="d-grid">
                    <button class="btn btn-sm btn-success" @click="addVariant">
                      Add Variant
                    </button>
                  </div>
                </li>
              </ul>

            </div>
            <div class="col-md-6 p-1">
              <ul class="list-group">
                <li class="list-group-item"><h5>Variants: {{ variants.length }}</h5></li>
                <li class="list-group-item" v-for="(variant, i) in variants" :key="variant.id">
                  <p class="m-1">{{ variant.name }}</p> 
                  <button class="btn btn-sm btn-outline-dark ms-1 disabled" v-for="item in variant.items" :key="item.id">{{ item }}</button>
                  <button type="button" 
                    class="btn-close position-absolute top-50 end-0 translate-middle-y mx-3" 
                    aria-label="Close"
                    @click="removeVariant(i)">
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-sm btn-primary" data-bs-dismiss="modal" @click="submitVariants">Save Variants</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'ProductAddVariant',
  computed: {
    ...mapGetters(['product'])
  },
  data() {
    return {
      variants: [],
      variant: {
        name: '',
        items: []
      },
      variantItem: ''
    }
  },
  methods: {
    ...mapActions(['addVariants']),
    // Add variant item
    addVariantItem() {
      if(!this.variantItem == '') {
        this.variant.items.push(this.variantItem)
        this.variantItem = ''
      }
    },
    // Remove variant item
    removeVariantItem(index) {
      this.variant.items.splice(index, 1)
    },
    // Add variant to list
    addVariant() {
      if(this.variant.name == '') {
        Swal.fire("Variant name is required")
      }else if (this.variant.items.length == 0) {
        Swal.fire("Please some variant item")
      }else {
        const payload = {
          name: this.variant.name,
          items: [...this.variant.items]
        }
        this.variants.push(payload)
        this.variant.name = ''
        this.variant.items = []
      }
    },
    // Remove variant from list
    removeVariant(index) {
      this.variants.splice(index, 1)
    },
    // Submit variants
    submitVariants() {
      const payload = {
        product_id: this.product.id,
        variants: this.variants
      }
      if(payload.variants.length == 0) {
        Swal.fire("Please add some variants")
      }else {
        this.addVariants(payload)
        // console.log(payload)
      }
    }
  }
}
</script>