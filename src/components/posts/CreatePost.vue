<template>
  <div class="box">
    <div class="createPost">
      <div class="createPost__avatar">
        <UserAvatar :src="userAvatar" userId="abc" />
      </div>

      <input
        class="input is-rounded is-fullwidth"
        :placeholder="placeholder"
        readonly
        @click="toggleNewPost"
        :value="newPost"
      />
    </div>
    <CreatePostModal
      :show="showNewPost"
      v-model="newPost"
      :close="toggleNewPost"
      :placeholder="placeholder"
      :createNewPost="createNewPost"
    />
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

import CreatePostModal from "./CreatePostModal";
import UserAvatar from "../ui/UserAvatar";

export default {
  components: {
    CreatePostModal,
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

    const createNewPost = async () => {
      try {
        await store.dispatch("createPost", newPost.value);
        newPost.value = "";
        showNewPost.value = false;
      } catch (err) {
        //Handle Error
        console.log(err);
      }
    };

    return {
      newPost,
      showNewPost,
      toggleNewPost,
      createNewPost,
      placeholder,
      userAvatar,
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