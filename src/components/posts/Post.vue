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
      </div>

      <div class="content">
        {{ post.post }}
      </div>
      <hr />
      <div class="iteractions">
        <div>
          <span class="icon has-text-danger">
            <i class="far fa-heart"></i>
          </span>
          <span>{{ post.likes }} Likes</span>
        </div>
        <div>
          <span class="icon has-text-info">
            <i class="fas fa-comment"></i>
          </span>
          <span>{{ post.comments }} Comments</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import UserAvatar from "../ui/UserAvatar";

export default {
  props: ["post"],
  components: { UserAvatar },
  setup(props) {
    const date = computed(() => {
      const created_at = new Date(props.post.created_at.seconds * 1000);
      return `${created_at.toLocaleTimeString()} ${created_at.toLocaleDateString()}`;
    });

    return { date };
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
  cursor: pointer;
}

hr {
  margin-bottom: 5px;
}
</style>