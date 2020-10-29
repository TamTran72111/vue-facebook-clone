<template>
  <div
    v-if="user"
    class="profile box py-5 has-background-white has-text-centered"
  >
    <div class="image-wrapper mt-1">
      <figure class="image">
        <img class="is-rounded" :src="user.avatar" alt="User avatar" />
      </figure>
    </div>
    <h3 class="title is-3 mt-2 mb-0">{{ user.displayName }}</h3>
    <div v-if="fullname !== user.displayName">({{ fullname }})</div>

    <div class="info mt-3 pt-2 pb-1 is-5">
      <div v-if="user.bio">{{ user.bio }}</div>

      <div v-if="user.location">
        <span class="icon has-text-info"
          ><i class="fas fa-map-marker-alt"></i></span
        >{{ user.location }}
      </div>
      <div>
        <span class="icon has-text-info"><i class="far fa-calendar"></i></span
        >{{ joinedDate }}
      </div>
    </div>
    <EditProfile />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

export { default as EditProfile } from "./EditProfile";

const store = useStore();
export const user = computed(() => store.getters.user);

export const fullname = computed(() => {
  if (user.value) {
    return `${user.value.firstname} ${user.value.surname}`;
  }
  return "";
});

export const joinedDate = computed(() => {
  if (user.value) {
    const date = new Date(user.value.created_at.seconds * 1000);
    return `Joined ${date.toLocaleDateString()}`;
  }
  return "";
});
</script>

<style scoped>
.profile {
  max-width: 800px;
  margin: auto;
}

.image-wrapper {
  border: 4px solid #000;
  padding: 0;
  width: 30%;
  max-width: 250px;
  border-radius: 50%;
  margin: auto;
}
</style>