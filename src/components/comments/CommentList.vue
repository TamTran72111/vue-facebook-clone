<template>
  <transition-group tag="div" name="slide" v-if="show">
    <Comment v-for="comment in comments" :key="comment.id" :comment="comment" />
  </transition-group>
</template>


<script>
import { computed } from "vue";
import { useStore } from "vuex";

import Comment from "./Comment";

export default {
  props: ["postId", "show"],
  components: { Comment },
  setup(props) {
    const store = useStore();
    const comments = computed(() => store.getters.getComments(props.postId));

    return { comments };
  },
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