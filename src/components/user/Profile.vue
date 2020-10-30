<template>
  <div
    v-if="user"
    class="profile box py-5 has-background-white has-text-centered"
  >
    <div
      class="image-wrapper mt-1"
      @click="toggleUploadAvatar"
      :style="avatarStyle"
    >
      <figure class="image">
        <img class="is-rounded" :src="user.avatar" alt="User avatar" />
      </figure>
    </div>
    <UploadAvatar :show="showUploadAvatar" :close="toggleUploadAvatar" />
    <h3 class="title is-3 mt-2 mb-0">
      {{ user.displayName }}
      <EditProfile v-if="isOwner" />
    </h3>
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
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";

export { default as EditProfile } from "./EditProfile";
export { default as UploadAvatar } from "./UploadAvatar";

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

export const isOwner = computed(() => {
  return store.getters.user.userId === store.getters.userId;
});
export const avatarStyle = computed(() =>
  isOwner.value ? { cursor: "pointer" } : null
);
export const showUploadAvatar = ref(false);
export const toggleUploadAvatar = () => {
  if (isOwner.value) showUploadAvatar.value = !showUploadAvatar.value;
};
</script>

<style scoped>
.profile {
  max-width: 800px;
  margin: auto;
}

.image-wrapper {
  border: 4px solid #000;
  padding: 0;
  display: inline-block;
  border-radius: 50%;
  margin: auto;
  object-fit: cover;
}
.image {
  width: 250px;
  height: 250px;
}
.image img {
  object-fit: cover;
  height: 100%;
  width: 100%;
}
</style>