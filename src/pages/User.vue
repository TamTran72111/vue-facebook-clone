<template>
  <Profile />
</template>

<script>
import { onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

import Profile from "../components/user/Profile";

export default {
  components: { Profile },
  setup() {
    const store = useStore();
    const route = useRoute();

    onMounted(async () => {
      if (route.params.userId) {
        await store.dispatch("fetchUser", route.params.userId);
      }
    });
    onUnmounted(() => store.dispatch("clearUser"));
  },
};
</script>