import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/Front.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/front/Products.vue'),
      },
      {
        path: 'product/:id',
        component: () => import('../views/front/Product.vue'),
      },
      {
        path: 'cart',
        component: () => import('../views/front/Cart.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('../views/Admin.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/admin/Products.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
