<template>
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="productModalLabel">{{ title }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="imageUrl" class="form-label">主要圖片</label>
                <button
                  type="button"
                  class="btn btn-sm btn-success ms-2"
                  @click="$refs.fileInput.click()"
                >
                  上傳圖片
                  <input
                    type="file"
                    class="form-control"
                    id="imageFile"
                    @change="uploadImage"
                    ref="fileInput"
                    accept="image/png, image/gif, image/jpeg"
                    style="display:none;"
                  />
                </button>
                <input
                  id="imageUrl"
                  type="text"
                  class="form-control"
                  placeholder="請輸入圖片連結"
                  v-model="productInfo.imageUrl"
                />
                <img class="img-fluid" :src="productInfo.imageUrl" />
              </div>
              <div class="mb-1">多圖新增</div>
              <div v-for="(imageUrl, index) in productInfo.imagesUrl" :key="index">
                <div class="mb-3">
                  <label :for="'imagesUrl' + index" class="form-label"
                    >圖片網址{{ index + 1 }}</label
                  >
                  <input
                    :id="'imagesUrl' + index"
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                    v-model="productInfo.imagesUrl[index]"
                  />
                  <img class="img-fluid" :src="productInfo.imagesUrl[index]" />
                  <button
                    class="btn btn-outline-danger btn-sm d-block w-100"
                    @click="productInfo.imagesUrl.splice(index, 1)"
                  >
                    刪除圖片
                  </button>
                </div>
                <div></div>
              </div>
              <div style="padding-top:5px;" v-if="productInfo.imagesUrl?.length < 5">
                <button
                  class="btn btn-outline-primary btn-sm d-block w-100"
                  @click="productInfo.imagesUrl.push('')"
                >
                  新增圖片
                </button>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="name" class="form-label"
                  >商品標題<span class="text-red">&nbsp;*</span></label
                >
                <input
                  id="name"
                  type="text"
                  class="form-control"
                  placeholder="請輸入商品標題"
                  v-model="productInfo.title"
                />
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label"
                    >分類<span class="text-red">&nbsp;*</span></label
                  >
                  <input
                    id="category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入商品類型"
                    v-model="productInfo.category"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="unit" class="form-label"
                    >單位<span class="text-red">&nbsp;*</span></label
                  >
                  <input
                    id="unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                    v-model="productInfo.unit"
                  />
                </div>
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="originPrice" class="form-label"
                    >原價<span class="text-red">&nbsp;*</span></label
                  >
                  <input
                    id="originPrice"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入原價"
                    v-model="productInfo.origin_price"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label"
                    >售價<span class="text-red">&nbsp;*</span></label
                  >
                  <input
                    id="price"
                    min="0"
                    type="number"
                    class="form-control"
                    placeholder="請輸入售價"
                    v-model="productInfo.price"
                  />
                </div>
              </div>
              <hr />
              <div class="mb-3">
                <label for="description" class="form-label">商品描述</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入商品描述"
                  v-model="productInfo.description"
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="productContent" class="form-label">說明內容</label>
                <textarea
                  id="productContent"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                  v-model="productInfo.content"
                ></textarea>
              </div>
              <div class="mb-3">
                <input
                  id="is_enabled"
                  class="form-check-inpout"
                  type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  v-model="productInfo.is_enabled"
                />
                <label class="corm-check-label" for="is_enabled">是否啟用</label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            關閉
          </button>
          <button type="button" class="btn btn-primary" @click="$emit('modify-product')">
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
      productInfo: {},
    };
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
    title: {
      type: String,
      default() {
        return '';
      },
    },
  },
  methods: {
    uploadImage() {
      const file = this.$refs.fileInput.files[0];
      this.$emit('upload-image', file);
    },
    openModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
  },
  watch: {
    product() {
      this.productInfo = this.product;
      if (!this.productInfo.imagesUrl) {
        this.productInfo.imagesUrl = [];
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
