<template>
  <div class="box">
    <div class="createPost">
      <div class="createPost__avatar">
        <UserAvatar :src="userAvatar" :userId="userId" />
      </div>

      <input
        class="input is-rounded is-fullwidth"
        :placeholder="placeholder"
        readonly
        @click="toggleNewPost"
        :value="newPost"
      />
    </div>
    <PostModal
      title="Create Post"
      buttonText="Post"
      :show="showNewPost"
      v-model="newPost"
      :close="toggleNewPost"
      :placeholder="placeholder"
      :buttonClick="createNewPost"
    />
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

import PostModal from "./PostModal";
import UserAvatar from "../ui/UserAvatar";

export default {
  components: {
    PostModal,
    UserAvatar,
  },
  setup() {
    const newPost = ref("");
    const showNewPost = ref(false);
    const toggleNewPost = () => {
      showNewPost.value = !showNewPost.value;
    };

    const store = useStore();

    const placeholder = computed(() => {
      return `What's on your mind, ${store.getters.displayName}?`;
    });

    const userAvatar = computed(() => store.getters.userAvatar);
    const userId = computed(() => store.getters.userId);

    const createNewPost = () => {
      store.dispatch("createPost", newPost.value);
      showNewPost.value = false;
      newPost.value = "";
    };

    return {
      newPost,
      showNewPost,
      toggleNewPost,
      createNewPost,
      placeholder,
      userAvatar,
      userId,
    };
  },
};
</script>

<style scoped>
.createPost {
  display: flex;
}
.createPost__avatar {
  margin-right: 1rem;
}

input.input {
  cursor: pointer;
}
</style>