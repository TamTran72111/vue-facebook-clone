<template>
  <div v-if="show" class="modal is-active">
    <div class="modal-background" @click="close"></div>
    <div class="modal-content">
      <div class="box">
        <div class="control has-icons-right">
          <h4 class="title is-4 has-text-centered">{{ title }}</h4>
          <span class="icon is-small is-right" @click="close">
            <i class="fas fa-times-circle"></i>
          </span>
        </div>

        <hr class="mb-1" />

        <div class="card-content py-2">
          <div class="media">
            <div class="media-left">
              <UserAvatar :src="userAvatar" :userId="userId" />
            </div>
            <div class="media-content is-align-self-center">
              <p class="title is-5">{{ displayName }}</p>
            </div>
          </div>

          <div class="content mt-3">
            <div class="field">
              <div class="control">
                <textarea
                  ref="textarea"
                  rows="5"
                  class="textarea"
                  :placeholder="placeholder"
                  :value="modelValue"
                  @input="handleInput"
                ></textarea>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <button
                  :disabled="disabled"
                  class="button is-info is-fullwidth has-text-weight-semibold"
                  @click="buttonClick"
                >
                  {{ buttonText }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";

import UserAvatar from "../ui/UserAvatar";

export default {
  props: [
    "title",
    "show",
    "modelValue",
    "close",
    "buttonClick",
    "placeholder",
    "buttonText",
  ],
  emits: ["update:modelValue"],
  components: { UserAvatar },
  setup(props, { emit }) {
    const store = useStore();

    const displayName = computed(() => store.getters.displayName);
    const userAvatar = computed(() => store.getters.userAvatar);
    const userId = computed(() => store.getters.userId);

    const disabled = computed(() => props.modelValue === "");

    const handleInput = (e) => {
      emit("update:modelValue", e.target.value);
    };

    const textarea = ref(null);
    watch(props, () => {
      if (props.show) {
        setTimeout(() => {
          textarea.value.focus();
        }, 200);
      }
    });

    return { handleInput, disabled, displayName, userAvatar, userId, textarea };
  },
};
</script>

<style scoped>
span.icon.is-right {
  transform: translateY(-1.7rem);
  font-size: 2rem;
}

i.fa-times-circle {
  pointer-events: auto;
  cursor: pointer;
}

i.fa-times-circle:hover {
  color: #c0c0c0;
}
</style>