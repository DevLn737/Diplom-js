import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes: routes,
  history: createWebHistory(import.meta.env.BASE_URL),
});

export default router;
