<template>
  <div class="card my-3">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <UserAvatar :src="post.userAvatar" :userId="post.userId" />
        </div>
        <div class="media-content">
          <p class="title is-4">{{ post.displayName }}</p>
          <p class="subtitle is-6">{{ date }}</p>
        </div>

        <!-- Post Edit and Delete buttons -->
        <div
          v-if="isAuthor"
          class="dropdown"
          :class="{ 'is-active': showDropdown }"
          @click="toggleDropdown"
        >
          <div class="dropdown-trigger">
            <span class="icon mt-2">
              <i class="fas fa-ellipsis-v"></i>
            </span>
          </div>
          <div class="dropdown-menu">
            <div class="dropdown-content">
              <div class="dropdown-item" @click="toggleEditPost">
                <span>Edit</span>
                <span class="icon has-text-info"
                  ><i class="fas fa-pencil-alt"></i
                ></span>
              </div>
              <div class="dropdown-item" @click="toggleDelete">
                <span>Delete</span>
                <span class="icon has-text-danger"
                  ><i class="fas fa-trash-alt"></i
                ></span>
              </div>
            </div>
          </div>
        </div>

        <!--  -->
      </div>

      <div class="content">
        {{ post.post }}
      </div>
      <hr />
      <div class="iteractions">
        <div>
          <span @click="toggleLiked" class="icon has-text-danger">
            <i :class="liked ? 'fas' : 'far'" class="fa-heart"></i>
          </span>

          <span>{{ post.likes }} Likes</span>
        </div>
        <div>
          <span @click="toggleShowComments" class="icon has-text-info">
            <i :class="commented ? 'fas' : 'far'" class="fa-comment"></i>
          </span>
          <span>{{ post.comments }} Comments</span>
        </div>
      </div>
      <CommentList :commentList="post.commentList" :show="showComments" />
      <CreateComment :postId="post.id" />
    </div>

    <!-- Edit Post -->
    <PostModal
      title="Edit Post"
      buttonText="Edit"
      :show="showEditPost"
      v-model="oldPost"
      :close="toggleEditPost"
      :placeholder="placeholder"
      :buttonClick="editPost"
    />

    <!-- Delete Post -->
    <ConfirmationModal
      :show="showDelete"
      :close="toggleDelete"
      :confirm="confirmDelete"
      :isDelete="true"
      title="Delete Post"
      buttonText="Delete"
    >
      Are your sure that you want to delete this post?
    </ConfirmationModal>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

import PostModal from "./PostModal";
import CreateComment from "../comments/CreateComment";
import CommentList from "../comments/CommentList";
import UserAvatar from "../ui/UserAvatar";
import ConfirmationModal from "../ui/ConfirmationModal";

export default {
  props: ["post"],
  components: {
    UserAvatar,
    PostModal,
    ConfirmationModal,
    CreateComment,
    CommentList,
  },
  setup(props) {
    const date = computed(() => {
      const created_at = new Date(props.post.created_at.seconds * 1000);
      return `${created_at.toLocaleTimeString()} ${created_at.toLocaleDateString()}`;
    });

    const store = useStore();
    const liked = computed(() => {
      return store.getters.likes.some((like) => like.postId === props.post.id);
    });

    const toggleLiked = async () => {
      console.log("what??");
      if (liked.value) {
        store.dispatch("unlike", props.post.id);
      } else {
        store.dispatch("like", props.post.id);
      }
    };

    const isAuthor = computed(() => props.post.userId === store.getters.userId);

    const showDropdown = ref(false);
    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
    };

    const placeholder = computed(() => {
      return `What's on your mind, ${store.getters.displayName}?`;
    });

    const oldPost = ref(props.post.post);
    const showEditPost = ref(false);
    const toggleEditPost = () => {
      if (showEditPost.value) {
        // reset the post on close
        oldPost.value = props.post.post;
      }
      showEditPost.value = !showEditPost.value;
    };

    const editPost = async () => {
      await store.dispatch("editPost", {
        postId: props.post.id,
        post: oldPost.value,
      });
      showEditPost.value = false;
    };

    const showDelete = ref(false);
    const toggleDelete = () => {
      showDelete.value = !showDelete.value;
    };

    const confirmDelete = async () => {
      store.dispatch("deletePost", props.post.id);
    };

    const commented = computed(
      () =>
        props.post.commentList &&
        props.post.commentList.some(
          (comment) => comment.userId === store.getters.userId
        )
    );

    const showComments = ref(false);
    const toggleShowComments = () => {
      showComments.value = !showComments.value;
    };

    return {
      date,
      liked,
      toggleLiked,
      isAuthor,
      showDropdown,
      toggleDropdown,
      placeholder,
      oldPost,
      showEditPost,
      toggleEditPost,
      editPost,
      showDelete,
      toggleDelete,
      confirmDelete,
      commented,
      showComments,
      toggleShowComments,
    };
  },
};
</script>

<style scoped>
.iteractions {
  display: flex;
  text-align: center;
}
.iteractions div {
  flex-grow: 1;
}

.iteractions span.icon {
  margin-right: 0.5rem;
}

span.icon {
  cursor: pointer;
}

hr {
  margin-bottom: 5px;
}

.dropdown-menu {
  transform: translateX(-90%);
}

/* .dropdown-content */
.dropdown-menu {
  min-width: 6.5rem;
}
.dropdown-item {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

.dropdown-item:hover {
  background: #e0e0e0;
}
</style>