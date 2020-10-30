<template>
  <Profile />
  <div class="center-box">
    <PostList />
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

import Profile from "../components/user/Profile";
import PostList from "../components/posts/PostList";

export default {
  components: { Profile, PostList },
  setup() {
    const store = useStore();
    const route = useRoute();

    const userId = computed(() => route.params.userId);
    watch(userId, async () => {
      store.dispatch("clearUser");
      if (userId.value) await store.dispatch("fetchUser", userId.value);
    });

    onMounted(async () => {
      if (route.params.userId) {
        await store.dispatch("fetchUser", route.params.userId);
      }
    });
    onUnmounted(() => store.dispatch("clearUser"));
  },
};
</script>

<style scoped>
.center-box {
  max-width: 600px;
  margin: 2rem auto;
}
</style>