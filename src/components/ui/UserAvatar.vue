<template>
  <router-link :to="`/users/${userId}`"
    ><figure class="image" :class="size">
      <img class="is-rounded" :src="src" alt="User avatar" /></figure
  ></router-link>
</template>

<script>
import { computed } from "vue";

export default {
  props: ["type", "src", "userId"],
  setup(props) {
    const size = computed(() => {
      if (props.type === "comment") {
        return "is-32x32";
      } else if (props.type === "subcomment") {
        return "is-24x24";
      } else {
        return "is-48x48";
      }
    });

    return { size };
  },
};
</script>