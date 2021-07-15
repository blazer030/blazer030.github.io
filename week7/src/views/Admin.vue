<template>
  <div class="sb-admin-2">
    <div id="wrapper">
      <!-- Sidebar -->
      <ul
        class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <!-- Sidebar - Brand -->
        <router-link
          class="sidebar-brand d-flex align-items-center justify-content-center"
          to="/admin/products"
        >
          <div class="sidebar-brand-icon rotate-n-15">
            <i class="fas fa-laugh-wink"></i>
          </div>
          <div class="sidebar-brand-text mx-3">My Admin</div>
        </router-link>

        <!-- Divider -->
        <hr class="sidebar-divider my-0" />

        <!-- Nav Item - Dashboard -->
        <li
          v-for="menu in menuList"
          :key="menu.id"
          class="nav-item"
          :class="menu.active ? 'active' : ''"
        >
          <router-link :to="menu.path" class="nav-link">
            <i :class="menu.icon"></i>
            <span class="ms-1">{{ menu.name }}</span>
          </router-link>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider d-none d-md-block" />

        <!-- Sidebar Toggler (Sidebar) -->
        <div class="text-center d-none d-md-inline">
          <button class="rounded-circle border-0" id="sidebarToggle"></button>
        </div>
      </ul>
      <!-- End of Sidebar -->

      <!-- Content Wrapper -->
      <div id="content-wrapper" class="d-flex flex-column">
        <!-- Main Content -->
        <div id="content">
          <!-- Topbar -->
          <nav
            class="
              navbar navbar-expand navbar-light
              bg-white
              topbar
              mb-4
              static-top
              shadow
              px-3
            "
          >
            <!-- Sidebar Toggle (Topbar) -->
            <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle me-3">
              <i class="fa fa-bars"></i>
            </button>

            <router-link class="btn btn-outline-primary" to="/">
              <i class="fas fa-home"></i> 網頁首頁
            </router-link>
            <!-- Topbar Navbar -->
            <ul class="navbar-nav ms-auto">
              <!-- Nav Item - User Information -->
              <li class="nav-item dropdown no-arrow">
                <a
                  class="nav-link dropdown-toggle"
                  href="javascript:void(0);"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span class="me-2 d-none d-lg-inline text-gray-600 small">使用者</span>
                  <img class="img-profile rounded-circle" src="@/assets/img/undraw_profile.svg" />
                </a>
                <!-- Dropdown - User Information -->
                <div
                  class="
                    dropdown-menu dropdown-menu-end
                    shadow
                    animated--grow-in
                  "
                  aria-labelledby="userDropdown"
                >
                  <a
                    class="dropdown-item"
                    href="javascript:void(0);"
                    @click.prevent="$refs.logoutModal.openModal"
                  >
                    <i class="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>
                    登出
                  </a>
                </div>
              </li>
            </ul>
          </nav>
          <!-- End of Topbar -->

          <!-- Begin Page Content -->
          <router-view />
          <!-- /.container-fluid -->
        </div>
        <!-- End of Main Content -->

        <!-- Footer -->
        <footer class="sticky-footer bg-white">
          <div class="container my-auto">
            <div class="copyright text-center my-auto">
              <span>Copyright &copy; Ethan Website 2021</span>
            </div>
          </div>
        </footer>
        <!-- End of Footer -->
      </div>
      <!-- End of Content Wrapper -->
    </div>
    <!-- End of Page Wrapper -->

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="javascript:void(0);">
      <i class="fas fa-angle-up"></i>
    </a>
    <logout-modal @logout="logout" ref="logoutModal"></logout-modal>
  </div>
</template>

<script>
/* global $ */
import logoutModal from '@/components/admin/logoutModal.vue';

export default {
  data() {
    return {
      menuList: [
        {
          id: 1,
          icon: 'fas fa-gift',
          name: '商品管理',
          path: '/admin/products',
        },
        {
          id: 2,
          icon: 'fas fa-shopping-cart',
          name: '訂單管理',
          path: '/admin/orders',
        },
      ],
    };
  },
  components: { logoutModal },
  methods: {
    checkLogin(successCallback) {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      if (token) {
        this.$http.defaults.headers.common.Authorization = `${token}`;

        this.$http
          .post(`${process.env.VUE_APP_API_URL}/api/user/check`)
          .then((response) => {
            if (response.data.success) {
              successCallback();
            } else {
              this.$router.push('/login');
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.$router.push('/login');
      }
    },
    logout() {
      this.$http
        .post(`${process.env.VUE_APP_API_URL}/logout`)
        .then((response) => {
          if (response.data.success) {
            this.$refs.logoutModal.hideModal();
            document.cookie = 'hexToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            this.$router.push('/login');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.checkLogin();
    this.menuList.forEach((menu, index) => {
      if (menu.path === this.$route.fullPath) {
        this.menuList[index].active = true;
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.checkLogin(() => {
      this.menuList.forEach((menu, index) => {
        if (menu.path === to.fullPath) {
          this.menuList[index].active = true;
        } else {
          this.menuList[index].active = false;
        }
      });
      next();
    });
  },
  mounted() {
    $('#sidebarToggle, #sidebarToggleTop').on('click', () => {
      $('body').toggleClass('sidebar-toggled');
      $('.sidebar').toggleClass('toggled');
      if ($('.sidebar .collapse').length && $('.sidebar').hasClass('toggled')) {
        $('.sidebar .collapse').collapse('hide');
      }
    });

    // Close any open menu accordions when window is resized below 768px
    $(window).resize(() => {
      if ($('.sidebar .collapse').length && $(window).width() < 768) {
        $('.sidebar .collapse').collapse('hide');
      }
    });

    // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
    $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', (e) => {
      if ($(window).width() > 768) {
        const e0 = e.originalEvent;
        const delta = e0.wheelDelta || -e0.detail;
        this.scrollTop += (delta < 0 ? 1 : -1) * 30;
        e.preventDefault();
      }
    });

    // Scroll to top button appear
    $(document).on('scroll', () => {
      const scrollDistance = $(this).scrollTop();
      if (scrollDistance > 100) {
        $('.scroll-to-top').fadeIn();
      } else {
        $('.scroll-to-top').fadeOut();
      }
    });

    // Smooth scrolling using jQuery easing
    $(document).on('click', 'a.scroll-to-top', (e) => {
      // const $anchor = $(this);
      $('html, body')
        .stop()
        .animate(
          {
            scrollTop: $('#page-top').offset().top,
          },
          1000,
          'easeInOutExpo',
        );
      e.preventDefault();
    });
  },
};
</script>
