<template>
  <teleport to="body">
    <div v-if="error != ''" class="modal-background" @click="resetError"></div>
    <transition name="slide">
      <div
        v-if="error != ''"
        @click="resetError"
        class="modal-content has-text-black"
      >
        <div class="box has-background-danger">{{ error }}</div>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  props: ["error", "resetError"],
};
</script>

<style scoped>
.modal-content {
  position: absolute;
  width: 100%;
  top: 50px;
  z-index: 100;
  margin: 0;
}
.modal-content .box {
  margin: auto;
  max-width: 600px;
}

.modal-background {
  z-index: 100;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 1s ease;
}
</style>