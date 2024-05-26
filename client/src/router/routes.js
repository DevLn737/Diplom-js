import { isLogin } from "@/utils/auth.js";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/pages/HomePage.vue"),
  },
  {
    path: "/faq",
    name: "faq",
    component: () => import("@/pages/FaqPage.vue"),
  },
  {
    path: "/llama",
    name: "llama",
    component: () => import("@/pages/LlamaPage.vue"),
    beforeEnter: (to, from, next) => {
      if (isLogin()) {
        next();
      } else {
        next({ name: "login" });
      }
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/pages/RegisterPage.vue"),
    beforeEnter: (to, from, next) => {
      if (isLogin()) {
        next({ name: "home" });
      } else {
        next();
      }
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/LoginPage.vue"),
    beforeEnter: (to, from, next) => {
      if (isLogin()) {
        next({ name: "home" });
      } else {
        next();
      }
    },
  },
];

export default routes;
