<template>
  <div class="container-fluid">
    <loading :active="isLoading"/>
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800"><i class="fas fa-gift"></i> 商品管理</h1>
    </div>

    <div class="row">
      <div class="col-lg-12">
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">商品列表</h6>
          </div>
          <div class="card-body">
            <button type="button" class="btn btn-sm btn-success" @click="openModal('add')">
              新增商品
            </button>

            <div class="table-responsive">
              <table class="table mt-4">
                <thead>
                  <tr>
                    <th width="10%">分類</th>
                    <th width="34%">商品名稱</th>
                    <th width="10%" class="text-center">單位</th>
                    <th width="10%" class="text-end">原價</th>
                    <th width="10%" class="text-end">售價</th>
                    <th width="10%" class="text-center">是否啟用</th>
                    <th width="8%" class="text-center">編輯</th>
                    <th width="8%" class="text-center">刪除</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="product in productList" :key="product.id">
                    <td>
                      {{ product.category }}
                    </td>
                    <td>
                      {{ product.title }}
                    </td>
                    <td class="text-center">
                      {{ product.unit }}
                    </td>
                    <td class="text-end">
                      {{ product.origin_price }}
                    </td>
                    <td class="text-end">
                      {{ product.price }}
                    </td>
                    <td class="text-center">
                      <span
                        class="badge pointer"
                        :class="product.is_enabled ? 'bg-success' : 'bg-secondary'"
                        style="font-size:1em;"
                        @click="enableChange(product)"
                      >
                        {{ product.is_enabled ? 'ON' : 'OFF' }}
                      </span>
                    </td>
                    <td class="text-center">
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-success move"
                        @click="openModal('update', product)"
                      >
                        編輯
                      </button>
                    </td>
                    <td class="text-center">
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-danger move"
                        @click="openModal('delete', product)"
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
                目前有 <span id="productCount">{{ productList.length }}</span> 項商品
              </p>
            </div>
            <pagination :page-info="pageInfo" @page-change="getProduct"></pagination>
          </div>
        </div>
      </div>
    </div>
    <product-modal
      :product="tempProduct"
      :title="productModalTitle"
      @modify-product="modifyProduct"
      @upload-image="uploadImage"
      ref="productModal"
    ></product-modal>
    <delete-modal :item="tempProduct" @confirm="deleteProduct" ref="deleteModal"></delete-modal>
  </div>
</template>

<script>
import pagination from '@/components/admin/pagination.vue';
import productModal from '@/components/admin/productModal.vue';
import deleteModal from '@/components/admin/deleteModal.vue';

