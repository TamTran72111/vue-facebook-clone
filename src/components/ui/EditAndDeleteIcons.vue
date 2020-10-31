<template>
  <div
    v-if="isAuthor"
    class="dropdown"
    :class="{ 'is-active': showDropdown }"
    @click="toggleDropdown"
  >
    <div class="dropdown-trigger">
      <span class="icon">
        <i class="fas fa-ellipsis-v"></i>
      </span>
    </div>
    <div class="dropdown-menu">
      <div class="dropdown-content">
        <div class="dropdown-item" @click="toggleEdit">
          <span>Edit</span>
          <span class="icon has-text-info"
            ><i class="fas fa-pencil-alt"></i
          ></span>
        </div>
        <div class="dropdown-item" @click="toggleDelete">
          <span>Delete</span>
          <span class="icon has-text-danger"
            ><i class="fas fa-trash-alt"></i
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: ["isAuthor", "toggleEdit", "toggleDelete"],
  setup() {
    const showDropdown = ref(false);
    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
    };
    return { showDropdown, toggleDropdown };
  },
};
</script>

<style scoped>
.dropdown {
  cursor: pointer;
}
.dropdown-menu {
  transform: translateX(-90%);
}

/* .dropdown-content */
.dropdown-menu {
  min-width: 6.5rem;
}
.dropdown-item {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

.dropdown-item:hover {
  background: #e0e0e0;
}
</style>