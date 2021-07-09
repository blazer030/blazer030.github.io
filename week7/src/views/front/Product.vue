<template>
  <div class="container my-5">
    <loading :active="isLoading" />
    <div class="row">
      <div class="col-sm-12 col-md-5 text-center">
        <img :src="this.product.imageUrl" class="img-fluid h400" />
      </div>
      <div class="col-sm-12 col-md-7">
        <h1>{{ this.product.title }}</h1>
        <p>{{ this.product.content }}</p>
      </div>
    </div>
    <div class="line_button mt-5">
      <router-link to="/products" class="btn btn-primary"
        ><i class="fa fa-chevron-left"></i>&nbsp;返回</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {},
      isLoading: false,
    };
  },
  methods: {
    getProduct() {
      this.isLoading = true;
      const { id } = this.$route.params;
      const url = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_PATH}/product/${id}`;
      this.$http.get(url).then((response) => {
        if (response.data.success) {
          this.product = response.data.product;
          this.isLoading = false;
        }
      });
    },
  },
  created() {
    this.getProduct();
  },
};
</script>
