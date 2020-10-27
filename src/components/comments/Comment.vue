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
      <router-link :to="`/users/${comment.userId}`">
        <h6 class="title is-6">{{ comment.displayName }}</h6></router-link
      >
      <p>{{ comment.comment }}</p>
    </div>
  </div>
</template>

<script>
import UserAvatar from "../ui/UserAvatar";

export default {
  props: ["comment"],
  components: { UserAvatar },
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
</style>