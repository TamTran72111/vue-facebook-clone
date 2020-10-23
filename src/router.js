import { createRouter, createWebHistory } from "vue-router";

import Home from "./components/Home.vue";
import Auth from "./pages/Auth.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Auth },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
