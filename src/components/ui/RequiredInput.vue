<template>
  <div class="field">
    <div class="control has-icons-right" :class="{ 'has-icons-left': !!icon }">
      <input
        class="input"
        :class="{ 'is-danger': invalid }"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="handleInput"
        @blur="validateInput"
        @focus="invalid = false"
        required
      />
      <span v-if="!!icon" class="icon is-small is-left">
        <i :class="`fas ${icon}`"></i>
      </span>
      <span v-if="invalid" class="icon is-small is-right has-text-danger">
        <i class="fas fa-exclamation-circle"></i>
      </span>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: ["type", "icon", "placeholder", "modelValue", "validate"],
  emits: ["update:modelValue"],
  setup(props, context) {
    const invalid = ref(false);

    const validateInput = () => {
      if (props.validate) {
        invalid.value = props.validate(props.modelValue);
      }
      if (props.modelValue === "") {
        invalid.value = true;
      }
    };

    const handleInput = (e) => {
      context.emit("update:modelValue", e.target.value);
    };

    return {
      invalid,
      handleInput,
      validateInput,
    };
  },
};
</script>