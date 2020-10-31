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
        <EditAndDeleteIcons
          :isAuthor="isAuthor"
          :toggleEdit="toggleEdit"
          :toggleDelete="toggleDelete"
        />
      </div>
      <form v-if="showEdit" @submit.prevent="editComment">
        <input
          ref="commentInput"
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
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";

import ConfirmationModal from "../ui/ConfirmationModal";
import UserAvatar from "../ui/UserAvatar";
import EditAndDeleteIcons from "../ui/EditAndDeleteIcons";

export default {
  props: ["comment"],
  components: { UserAvatar, ConfirmationModal, EditAndDeleteIcons },
  setup(props) {
    const store = useStore();
    const isAuthor = computed(
      () => store.getters.userId === props.comment.userId
    );

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

    const commentInput = ref(null);
    watch(showEdit, () => {
      if (showEdit.value) {
        setTimeout(() => {
          commentInput.value.focus();
        }, 200);
      }
    });

    return {
      isAuthor,
      editedComment,
      showEdit,
      toggleEdit,
      editComment,
      showDelete,
      toggleDelete,
      confirmDelete,
      commentInput,
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
</style>