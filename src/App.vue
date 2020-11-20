<template>
  <div v-if="isLoggedIn" class="nav-wrapper">
    <Navbar />
  </div>
  <div class="app">
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import Navbar from "./components/Navbar";

export default {
  name: "App",
  components: { Navbar },
  setup() {
    const store = useStore();
    store.dispatch("setupAuthListener");

    const isLoggedIn = computed(() => store.getters.isLoggedIn);

    return { isLoggedIn };
  },
};
</script>


<style>
.nav-wrapper {
  background-color: #fff;
  position: fixed;
  top: 0;
  padding: 2px 2rem;
  width: 100vw;
  z-index: 1;
}
.app {
  padding-top: 6rem;
  background: #242526;
  min-height: 100vh;
}
</style>
