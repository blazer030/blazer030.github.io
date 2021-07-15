<template>
  <div
    class="modal fade"
    id="orderModal"
    tabindex="-1"
    aria-labelledby="orderModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="orderModalLabel">更新訂單資訊</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-12">
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="name" class="form-label">訂單編號</label>
                  <input
                    id="name"
                    type="text"
                    class="form-control"
                    v-model="orderInfo.create_at"
                    disabled
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <div class="mb-2">付款狀態</div>
                  <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                    <input
                      type="radio"
                      class="btn-check"
                      name="btnradio"
                      id="is_paid"
                      autocomplete="off"
                      :checked="orderInfo.is_paid"
                      @click="orderInfo.is_paid = true"
                    />
                    <label class="btn btn-outline-success" for="is_paid">已付款</label>

                    <input
                      type="radio"
                      class="btn-check"
                      name="btnradio"
                      id="not_paid"
                      autocomplete="off"
                      :checked="!orderInfo.is_paid"
                      @click="orderInfo.is_paid = false"
                    />
                    <label class="btn btn-outline-secondary" for="not_paid">尚未付款</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="userEmail" class="form-label"
                    >Email<span class="text-red">&nbsp;*</span></label
                  >
                  <input
                    id="userEmail"
                    type="email"
                    class="form-control"
                    placeholder="請輸入Email"
                    v-model="orderInfo.user.email"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="userName" class="form-label"
                    >收件人名稱<span class="text-red">&nbsp;*</span></label
                  >
                  <input
                    id="userName"
                    type="text"
                    class="form-control"
                    placeholder="請輸入收件人名稱"
                    v-model="orderInfo.user.name"
                  />
                </div>
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="userTel" class="form-label"
                    >收件人電話<span class="text-red">&nbsp;*</span></label
                  >
                  <input
                    id="userTel"
                    type="tel"
                    class="form-control"
                    placeholder="請輸入收件人電話"
                    v-model="orderInfo.user.tel"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="userAddress" class="form-label"
                    >收件人地址<span class="text-red">&nbsp;*</span></label
                  >
                  <input
                    id="userAddress"
                    type="text"
                    class="form-control"
                    placeholder="請輸入收件人地址"
                    v-model="orderInfo.user.address"
                  />
                </div>
              </div>
              <div class="mb-3">
                <label for="message" class="form-label">留言</label>
                <textarea
                  id="message"
                  type="text"
                  class="form-control"
                  v-model="orderInfo.message"
                  disabled
                ></textarea>
              </div>
              <hr />
              <div class="table-responsive">
                商品明細
                <table class="table product-list">
                  <thead>
                    <tr>
                      <th width="10%" class="text-center">商品圖片</th>
                      <th width="15%">品名</th>
                      <th width="15%">數量</th>
                      <th width="10%" class="text-end">單價</th>
                      <th width="10%" class="text-end">總價</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(product, id) in orderInfo.products" :key="id">
                      <td class="text-center">
                        <img :src="product.product.imageUrl" :alt="product.product.title" />
                      </td>
                      <td>
                        {{ product.product.title }}
                      </td>
                      <td>
                        {{ product.qty }}
                      </td>
                      <td class="text-end">
                        {{ product.product.price }}
                      </td>
                      <td class="text-end">
                        {{ product.total }}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="4" class="text-end">總計</td>
                      <td class="text-end">{{ orderInfo.total }}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            關閉
          </button>
          <button type="button" class="btn btn-primary" @click="$emit('modify-order')">
            送出
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  data() {
    return {
      modal: '',
      orderInfo: {
        user: {},
        products: {},
      },
    };
  },
  props: {
    order: {
      type: Object,
      default() {
        return {
          user: {},
          products: {},
        };
      },
    },
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
  },
  watch: {
    order() {
      this.orderInfo = this.order;
      if (!this.orderInfo.user) {
        this.orderInfo.user = {};
      }

      if (!this.order.products) {
        this.orderInfo.products = {};
      }
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal, {
      keyboard: false,
    });
  },
};
</script>

<style lang="scss" scoped>
.product-list {
  img {
    max-height: 60px;
  }

  td {
    vertical-align: middle;
  }
}
</style>
