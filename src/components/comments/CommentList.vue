<template>
  <transition-group tag="div" name="slide" v-if="show">
    <Comment
      v-for="comment in commentList"
      :key="comment.id"
      :comment="comment"
    />
  </transition-group>
</template>


<script>
import Comment from "./Comment";

export default {
  props: ["commentList", "show"],
  components: { Comment },
};
</script>

<style scoped>
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(50%);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.75s ease-in-out;
}
.slide-leave-active {
  position: absolute;
}
</style>