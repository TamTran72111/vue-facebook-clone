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
        <EditAndDeleteIcons
          :isAuthor="isAuthor"
          :toggleEdit="toggleEditPost"
          :toggleDelete="toggleDelete"
        />

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
      <CommentList
        :postId="post.id"
        :show="showComments"
        :toggle="toggleShowComments"
      />
      <CreateComment :postId="post.id" @comment-created="showComments = true" />
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
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";

import PostModal from "./PostModal";
import CreateComment from "../comments/CreateComment";
import CommentList from "../comments/CommentList";
import UserAvatar from "../ui/UserAvatar";
import ConfirmationModal from "../ui/ConfirmationModal";
import EditAndDeleteIcons from "../ui/EditAndDeleteIcons";

export default {
  props: ["post"],
  components: {
    UserAvatar,
    PostModal,
    ConfirmationModal,
    CreateComment,
    CommentList,
    EditAndDeleteIcons,
  },
  setup(props) {
    const date = computed(() => {
      if (props.post && props.post.created_at) {
        const created_at = new Date(props.post.created_at.seconds * 1000);
        return `${created_at.toLocaleTimeString()} ${created_at.toLocaleDateString()}`;
      }
      return "";
    });

    const store = useStore();
    const liked = computed(() => {
      return store.getters.likes.some((like) => like.postId === props.post.id);
    });

    // Avoid users spam the like button by using bouncing and wait 200ms before
    // dispatching like/unlike actions.
    const bouncingLike = ref(liked.value);
    let likeTimer = null;
    watch(bouncingLike, () => {
      if (likeTimer != null) {
        clearTimeout(likeTimer);
      }
      if (bouncingLike.value === liked.value) {
        return;
      }
      likeTimer = setTimeout(() => {
        if (liked.value) {
          store.dispatch("unlike", props.post.id);
        } else {
          store.dispatch("like", props.post.id);
        }
      }, 200);
    });
    const toggleLiked = async () => {
      bouncingLike.value = !bouncingLike.value;
    };

    const isAuthor = computed(() => props.post.userId === store.getters.userId);

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

    const commented = computed(() => {
      const comments = store.getters.getComments(props.post.id);

      return comments?.some(
        (comment) => comment.userId === store.getters.userId
      );
    });

    const showComments = ref(false);
    const toggleShowComments = () => {
      showComments.value = !showComments.value;
    };

    return {
      date,
      liked,
      toggleLiked,
      isAuthor,
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