<template>
  <Login v-if="loaded" />
  <Loading v-else />
</template>

<script>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import Login from "@/components/auth/Login";
import Loading from "@/components/ui/Loading";

export default {
  components: {
    Login,
    Loading,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const loaded = ref(false);

    const isLoggedIn = computed(() => store.getters.isLoggedIn);

    watch(isLoggedIn, () => {
      if (isLoggedIn.value) {
        router.replace({ name: "home" });
      }
    });

    // Show loading while checking in for authentication
    setTimeout(() => (loaded.value = true), 400);

    return {
      loaded,
    };
  },
};
</script>