export default {
  data() {
    return {
      isLoading: false,
      updateId: -1,
      productList: [],
      tempProduct: {
        imagesUrl: [],
      },
      pageInfo: {
        total_pages: 1,
        current_page: 1,
        has_pre: false,
        has_next: false,
      },
      productModalTitle: '新增商品',
    };
  },
  components: {
    pagination,
    productModal,
    deleteModal,
  },
  methods: {
    getProduct(page = 1) {
      this.isLoading = true;
      this.$http
        .get(
          `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_PATH}/admin/products?page=${page}`,
        )
        .then((response) => {
          if (response.data.success) {
            this.productList = response.data.products;
            this.pageInfo = response.data.pagination;
          } else {
            this.$moshaToast(response.data.message, {
              type: 'danger',
              showIcon: true,
              position: 'bottom-right',
            });
          }
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openModal(action, product) {
      switch (action) {
        case 'add':
        case 'update':
          if (product) {
            this.productModalTitle = '修改商品';
            this.tempProduct = { ...product };
            if (!this.tempProduct.imagesUrl) {
              this.tempProduct.imagesUrl = [];
            } else {
              this.tempProduct.imagesUrl = [...product.imagesUrl];
            }
          } else {
            this.updateId = -1;
            this.productModalTitle = '新增商品';
            this.tempProduct = {
              title: '',
              category: '',
              unit: '',
              origin_price: 0,
              price: 0,
              description: '',
              content: '',
              is_enabled: 1,
              imageUrl: '',
              imagesUrl: [],
            };
          }
          this.$refs.productModal.openModal();
          break;
        case 'delete':
          this.tempProduct = { ...product };
          if (!this.tempProduct.imagesUrl) {
            this.tempProduct.imagesUrl = [];
          } else {
            this.tempProduct.imagesUrl = [...product.imagesUrl];
          }
          this.$refs.deleteModal.openModal();
          break;
        default:
          break;
      }
    },
    modifyProduct() {
      let errorCount = 0;
      if (this.tempProduct.title === '') {
        setTimeout(() => {
          this.$moshaToast('請輸入商品標題', {
            type: 'danger',
            showIcon: true,
            position: 'bottom-right',
          });
        }, 1);
        errorCount += 1;
      }

      if (this.tempProduct.category === '') {
        setTimeout(() => {
          this.$moshaToast('請輸入分類', {
            type: 'danger',
            showIcon: true,
            position: 'bottom-right',
          });
        }, 1);
        errorCount += 1;
      }

      if (this.tempProduct.unit === '') {
        setTimeout(() => {
          this.$moshaToast('請輸入單位', {
            type: 'danger',
            showIcon: true,
            position: 'bottom-right',
          });
        }, 1);
        errorCount += 1;
      }

      if (this.tempProduct.origin_price === '') {
        setTimeout(() => {
          this.$moshaToast('請輸入原價', {
            type: 'danger',
            showIcon: true,
            position: 'bottom-right',
          });
        }, 1);
        errorCount += 1;
      }

      if (this.tempProduct.price === '') {
        setTimeout(() => {
          this.$moshaToast('請輸入售價', {
            type: 'danger',
            showIcon: true,
            position: 'bottom-right',
          });
        }, 1);
        errorCount += 1;
      }

      if (errorCount === 0) {
        const product = {
          data: {
            title: this.tempProduct.title.trim(),
            category: this.tempProduct.category.trim(),
            unit: this.tempProduct.unit.trim(),
            origin_price: parseInt(this.tempProduct.origin_price, 10) || 0,
            price: parseInt(this.tempProduct.price, 10) || 0,
            description: this.tempProduct.description.trim(),
            content: this.tempProduct.content.trim(),
            is_enabled: this.tempProduct.is_enabled,
            imageUrl: this.tempProduct.imageUrl,
            imagesUrl: this.tempProduct.imagesUrl,
          },
        };
        if (this.tempProduct.id) {
          this.editProduct(this.tempProduct.id, product, () => {
            this.$refs.productModal.hideModal();
          });
        } else {
          this.addProduct(product, () => {
            this.$refs.productModal.hideModal();
          });
        }
      }
    },
    enableChange(product) {
      const updateProduct = {
        data: {
          title: product.title,
          category: product.category,
          unit: product.unit,
          origin_price: product.origin_price,
          price: product.price,
          is_enabled: 1 - product.is_enabled,
        },
      };
      this.editProduct(product.id, updateProduct);
    },
    addProduct(product, callback) {
      this.isLoading = true;
      this.$http
        .post(
          `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_PATH}/admin/product`,
          product,
        )
        .then((response) => {
          if (response.data.success) {
            this.$moshaToast(response.data.message, {
              type: 'success',
              showIcon: true,
              position: 'bottom-right',
            });
            this.getProduct();
          } else {
            this.$moshaToast(response.data.message, {
              type: 'danger',
              showIcon: true,
              position: 'bottom-right',
            });
            this.isLoading = false;
          }

          if (callback) {
            callback();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editProduct(productId, product, callback) {
      this.isLoading = true;
      this.$http
        .put(
          `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_PATH}/admin/product/${productId}`,
          product,
        )
        .then((response) => {
          if (response.data.success) {
            this.$moshaToast(response.data.message, {
              type: 'success',
              showIcon: true,
              position: 'bottom-right',
            });
            this.getProduct();
          } else {
            this.$moshaToast(response.data.message, {
              type: 'danger',
              showIcon: true,
              position: 'bottom-right',
            });
            this.isLoading = false;
          }

          if (callback) {
            callback();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteProduct(productId) {
      this.isLoading = true;
      this.$http
        .delete(
          `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_PATH}/admin/product/${productId}`,
        )
        .then((response) => {
          if (response.data.success) {
            this.$refs.deleteModal.hideModal();
            this.$moshaToast(response.data.message, {
              type: 'success',
              showIcon: true,
              position: 'bottom-right',
            });
            this.getProduct();
          } else {
            this.$moshaToast(response.data.message, {
              type: 'danger',
              showIcon: true,
              position: 'bottom-right',
            });
            this.isLoading = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    uploadImage(file) {
      const formData = new FormData();
      formData.append('file-to-upload', file);
      this.$http
        .post(`${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_PATH}/admin/upload`, formData)
        .then((response) => {
          if (response.data.success) {
            this.$moshaToast('上傳成功', {
              type: 'success',
              showIcon: true,
              position: 'bottom-right',
            });
            this.tempProduct.imageUrl = response.data.imageUrl;
          } else {
            this.$moshaToast(response.data.message, {
              type: 'danger',
              showIcon: true,
              position: 'bottom-right',
            });
          }
        });
    },
  },
  created() {
    this.getProduct();
  },
};
</script>
