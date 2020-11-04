<template>
  <div class="dropdown">
    <div class="dropdown-trigger">
      <span class="icon is-small is-size-4">
        <i class="fas fa-bell"></i>
      </span>
      <span v-if="hasNotifications" class="notifications">{{
        notifications.length
      }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

export const notifications = computed(() => store.getters.notifications);
export const hasNotifications = computed(
  () => notifications.value.length !== 0
);
</script>

<style scoped>
.dropdown-menu {
  transform: translateX(-100%);
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