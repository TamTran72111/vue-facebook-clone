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
    <div class="follow" v-if="!isOwner">
      <button
        class="button is-primary"
        :disabled="followRequesting"
        @click="follow"
        v-if="!followed"
      >
        Follow
      </button>
      <button
        class="button is-primary is-outlined"
        :disabled="followRequesting"
        @click="unfollow"
        v-else
      >
        Unfollow
      </button>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

import EditProfile from "./EditProfile";
import UploadAvatar from "./UploadAvatar";

export default {
  components: { EditProfile, UploadAvatar },
  setup() {
    const store = useStore();
    const user = computed(() => store.getters.user);

    const fullname = computed(() => {
      if (user.value) {
        return `${user.value.firstname} ${user.value.surname}`;
      }
      return "";
    });

    const joinedDate = computed(() => {
      if (user.value) {
        const date = new Date(user.value.created_at.seconds * 1000);
        return `Joined ${date.toLocaleDateString()}`;
      }
      return "";
    });

    const isOwner = computed(() => {
      return store.getters.user.userId === store.getters.userId;
    });
    const avatarStyle = computed(() =>
      isOwner.value ? { cursor: "pointer" } : null
    );
    const showUploadAvatar = ref(false);
    const toggleUploadAvatar = () => {
      if (isOwner.value) showUploadAvatar.value = !showUploadAvatar.value;
    };

    const followRequesting = ref(false);

    const follow = async () => {
      followRequesting.value = true;
      await store.dispatch("follow");
      followRequesting.value = false;
    };

    const unfollow = async () => {
      followRequesting.value = true;
      await store.dispatch("unfollow");
      followRequesting.value = false;
    };

    const followed = computed(() => {
      return store.getters.followed(user.value.userId) !== undefined;
    });

    return {
      user,
      fullname,
      joinedDate,
      isOwner,
      avatarStyle,
      showUploadAvatar,
      toggleUploadAvatar,
      followRequesting,
      follow,
      unfollow,
      followed,
    };
  },
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