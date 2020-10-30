<template>
  <div class="center-box">
    <CreatePost />
    <PostList />
  </div>
</template>

<script>
import { onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";

import CreatePost from "./posts/CreatePost";
import PostList from "./posts/PostList";

export default {
  components: {
    CreatePost,
    PostList,
  },
  setup() {
    const store = useStore();
    onMounted(() => store.dispatch("fetchPosts"));

    // Clear all posts when unmounted
    onUnmounted(() => store.dispatch("clearPosts"));
  },
};
</script>


<style scoped>
.center-box {
  max-width: 600px;
  margin: auto;
}
</style>