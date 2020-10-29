<template>
  <div class="field">
    <label v-if="label" class="label">{{ label }}</label>
    <div class="control" :class="{ 'has-icons-left': !!icon }">
      <input
        class="input"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="handleInput"
      />
      <span v-if="!!icon" class="icon is-small is-left">
        <i :class="`fas ${icon}`"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["type", "icon", "placeholder", "modelValue", "label"],
  emits: ["update:modelValue"],
  setup(_, context) {
    const handleInput = (e) => {
      context.emit("update:modelValue", e.target.value);
    };

    return {
      handleInput,
    };
  },
};
</script>
