<template>
  <div class="center-box">
    <CreatePost />
  </div>
</template>

<script>
import CreatePost from "./posts/CreatePost";

export default {
  components: {
    CreatePost,
  },
};
</script>


<style scoped>
.center-box {
  max-width: 600px;
  margin: auto;
}
</style>