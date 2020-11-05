<template>
  <div class="dropdown is-active">
    <div class="dropdown-trigger" @click.stop="toggleShow">
      <span class="icon is-small is-size-4">
        <i class="fas fa-bell"></i>
      </span>
      <span v-if="hasNotifications" class="notifications">{{
        notifications.length
      }}</span>
    </div>
    <transition name="slide">
      <div v-if="show && hasNotifications" class="dropdown-menu py-0">
        <div class="dropdown-content py-0">
          <Notification
            v-for="notification in notifications"
            :key="notification.id"
            :notification="notification"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";

export { default as Notification } from "./Notification";

const store = useStore();

export const notifications = computed(() => store.getters.notifications);
export const hasNotifications = computed(() => store.getters.hasNotifications);

export const show = ref(false);
export const toggleShow = () => {
  show.value = !show.value;
};
</script>

<style scoped>
.dropdown-menu {
  transform: translateX(-100%);
  border: 1px solid rgba(12, 8, 8, 0.418);
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.75s ease-in-out;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%) translateY(30px);
}

.dropdown-trigger {
  position: relative;
  cursor: pointer;
}

.notifications {
  border-radius: 50%;
  background-color: red;
  color: white;
  font-weight: 500;
  font-size: 0.75rem;
  width: 28px;
  height: 28px;
  display: inline-block;
  text-align: center;
  padding-top: 4px;
  position: absolute;
  top: -15px;
  left: 9px;
  border-style: solid;
  border-width: 2px;
}
</style>