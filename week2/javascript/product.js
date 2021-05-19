const app = {
	data: {
		apiUrl: "https://vue3-course-api.hexschool.io",
		apiPath: "ethan",
		updateId: -1,
		productList: []
	},

	checkLogin() {
		axios.post(`${this.data.apiUrl}/api/user/check`)
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
		axios.post(`${this.data.apiUrl}/logout`)
		.then((response) => {
			if (response.data.success) {
				window.location = 'index.html';
			}
		}).catch((error) => {
			console.log(error);
			//window.location = 'index.html';
		});
	},
	getProduct() {
		axios.get(`${this.data.apiUrl}/api/${this.data.apiPath}/admin/products`)
		.then((response) => {
			if (response.data.success) {
				this.data.productList = response.data.products;
				this.renderProduct();
			} else {
				alertify.error(response.data.message);
			}
		}).catch((error) => {
			console.log(error);
			//window.location = 'index.html';
		});
	},
	renderProduct() {
		const productTable = document.getElementById('productTable');
		const productCount = document.getElementById('productCount');

		let productListHtml = '';
		this.data.productList.forEach((product, index) => {
		  productListHtml += `
		  <tr>
			<td>
				${product.title}
			</td>
			<td width="150">
				${product.category}
			</td>
			<td width="150" class="text-center">
			  	${product.unit}
			</td>
			<td width="150" class="text-right">
			  	${product.origin_price}
			</td>
			<td width="150" class="text-right">
			  	${product.price}
			</td>
			<td width="150" class="text-center">
				<a href="javascript:void(0);" class="badge ${ product.is_enabled ? 'badge-success': 'badge-secondary' }" style="font-size:1em;" data-action="status" data-id="${ index }">${ product.is_enabled ? 'ON' : 'OFF' }</a>
			</td>
			<td width="120" class="text-center">
				<button type="button" class="btn btn-sm btn-outline-success move" data-action="edit" data-id="${index}"> 編輯 </button>
			</td>
			<td width="120" class="text-center">
				<button type="button" class="btn btn-sm btn-outline-danger move" data-action="remove" data-id="${index}"> 刪除 </button>
			</td>
		  </tr>
		  `;
		});
		productTable.innerHTML = productListHtml;
		productCount.textContent = this.data.productList.length;
	},
	openProductModal(product) {		
		const productModalLabel = document.getElementById('productModalLabel');
		const categoryInput = document.getElementById('category');
		const unitInput = document.getElementById('unit');
		const nameInput = document.getElementById('name');
		const originPriceInput = document.getElementById('originPrice');
		const priceInput = document.getElementById('price');

		if (product) {
			this.data.updateId = product.id;
			productModalLabel.innerHTML = '修改商品';
			nameInput.value = product.title;
			categoryInput.value = product.category;
			unitInput.value = product.unit;
			originPriceInput.value = product.origin_price;
			priceInput.value = product.price;
		} else {
			this.data.updateId = -1;
			productModalLabel.innerHTML = '新增商品';
			nameInput.value = '';
			categoryInput.value = '';
			unitInput.value = '';
			originPriceInput.value = '0';
			priceInput.value = '0';
		}
		$("#productModal").modal('show');
	},
	addProduct(product, callback) {
		axios.post(`${this.data.apiUrl}/api/${this.data.apiPath}/admin/product`, product)
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
		axios.put(`${this.data.apiUrl}/api/${this.data.apiPath}/admin/product/${productId}`, product)
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
		axios.delete(`${this.data.apiUrl}/api/${this.data.apiPath}/admin/product/${productId}`)
		.then((response) => {
			if (response.data.success) {
				alertify.success(response.data.message);
				this.getProduct();
			} else {
				alertify.error(response.data.message);
			}
		}).catch((error) => {
			console.log(error);
		});
	},
	modifyProduct() {
		const nameInput = document.getElementById('name');
		const categoryInput = document.getElementById('category');
		const unitInput = document.getElementById('unit');
		const originPriceInput = document.getElementById('originPrice');
		const priceInput = document.getElementById('price');

		let errorCount = 0;
		if (nameInput.value == '') {
			alertify.error('請輸入產品標題');
			errorCount++;
		}

		if (categoryInput.value == '') {
			alertify.error('請輸入商品類型');
			errorCount++;
		}
		
		if (unitInput.value == '') {
			alertify.error('請輸入單位');
			errorCount++;
		}
		
		if (originPriceInput.value == '') {
			alertify.error('請輸入原價');
			errorCount++;
		}
		
		if (priceInput.value == '') {
			alertify.error('請輸入售價');
			errorCount++;
		}
		
		if (errorCount == 0) {
			if (this.data.updateId == -1) {
				const product = {
					data: {
						title: nameInput.value.trim(),
						category: categoryInput.value.trim(),
						unit: unitInput.value.trim(),
						origin_price: parseInt(originPriceInput.value) || 0,
						price: parseInt(priceInput.value) || 0,
						is_enabled: 1
					}
				};

				this.addProduct(product, () => {
					$("#productModal").modal('toggle');
				});
			} else {
				const product = {
					data: {
						title: nameInput.value.trim(),
						category: categoryInput.value.trim(),
						unit: unitInput.value.trim(),
						origin_price: parseInt(originPriceInput.value) || 0,
						price: parseInt(priceInput.value) || 0
					}
				};

				this.editProduct(this.data.updateId, product, () => {
					$("#productModal").modal('toggle');
				});
			}
		}
	},
	editProductEvent(e) {
		const action = e.target.dataset.action;
		const index = e.target.dataset.id;
		switch (action) {
			case 'status':
				const productData = this.data.productList[index];
				const product = {
					data: {
						title: productData.title,
						category: productData.category,
						unit: productData.unit,
						origin_price: productData.origin_price,
						price: productData.origin_price,
						is_enabled: 1 - productData.is_enabled
					}
				};

				this.editProduct(productData.id, product);
				break;
			case 'edit':
				this.openProductModal(this.data.productList[index]);
				break;
			case 'remove':
				const productId = this.data.productList[index].id;
				this.deleteProduct(productId);
				break;
		}
	},

	created() {
		const openModalBtn = document.getElementById('openModal');
		const productTable = document.getElementById('productTable');
		const submitBtn = document.getElementById('submit');
		const logoutBtn = document.getElementById('logout');
		//設定監聽
		openModalBtn.addEventListener('click', () => {
			updateIndex = -1;
			this.openProductModal();
		});
		submitBtn.addEventListener('click', () => {
			this.modifyProduct();
		});
		productTable.addEventListener('click', (e) => {
			this.editProductEvent(e);
		});
		logoutBtn.addEventListener('click', (e) => {
			this.logout();
		});

		//取得Token
		const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		axios.defaults.headers.common['Authorization'] = token;
		this.checkLogin();
	}
}

app.created();