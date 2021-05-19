const apiUrl = "https://vue3-course-api.hexschool.io";

const account = document.querySelector('#account');
const password = document.querySelector('#password');
const loginBtn = document.querySelector('#loginBtn');

function login() {
    const user = {
        username: account.value,
        password: password.value
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
        alertify.error('網路連線錯誤！');
    });
}
loginBtn.addEventListener('click', login);

function checkLogin() {
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

checkLogin();