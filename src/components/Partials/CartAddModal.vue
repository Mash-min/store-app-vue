<template>
  <div class="modal fade" id="addToCartModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add to cart</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="preview">
            <button class="btn btn-sm btn-outline-dark disabled ms-1">
              <span class="fw-bolder">Quantity:</span> {{ newCart.quantity }} pcs
            </button>
            <button 
              class="btn btn-sm btn-outline-dark ms-1 disabled" 
              v-for="variant in newCart.variants" 
              :key="variant">
              <i class="fa fa-chevron-right"></i> {{ variant.name }}
            </button>
          </div>
          <hr>
          <div class="input-group mb-3">
            <button class="btn btn-outline-secondary" type="button" @click="newCart.quantity += 1">
              <i class="fa fa-plus"></i>
            </button>
            <input type="text" class="form-control" disabled readonly v-model="newCart.quantity">
            <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="newCart.quantity -= 1">
              <i class="fa fa-minus"></i>
            </button>
          </div>
          <div class="variant-container">
            <div 
              v-for="variant in product.variants" 
              :key="variant.id" 
              class="mb-2 mt-3">
              <span class="fw-bolder">{{ variant.title }}</span><br>
              <button 
                class="btn btn-sm btn-outline-dark m-1" 
                v-for="(item) in variant.items" 
                :key="item.id"
                @click="addVariant({ 
                    id: item.id, 
                    name: item.name, 
                    variant_id: item.variant_id })">
                {{ item.name }}
              </button>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-sm btn-outline-danger" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-sm btn-outline-primary" @click="submitCart">Add to cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
 
export default {
  name: 'AddCartModal',
  props: ['product'],
  computed: {
    ...mapGetters(['newCart'])
  },
  methods: {
    ...mapActions(['addToCart']),

    submitCart() {
      let items = []
      this.newCart.variants.forEach(variant => {
        items.push(variant.id)
      })
      let payload = {
        quantity: this.newCart.quantity,
        product_id: this.product.id,
        variants: items
      }
      this.addToCart(payload)
    },

    addVariant(payload) {
      this.newCart.variants.push(payload)
      let data = Object.values(this.newCart.variants.reduce((acc, cur) => Object.assign(acc, {[cur.variant_id]: cur}), {}))
      this.newCart.variants = data
    }
  }
}
</script>