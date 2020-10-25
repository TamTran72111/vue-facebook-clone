<template>
  <div class="center-box">
    <CreatePost />
    <PostList />
  </div>
</template>

<script>
import CreatePost from "./posts/CreatePost";
import PostList from "./posts/PostList";

export default {
  components: {
    CreatePost,
    PostList,
  },
};
</script>


<style scoped>
.center-box {
  max-width: 600px;
  margin: auto;
}
</style>