import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/detail/:id",
      name: "product_detail",
      component: () => import("../views/Product_detail.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Register.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/Profile.vue"),
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("../views/CartView.vue"),
    },
    {
      path: "/admin",
      component: () => import("../layout/admin.vue"),
      children: [
        //user
        {
          path: "/user",
          name: "user",
          component: () => import("../views/admin/users/index.vue"),
        },
        {
          path: "user/create",
          name: "admin-user-create",
          component: () => import("../views/admin/users/create.vue"),
        },
        {
          path: "user/:id/edit",
          name: "admin-user-edit",
          component: () => import("../views/admin/users/edit.vue"),
        },
        //users_status
        {
          path: "/user_status",
          name: "user_status",
          component: () => import("../views/admin/status/index.vue"),
        },
        {
          path: "user_status/create",
          name: "admin-status-create",
          component: () => import("../views/admin/status/create.vue"),
        },
        {
          path: "user_status/:id/edit",
          name: "admin-status-edit",
          component: () => import("../views/admin/status/edit.vue"),
        },
        //department
        {
          path: "/department",
          name: "department",
          component: () => import("../views/admin/departments/index.vue"),
        },
        {
          path: "department/create",
          name: "admin-department-create",
          component: () => import("../views/admin/departments/create.vue"),
        },
        {
          path: "department/:id/edit",
          name: "admin-department-edit",
          component: () => import("../views/admin/departments/edit.vue"),
        },
        {
          path: "/product",
          name: "product",
          component: () => import("../views/admin/product/index.vue"),
        },
        {
          path: "product/create",
          name: "admin-product-create",
          component: () => import("../views/admin/product/create.vue"),
        },
        {
          path: "product/:id/edit",
          name: "admin-product-edit",
          component: () => import("../views/admin/product/edit.vue"),
        },
      ],
    },
  ],
});
// const admin = [];

export default router;

