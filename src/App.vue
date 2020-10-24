<template>
  <div class="container mt-3">
    <Navbar v-if="isLoggedIn" />
    <hr />
    <router-view></router-view>
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
    store.dispatch("tryLogin");

    const isLoggedIn = computed(() => {
      return store.getters.user !== null;
    });

    return { isLoggedIn };
  },
};
</script>

