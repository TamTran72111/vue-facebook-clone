<template>
  <div class="createComment mt-2">
    <div class="createComment__avatar">
      <UserAvatar :src="userAvatar" :userId="userId" type="comment" />
    </div>
    <form @submit.prevent="createNewComment" style="width: 100%">
      <input
        class="input is-rounded"
        placeholder="Write a comment..."
        v-model="comment"
      />
      <button class="is-hidden" type="submit"></button>
    </form>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

import UserAvatar from "../ui/UserAvatar";

export default {
  props: ["postId"],
  components: {
    UserAvatar,
  },
  setup(props) {
    const comment = ref("");

    const store = useStore();
    const userAvatar = computed(() => store.getters.userAvatar);
    const userId = computed(() => store.getters.userId);

    const createNewComment = async () => {
      await store.dispatch("createComment", {
        postId: props.postId,
        comment: comment.value,
      });
      comment.value = "";
    };

    return {
      comment,
      createNewComment,
      userAvatar,
      userId,
    };
  },
};
</script>

<style scoped>
.createComment {
  display: flex;
  border-top: 2px solid #f5f5f5;
  padding-top: 8px;
}
.createComment__avatar {
  margin-right: 1rem;
}
</style>