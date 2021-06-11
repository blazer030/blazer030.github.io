export default {
    props: ['productInfo', 'title'],
    methods: {
		uploadImage() {
			const file = this.$refs.fileInput.files[0];
            this.$emit('upload-image', file);
		}
    },
    template: `
    <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="productModalLabel">{{title}}</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="imageUrl">主要圖片</label>
                                <button type="button" class="btn btn-sm btn-success" @click="$refs.fileInput.click()">
                                    上傳圖片
                                    <input type="file" class="form-control" id="imageFile" @change="uploadImage" ref="fileInput" accept="image/png, image/gif, image/jpeg" style="display:none;">
                                </button>
                                <input id="imageUrl" type="text" class="form-control" placeholder="請輸入圖片連結" v-model="productInfo.imageUrl">
                                <img class="img-fluid" :src="productInfo.imageUrl">
                            </div>
                            <div class="mb-1">多圖新增</div>
                            <div v-for="(imageUrl, index) in productInfo.imagesUrl" :key="index">
                                <div class="form-group">
                                    <label :for="'imagesUrl' + index">圖片網址{{index + 1}}</label>
                                    <input :id="'imagesUrl' + index" type="text" class="form-control" placeholder="請輸入圖片連結" v-model="productInfo.imagesUrl[index]">
                                    <img class="img-fluid" :src="productInfo.imagesUrl[index]">
                                    <button class="btn btn-outline-danger btn-sm d-block w-100" @click="productInfo.imagesUrl.splice(index, 1)"> 刪除圖片 </button>
                                </div>
                                <div>
                                </div>
                            </div>
                            <div style="padding-top:5px;" v-if="productInfo.imagesUrl.length < 5">
                                <button class="btn btn-outline-primary btn-sm d-block w-100" @click="productInfo.imagesUrl.push('')"> 新增圖片 </button>
                            </div>
                        </div>
                        <div class="col-sm-8">
                            <div class="form-group">
                                <label for="name">商品標題</label>
                                <input id="name" type="text" class="form-control" placeholder="請輸入商品標題" v-model="productInfo.title">
                            </div>
                            <div class="row">
                                <div class="form-group col-md-6">
                                    <label for="category">分類</label>
                                    <input id="category" type="text" class="form-control" placeholder="請輸入商品類型" v-model="productInfo.category">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="unit">單位</label>
                                    <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model="productInfo.unit">
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-md-6">
                                    <label for="originPrice">原價</label>
                                    <input id="originPrice" type="number" min="0" class="form-control" placeholder="請輸入原價" v-model="productInfo.origin_price">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="price">售價</label>
                                    <input id="price" min="0" type="number" class="form-control" placeholder="請輸入售價" v-model="productInfo.price">
                                </div>
                            </div>
                            <hr>
                            <div class="form-group">
                                <label for="description">商品描述</label>
                                <textarea id="description" type="text" class="form-control" placeholder="請輸入商品描述" v-model="productInfo.description"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="productContent">說明內容</label>
                                <textarea id="productContent" type="text" class="form-control" placeholder="請輸入說明內容" v-model="productInfo.content"></textarea>
                            </div>
                            <div class="form-group">
                                <input id="is_enabled" class="form-check-inpout" type="checkbox" :true-value="1" :false-value="0" v-model="productInfo.is_enabled">
                                <label class="corm-check-label" for="is_enabled">是否啟用</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
                    <button type="button" class="btn btn-primary" @click="$emit('modify-product')">送出</button>
                </div>
            </div>
        </div>
    </div>
    `
}