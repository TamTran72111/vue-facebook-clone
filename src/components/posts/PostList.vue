<template>
  <div v-if="posts.length > 0">
    <Post v-for="post in posts" :key="post.id" :post="post" />
  </div>
  <div v-else class="box my-3">There is no post</div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

import Post from "./Post";

export default {
  components: { Post },
  setup() {
    const store = useStore();
    const posts = computed(() => store.getters.posts);

    return { posts };
  },
};
</script>