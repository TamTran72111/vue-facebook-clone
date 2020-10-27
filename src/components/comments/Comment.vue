<template>
  <div class="comment mt-2">
    <div class="comment__avatar">
      <UserAvatar
        :src="comment.userAvatar"
        :userId="comment.userId"
        type="comment"
      />
    </div>
    <div class="comment__content">
      <div>
        <router-link :to="`/users/${comment.userId}`">
          <h6 class="title is-6">{{ comment.displayName }}</h6>
        </router-link>

        <!-- Edit and Delete  -->
        <div
          v-if="isAuthor"
          class="dropdown"
          :class="{ 'is-active': showDropdown }"
          @click="toggleDropdown"
        >
          <div class="dropdown-trigger">
            <span class="icon">
              <i class="fas fa-ellipsis-v"></i>
            </span>
          </div>
          <div class="dropdown-menu">
            <div class="dropdown-content">
              <div class="dropdown-item" @click="toggleEdit">
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
      </div>
      <form v-if="showEdit" @submit.prevent="editComment">
        <input
          type="text"
          class="input is-rounded"
          v-model="editedComment"
          @keyup.esc="toggleEdit"
        />
      </form>
      <p v-else>{{ comment.comment }}</p>
    </div>

    <!-- Delete Comment -->
    <ConfirmationModal
      :show="showDelete"
      :close="toggleDelete"
      :confirm="confirmDelete"
      :isDelete="true"
      title="Delete Comment"
      buttonText="Delete"
    >
      Are your sure that you want to delete this comment?
    </ConfirmationModal>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

import ConfirmationModal from "../ui/ConfirmationModal";
import UserAvatar from "../ui/UserAvatar";

export default {
  props: ["comment"],
  components: { UserAvatar, ConfirmationModal },
  setup(props) {
    const store = useStore();
    const isAuthor = computed(
      () => store.getters.userId === props.comment.userId
    );

    const showDropdown = ref(false);
    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
    };

    const editedComment = ref("");
    const showEdit = ref(false);
    const toggleEdit = () => {
      showEdit.value = !showEdit.value;
      if (showEdit.value) {
        editedComment.value = props.comment.comment;
      }
    };

    const editComment = async () => {
      await store.dispatch("editComment", {
        postId: props.comment.postId,
        commentId: props.comment.id,
        comment: editedComment.value,
      });
      toggleEdit();
    };

    const showDelete = ref(false);
    const toggleDelete = () => {
      showDelete.value = !showDelete.value;
    };
    const confirmDelete = async () => {
      await store.dispatch("deleteComment", {
        commentId: props.comment.id,
        postId: props.comment.postId,
      });
    };

    return {
      isAuthor,
      showDropdown,
      toggleDropdown,
      editedComment,
      showEdit,
      toggleEdit,
      editComment,
      showDelete,
      toggleDelete,
      confirmDelete,
    };
  },
};
</script>

<style scoped>
.comment {
  display: flex;
  border-top: 2px solid #f5f5f5;
  padding-top: 8px;
}
.comment__avatar {
  margin-right: 1rem;
}
.comment__content {
  background-color: #eee;
  flex-grow: 1;
  border-radius: 7px;
  padding: 0.25rem 0.75rem;
}
a .title:hover {
  text-decoration: underline;
}
a {
  display: block;
}

.comment__content > div {
  display: flex;
  justify-content: space-between;
}
.dropdown {
  cursor: pointer;
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