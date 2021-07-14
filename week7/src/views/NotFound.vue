<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <router-link class="navbar-brand" to="/">TreeLife</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/products">產品列表</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/cart">購物車</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div id="notfound">
      <div class="notfound">
        <div class="notfound-404">
          <h3>Oops! Page not found</h3>
          <h1><span>4</span><span>0</span><span>4</span></h1>
        </div>
        <h2>we are sorry, but the page you requested was not found</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
  #notfound {
    position: relative;
    height: 100vh;
  }

  #notfound .notfound {
    position: absolute;
    left: 50%;
    top: 40%;
    -webkit-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
  }

  .notfound {
    max-width: 520px;
    width: 100%;
    line-height: 1.4;
    text-align: center;
  }

  .notfound .notfound-404 {
    position: relative;
    height: 240px;
  }
  .notfound .notfound-404 h3 {
    font-family: cabin,sans-serif;
    position: relative;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    color: #262626;
    margin: 0;
    letter-spacing: 3px;
    padding-left: 6px;
  }

  .notfound .notfound-404 h1 {
    font-family: montserrat,sans-serif;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    font-size: 252px;
    font-weight: 900;
    margin: 0;
    color: #262626;
    text-transform: uppercase;
    letter-spacing: -40px;
    margin-left: -20px;
  }

  .notfound .notfound-404 h1>span {
    text-shadow: -8px 0 0 #fff;
  }

  .notfound h2 {
    font-family: cabin,sans-serif;
    font-size: 20px;
    font-weight: 400;
    text-transform: uppercase;
    color: #000;
    margin-top: 0;
    margin-bottom: 25px;
  }
</style>
