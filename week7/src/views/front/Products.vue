<template>
  <div class="container my-5">
    <loading :active="isLoading"/>
    <div class="row">
      <div class="col-lg-2 col-md-3">
        <ul class="list-group rounded-0" v-if="false">
          <li class="list-group-item active" aria-current="true">商品類別(無作用)</li>
          <li class="list-group-item">商品類別(無作用)</li>
          <li class="list-group-item">商品類別(無作用)</li>
          <li class="list-group-item">商品類別(無作用)</li>
          <li class="list-group-item">商品類別(無作用)</li>
        </ul>
      </div>
      <div class="col-lg-10 col-md-9">
        <div class="row">
          <div class="col-lg-4 col-sm-6 mb-4" v-for="product in products" :key="product.id">
            <div class="card product_grid">
              <router-link class="product_link" :to="`/product/${product.id}`">
                <img :src="product.imageUrl" class="card-img-top h400" :alt="product.title" />
              </router-link>
              <div class="card-body">
                <h5 class="card-title">{{ product.title }}</h5>
                <p class="card-text">{{ product.description }}</p>
                <div class="text-right mb-3">{{ product.price }} 元</div>
                <button
                  type="button"
                  class="btn btn-outline-primary btn_add_to_cart"
                  @click="addToCart(product.id, 1)"
                  :disabled="loadingStatus.loadingItem === product.id"
                >
                  <i
                    class="fas fa-spinner fa-pulse"
                    v-if="loadingStatus.loadingItem === product.id"
                  ></i>
                  <i class="fa fa-cart-plus" v-if="loadingStatus.loadingItem !== product.id"></i>
                  加到購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      isLoading: false,
      loadingStatus: {
        loadingItem: '',
      },
    };
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_PATH}/products`;
      this.$http.get(url).then((response) => {
        if (response.data.success) {
          this.products = response.data.products;
        }
        this.isLoading = false;
      });
    },
    addToCart(id, qty = 1) {
      this.loadingStatus.loadingItem = id;
      const url = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_PATH}/cart`;
      const postData = {
        product_id: id,
        qty,
      };
      this.$http.post(url, { data: postData }).then((response) => {
        this.loadingStatus.loadingItem = '';
        this.$moshaToast(response.data.message, {
          type: response.data.success ? 'success' : 'danger',
          showIcon: true,
          position: 'bottom-right',
        });
      });
    },
    goToPage(id) {
      this.$router.push(`/product/${id}`);
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
