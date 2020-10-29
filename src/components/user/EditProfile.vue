<template>
  <span title="Edit Profile" class="icon has-text-info" @click="toggleShow"
    ><i class="fas fa-pencil-alt"></i
  ></span>

  <ProfileModal :show="show" :close="toggleShow" />
</template>

<script>
import { ref } from "vue";
import ProfileModal from "./ProfileModal";

export default {
  components: { ProfileModal },
  setup() {
    const show = ref(false);
    const toggleShow = () => {
      show.value = !show.value;
    };

    return { show, toggleShow };
  },
};
</script>

<style scoped>
.icon.has-text-info {
  cursor: pointer;
  font-size: 1.3rem;
}
</style>