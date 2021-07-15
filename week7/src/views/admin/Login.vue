<template>
  <div class="bg-gradient-primary" style="height: 100vh">
    <div class="container">
      <!-- Outer Row -->
      <div class="row justify-content-center">
        <div class="col-xl-6 col-lg-6 col-md-6">
          <div class="card o-hidden border-0 shadow-lg login-form">
            <div class="card-body p-0">
              <!-- Nested Row within Card Body -->
              <div class="row">
                <div class="col-lg-12">
                  <div class="p-5">
                    <div class="text-center">
                      <h1 class="h4 text-gray-900 mb-4">請先登入</h1>
                    </div>
                    <form class="user">
                      <div class="mb-3">
                        <input
                          class="form-control py-3"
                          placeholder="帳號"
                          id="account"
                          type="email"
                          v-model="username"
                        />
                      </div>
                      <div class="mb-3">
                        <input
                          class="form-control py-3"
                          placeholder="密碼"
                          id="password"
                          type="password"
                          v-model="password"
                        />
                      </div>
                      <div class="d-grid">
                        <button
                          type="button"
                          class="btn btn-primary py-3"
                          id="loginBtn"
                          @click="login"
                        >
                          登入
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      let errorCount = 0;
      if (!this.username) {
        setTimeout(() => {
          this.$moshaToast('請輸入帳號', {
            type: 'danger',
            showIcon: true,
            position: 'bottom-right',
          });
        }, 1);
        errorCount += 1;
      }
      if (!this.password) {
        setTimeout(() => {
          this.$moshaToast('請輸入密碼', {
            type: 'danger',
            showIcon: true,
            position: 'bottom-right',
          });
        }, 1);
        errorCount += 1;
      }

      if (errorCount === 0) {
        const user = {
          username: this.username,
          password: this.password,
        };
        this.$http
          .post(`${process.env.VUE_APP_API_URL}/admin/signin`, user)
          .then((response) => {
            if (response.data.success) {
              const { token, expired } = response.data;
              document.cookie = `hexToken=${token};expires=${new Date(expired)}`;
              this.$router.push('/admin/products');
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
      }
    },
    checkLogin() {
      // 取得Token
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      if (token) {
        // 確認是否登入
        this.$http.defaults.headers.common.Authorization = token;
        this.$http
          .post(`${process.env.VUE_APP_API_URL}/api/user/check`)
          .then((response) => {
            if (response.data.success) {
              this.$router.push('/admin/products');
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  created() {
    this.checkLogin();
  },
};
</script>

<style lang="scss" scoped>
.login-form {
  margin-top: 300px;
}
</style>
