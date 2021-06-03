const app = {
	data() {
		return {
			apiUrl: "https://vue3-course-api.hexschool.io",
			apiPath: "ethan",
			updateId: -1,
			productList: [],
			tempProduct: {
				imagesUrl: []
			},
			productModalTitle: '新增商品'
		}
	},
	methods: {
		checkLogin() {
			axios.post(`${this.apiUrl}/api/user/check`)
			.then((response) => {
				if (response.data.success) {
					this.getProduct();
				} else {
					window.location = 'index.html';
				}
			}).catch((error) => {
				console.log(error);
				//window.location = 'index.html';
			});
		},
		logout() {
			axios.post(`${this.apiUrl}/logout`)
			.then((response) => {
				if (response.data.success) {
					document.cookie = 'hexToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
					window.location = 'index.html';
				}
			}).catch((error) => {
				console.log(error);
				//window.location = 'index.html';
			});
		},
		getProduct() {
			axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products`)
			.then((response) => {
				if (response.data.success) {
					this.productList = response.data.products;
				} else {
					alertify.error(response.data.message);
				}
			}).catch((error) => {
				console.log(error);
				//window.location = 'index.html';
			});
		},
		openModal(action, product) {
			switch(action) {
				case 'add':
				case 'update':
					if (product) {
						this.productModalTitle = '修改商品';
						this.tempProduct = {...product};
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
							imagesUrl: []
						}
					}
					$("#productModal").modal('show');
					break;
				case 'delete':
					this.tempProduct = {...product};
					if (!this.tempProduct.imagesUrl) {
						this.tempProduct.imagesUrl = [];
					} else {
						this.tempProduct.imagesUrl = [...product.imagesUrl];
					}
					$("#deleteModal").modal('show');
					break;
			}
		},
		modifyProduct() {	
			let errorCount = 0;
			if (this.tempProduct.title == '') {
				alertify.error('請輸入商品標題');
				errorCount++;
			}
	
			if (this.tempProduct.category == '') {
				alertify.error('請輸入分類');
				errorCount++;
			}
			
			if (this.tempProduct.unit == '') {
				alertify.error('請輸入單位');
				errorCount++;
			}
			
			if (this.tempProduct.origin_price == '') {
				alertify.error('請輸入原價');
				errorCount++;
			}
			
			if (this.tempProduct.price == '') {
				alertify.error('請輸入售價');
				errorCount++;
			}
			
			if (errorCount == 0) {
				const product = {
					data: {
						title: this.tempProduct.title.trim(),
						category: this.tempProduct.category.trim(),
						unit: this.tempProduct.unit.trim(),
						origin_price: parseInt(this.tempProduct.origin_price) || 0,
						price: parseInt(this.tempProduct.price) || 0,
						description: this.tempProduct.description.trim(),
						content: this.tempProduct.content.trim(),
						is_enabled: this.tempProduct.is_enabled,
						imageUrl: this.tempProduct.imageUrl,
						imagesUrl: this.tempProduct.imagesUrl
					}
				};
				if (this.tempProduct.id) {
					this.editProduct(this.tempProduct.id, product, () => {
						$("#productModal").modal('toggle');
					});
				} else {
					this.addProduct(product, () => {
						$("#productModal").modal('toggle');
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
					is_enabled: 1 - product.is_enabled
				}
			};
			this.editProduct(product.id, updateProduct);
		},
		addProduct(product, callback) {
			axios.post(`${this.apiUrl}/api/${this.apiPath}/admin/product`, product)
			.then((response) => {
				if (response.data.success) {
					alertify.success(response.data.message);
					this.getProduct();
				} else {
					alertify.error(response.data.message);
				}
	
				if (callback) {
					callback();
				}
			}).catch((error) => {
				console.log(error);
			});
		},
		editProduct(productId, product, callback) {
			axios.put(`${this.apiUrl}/api/${this.apiPath}/admin/product/${productId}`, product)
			.then((response) => {
				if (response.data.success) {
					alertify.success(response.data.message);
					this.getProduct();
				} else {
					alertify.error(response.data.message);
				}
	
				if (callback) {
					callback();
				}
			}).catch((error) => {
				console.log(error);
			});
		},
		deleteProduct(productId) {
			axios.delete(`${this.apiUrl}/api/${this.apiPath}/admin/product/${productId}`)
			.then((response) => {
				if (response.data.success) {
					alertify.success(response.data.message);
					$("#deleteModal").modal('toggle');
					this.getProduct();
				} else {
					alertify.error(response.data.message);
				}
			}).catch((error) => {
				console.log(error);
			});
		}
	},
	created() {
		//取得Token
		const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		axios.defaults.headers.common['Authorization'] = token;
		this.checkLogin();
	}
}

Vue.createApp(app)
.mount('#app');