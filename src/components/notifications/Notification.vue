<template>
  <div class="dropdown-item">
    <p @click="removeNotification">
      <strong>{{ user }}</strong> {{ message }}
    </p>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

import { notificationType } from "../../store/notifications/actions";

export default {
  props: ["notification"],
  setup(props) {
    const user = computed(() => props.notification.sender);
    const message = computed(() => {
      if (notificationType.CREATE_NEW_POST === props.notification.type) {
        return "create a new post";
      } else if (notificationType.LIKE_POST === props.notification.type) {
        return "like your post";
      } else {
        return "comment on your post";
      }
    });

    const store = useStore();
    const removeNotification = () => {
      store.dispatch("removeNotification", props.notification.id);
    };
    return { user, message, removeNotification };
  },
};
</script>

<style scoped>
.dropdown-item {
  border-bottom: 1px solid rgba(12, 8, 8, 0.418);
}
.dropdown-item:last-of-type {
  border: none;
}
.dropdown-item:hover {
  background: #e0e0e0;
}
</style>