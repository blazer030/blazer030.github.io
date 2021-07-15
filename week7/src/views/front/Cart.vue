<template>
  <div class="container my-5">
    <loading :active="isLoading" />
    <!-- 購物車列表 -->
    <div class="text-end">
      <button
        class="btn btn-outline-danger"
        type="button"
        @click="deleteAllCart"
        :disabled="cart.carts?.length === 0"
      >
        清空購物車
      </button>
    </div>
    <table class="table align-middle">
      <thead>
        <tr>
          <th></th>
          <th>品名</th>
          <th style="width: 150px">數量/單位</th>
          <th class="text-end">單價</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cart.carts" :key="item.id">
          <td>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="deleteCart(item)"
              :disabled="loadingStatus.deleteItem === item.id"
            >
              <i class="fas fa-spinner fa-pulse" v-if="loadingStatus.deleteItem === item.id"></i>
              x
            </button>
          </td>
          <td>{{ item.product.title }}</td>
          <td>
            <div class="input-group input-group-sm">
              <div class="input-group mb-3">
                <input
                  type="number"
                  min="1"
                  @blur="updateCart(item)"
                  v-model.number="item.qty"
                  :disabled="loadingStatus.loadingItem === item.id"
                  class="form-control"
                />
                <span class="input-group-text" id="basic_addon2">{{ item.product.unit }}</span>
              </div>
            </div>
          </td>
          <td class="text-end">
            {{ item.final_total }}
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-end">總計</td>
          <td class="text-end">{{ cart.final_total }}</td>
        </tr>
      </tfoot>
    </table>
    <div class="my-5 row justify-content-center">
      <Form v-slot="{ errors }" ref="form" class="col-md-6" @submit="submitOrder">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <Field
            id="email"
            name="信箱"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['信箱'] }"
            placeholder="請輸入Email"
            rules="email|required"
            v-model="form.user.email"
          ></Field>
          <ErrorMessage name="信箱" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <Field
            id="name"
            name="收件人姓名"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['收件人姓名'] }"
            placeholder="請輸入收件人姓名"
            rules="required"
            v-model="form.user.name"
          ></Field>
          <ErrorMessage name="收件人姓名" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <Field
            id="tel"
            name="收件人電話"
            type="tel"
            class="form-control"
            :class="{ 'is-invalid': errors['收件人電話'] }"
            placeholder="請輸入收件人電話"
            rules="min:8|required"
            v-model="form.user.tel"
          ></Field>
          <ErrorMessage name="收件人電話" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <Field
            id="address"
            name="收件人地址"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['收件人地址'] }"
            placeholder="請輸入收件人地址"
            rules="required"
            v-model="form.user.address"
          ></Field>
          <ErrorMessage name="收件人地址" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea
            name=""
            id="message"
            class="form-control"
            cols="30"
            rows="10"
            v-model="form.message"
          ></textarea>
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-danger" :disabled="cart.carts?.length === 0">
            送出訂單
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: {},
      form: {
        user: {},
        message: '',
      },
      isLoading: false,
      loadingStatus: {
        loadingItem: '',
        deleteItem: '',
      },
    };
  },
  methods: {
    getCart() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_PATH}/cart`;
      this.$http.get(url).then((response) => {
        if (response.data.success) {
          this.cart = response.data.data;
        }
        this.isLoading = false;
      });
    },
    updateCart(item) {
      if (item.qty > 0) {
        this.loadingStatus.loadingItem = item.id;
        const url = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_PATH}/cart/${item.id}`;
        const cart = {
          product_id: item.product.id,
          qty: item.qty,
        };
        this.$http.put(url, { data: cart }).then((response) => {
          this.loadingStatus.loadingItem = '';
          if (response.data.success) {
            this.getCart();
          }
        });
      } else {
        this.$moshaToast('數量不可以小於1', {
          type: 'danger',
          showIcon: true,
          position: 'bottom-right',
        });
      }
    },
    deleteCart(item) {
      this.loadingStatus.deleteItem = item.id;
      const url = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_PATH}/cart/${item.id}`;
      this.$http.delete(url).then((response) => {
        this.loadingStatus.deleteItem = '';
        if (response.data.success) {
          this.getCart();
        }
      });
    },
    deleteAllCart() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_PATH}/carts`;
      this.$http.delete(url).then((response) => {
        if (response.data.success) {
          this.getCart();
        } else {
          this.$moshaToast(response.data.message, {
            type: 'danger',
            showIcon: true,
            position: 'bottom-right',
          });
          this.isLoading = false;
        }
      });
    },
    submitOrder() {
      const url = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_PATH}/order`;
      const order = this.form;
      this.isProcessing = true;
      this.$http.post(url, { data: order }).then((response) => {
        this.isProcessing = false;
        if (response.data.success) {
          this.$moshaToast(response.data.message, {
            type: 'success',
            showIcon: true,
            position: 'bottom-right',
          });
          this.resetForm();
          this.getCart();
        } else {
          this.$moshaToast(response.data.message, {
            type: 'danger',
            showIcon: true,
            position: 'bottom-right',
          });
        }
      });
    },
    resetForm() {
      this.form.message = '';
      this.$refs.form.resetForm();
    },
  },
  created() {
    this.getCart();
  },
};
</script>
