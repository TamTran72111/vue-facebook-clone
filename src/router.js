import { createRouter, createWebHistory } from "vue-router";

import Home from "./components/Home.vue";
import Auth from "./pages/Auth.vue";
import User from "./pages/User.vue";
import store from "./store";

const routes = [
  { path: "/", name: "home", component: Home },
  {
    path: "/login",
    name: "login",
    component: Auth,
    beforeEnter(_, _2, next) {
      if (store.getters.user) {
        next(false);
      } else {
        next();
      }
    },
  },
  { path: "/users/:userId", name: "user", component: User, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (store.getters.isLoggedIn || to.name === "login") {
    next();
  } else {
    next({ name: "login" });
  }
});

export default router;
