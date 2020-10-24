<template>
  <Login />
</template>

<script>
import Login from "@/components/auth/Login";
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  components: {
    Login,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const isLoggedIn = computed(() => {
      return store.getters.user !== null;
    });

    watch(isLoggedIn, () => {
      if (isLoggedIn.value) {
        router.replace({ name: "home" });
      }
    });
  },
};
</script>