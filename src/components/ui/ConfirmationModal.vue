<template>
  <div v-if="show" class="modal is-active">
    <div class="modal-background" @click="close"></div>
    <div class="modal-card">
      <header class="modal-card-head" :class="titleClass">
        <p class="modal-card-title" :class="titleClass">{{ title }}</p>
        <button class="delete" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <slot></slot>
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button class="button" @click="close">Cancel</button>
        <button class="button" :class="titleClass" @click="confirm">
          {{ buttonText }}
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  props: ["isDelete", "title", "show", "close", "buttonText", "confirm"],
  setup(props) {
    const titleClass = computed(() => {
      if (props.isDelete) {
        return "has-background-danger ";
      } else {
        return "has-background-info";
      }
    });
    return { titleClass };
  },
};
</script>