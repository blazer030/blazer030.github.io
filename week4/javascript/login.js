const apiUrl = "https://vue3-course-api.hexschool.io";

const app = {
    data() {
        return  {
            username: '',
            password: ''
        }
    },
    methods: {
        login() {
            let errorCount = 0;
            if (!this.username) {
                alertify.error('請輸入帳號');
                errorCount++;
            }
            if (!this.password) {
                alertify.error('請輸入密碼');
                errorCount++;
            }

            if (errorCount == 0) {
                const user = {
                    username: this.username,
                    password: this.password
                }
                axios.post(`${apiUrl}/admin/signin`, user)
                .then((response) => {
                    if (response.data.success) {
                        const { token, expired } = response.data;
                        document.cookie = `hexToken=${token};expires=${new Date(expired)}`;
                        window.location = 'products.html';
                    } else {
                        alertify.error(response.data.message);
                    }
                }).catch((error) => {
                    console.log(error);
                    //alertify.error('網路連線錯誤！');
                });
            }
        },
        checkLogin() {
            //取得Token
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        
            //確認是否登入
            axios.defaults.headers.common['Authorization'] = token;
            axios.post(`${apiUrl}/api/user/check`)
            .then((response) => {
                if (response.data.success) {
                    window.location = 'products.html';
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    },
    created() {
        this.checkLogin();
    }
}

Vue.createApp(app)
.mount("#app");