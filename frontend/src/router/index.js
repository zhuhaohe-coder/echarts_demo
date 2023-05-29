import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/page",
    },
    {
      path: "/page",
      name: "page",
      component: () => import("@/views/HomePage.vue"),
    },
  ],
});

export default router;
