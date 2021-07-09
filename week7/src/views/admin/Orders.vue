<template>
  <div class="container-fluid">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">訂單管理</h1>
    </div>

    <div class="row">
      <div class="col-lg-12">
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">訂單列表</h6>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table mt-4">
                <thead>
                  <tr>
                    <th width="20%" class="text-center">訂單編號</th>
                    <th width="15%">收件人姓名</th>
                    <th width="15%">收件人信箱</th>
                    <th width="10%" class="text-end">金額</th>
                    <th width="10%" class="text-center">付款狀態</th>
                    <th width="8%" class="text-center">編輯</th>
                    <th width="8%" class="text-center">刪除</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="order in orderList" :key="order.id">
                    <td class="text-center">
                      {{ order.create_at }}
                    </td>
                    <td>
                      {{ order.user.name }}
                    </td>
                    <td>
                      {{ order.user.email }}
                    </td>
                    <td class="text-end">
                      {{ order.total }}
                    </td>
                    <td class="text-center">
                      <span
                        class="badge pointer"
                        :class="order.is_paid ? 'bg-success' : 'bg-secondary'"
                        style="font-size:1em;"
                        @click="paidChange(order)"
                      >
                        {{ order.is_paid ? '已付款' : '未付款' }}
                      </span>
                    </td>
                    <td class="text-center">
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-success move"
                        @click="openModal('update', order)"
                      >
                        編輯
                      </button>
                    </td>
                    <td class="text-center">
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-danger move"
                        @click="openModal('delete', order)"
                      >
                        刪除
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="text-center">
              <p>
                目前有 <span id="productCount">{{ orderList.length }}</span> 筆訂單
              </p>
            </div>
            <pagination :page-info="pageInfo" @page-change="getOrder"></pagination>
          </div>
        </div>
      </div>
    </div>
    <order-modal :order="tempOrder" @modify-order="modifyOrder" ref="orderModal"></order-modal>
    <delete-modal :item="tempOrder" @confirm="deleteOrder" ref="deleteModal"></delete-modal>
  </div>
</template>

<script>
import pagination from '@/components/admin/pagination.vue';
import orderModal from '@/components/admin/orderModal.vue';
import deleteModal from '@/components/admin/deleteModal.vue';

export default {
  data() {
    return {
      orderList: [],
      tempOrder: {
        user: {},
        products: [],
      },
      pageInfo: {
        total_pages: 1,
        current_page: 1,
        has_pre: false,
        has_next: false,
      },
    };
  },
  components: {
    pagination,
    orderModal,
    deleteModal,
  },
  methods: {
    checkLogin() {
      this.$http
        .post(`${process.env.VUE_APP_API_URL}/api/user/check`)
        .then((response) => {
          if (response.data.success) {
            this.getOrder();
          } else {
            this.$router.push('/admin');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getOrder(page = 1) {
      this.$http
        .get(
          `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_PATH}/admin/orders?page=${page}`,
        )
        .then((response) => {
          if (response.data.success) {
            this.orderList = response.data.orders;
            this.pageInfo = response.data.pagination;
          } else {
            this.$moshaToast(response.data.message, {
              type: 'danger',
              showIcon: true,
              position: 'bottom-right',
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openModal(action, order) {
      switch (action) {
        case 'update':
          this.tempOrder = JSON.parse(JSON.stringify(order));
          this.$refs.orderModal.openModal();
          break;
        case 'delete':
          this.tempOrder = JSON.parse(JSON.stringify(order));
          this.tempOrder.title = `訂單編號：${order.create_at}`;
          this.$refs.deleteModal.openModal();
          break;
        default:
          break;
      }
    },
    modifyOrder() {
      let errorCount = 0;

      if (!this.tempOrder.user) {
        errorCount += 1;
        this.$moshaToast('請填寫收件人資訊', {
          type: 'danger',
          showIcon: true,
          position: 'bottom-right',
        });
      } else {
        if (!this.tempOrder.user.email) {
          errorCount += 1;
          setTimeout(() => {
            this.$moshaToast('請填寫Email', {
              type: 'danger',
              showIcon: true,
              position: 'bottom-right',
            });
          }, 1);
        }

        if (!this.tempOrder.user.name) {
          errorCount += 1;
          setTimeout(() => {
            this.$moshaToast('請填寫收件人名稱', {
              type: 'danger',
              showIcon: true,
              position: 'bottom-right',
            });
          }, 1);
        }

        if (!this.tempOrder.user.tel) {
          errorCount += 1;
          setTimeout(() => {
            this.$moshaToast('請填寫收件人電話', {
              type: 'danger',
              showIcon: true,
              position: 'bottom-right',
            });
          }, 1);
        }

        if (!this.tempOrder.user.address) {
          errorCount += 1;
          setTimeout(() => {
            this.$moshaToast('請填寫收件人地址', {
              type: 'danger',
              showIcon: true,
              position: 'bottom-right',
            });
          }, 1);
        }
      }

      if (errorCount === 0) {
        const order = {
          data: {
            user: this.tempOrder.user,
            is_paid: this.tempOrder.is_paid,
          },
        };
        this.editOrder(this.tempOrder.id, order, () => {
          this.$refs.orderModal.hideModal();
        });
      }
    },
    paidChange(order) {
      const updateOrder = {
        data: {
          is_paid: !order.is_paid,
        },
      };
      this.editOrder(order.id, updateOrder);
    },
    editOrder(orderId, order, callback) {
      this.$http
        .put(
          `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_PATH}/admin/order/${orderId}`,
          order,
        )
        .then((response) => {
          if (response.data.success) {
            this.$moshaToast(response.data.message, {
              type: 'success',
              showIcon: true,
              position: 'bottom-right',
            });
            this.getOrder();
          } else {
            this.$moshaToast(response.data.message, {
              type: 'danger',
              showIcon: true,
              position: 'bottom-right',
            });
          }

          if (callback) {
            callback();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteOrder(orderId) {
      this.$http
        .delete(
          `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_PATH}/admin/order/${orderId}`,
        )
        .then((response) => {
          if (response.data.success) {
            this.$refs.deleteModal.hideModal();
            this.$moshaToast(response.data.message, {
              type: 'success',
              showIcon: true,
              position: 'bottom-right',
            });
            this.getOrder();
          } else {
            this.$moshaToast(response.data.message, {
              type: 'danger',
              showIcon: true,
              position: 'bottom-right',
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    // 取得Token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = token;
    this.checkLogin();
  },
};
</script>
