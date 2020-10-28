<template>
  <transition-group tag="div" name="slide" v-if="show">
    <Comment v-for="comment in comments" :key="comment.id" :comment="comment" />
  </transition-group>
  <div v-if="comments?.length > 0" @click="toggle" class="viewComments">
    <span v-if="show">Hide comments</span>
    <span v-else>View comments</span>
  </div>
</template>


<script>
import { computed } from "vue";
import { useStore } from "vuex";

import Comment from "./Comment";

export default {
  props: ["postId", "show", "toggle"],
  components: { Comment },
  setup(props) {
    const store = useStore();
    const comments = computed(() => store.getters.getComments(props.postId));

    return { comments };
  },
};
</script>

<style scoped>
.viewComments {
  border-top: 2px solid #f5f5f5;
  margin-top: 8px;
  padding-top: 5px;
  cursor: pointer;
  font-weight: 500;
}
.viewComments:hover {
  text-decoration: underline;
}

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