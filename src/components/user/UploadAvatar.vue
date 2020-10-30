<template>
  <teleport to="body">
    <div v-if="show" class="modal is-active">
      <div class="modal-background" @click="onClose"></div>
      <div class="modal-content">
        <div class="box">
          <div class="control has-icons-right">
            <h4 class="title is-4 has-text-centered">Upload Avatar</h4>
            <span class="icon is-small is-right" @click="onClose">
              <i class="fas fa-times-circle"></i>
            </span>
          </div>

          <hr class="mb-3" />

          <div v-if="imageSrc" class="previewAvatar" title="Preview Avatar">
            <img :src="imageSrc" alt="Preview Avatar" />
          </div>

          <form @submit.prevent="upload" class="my-2">
            <div class="file" :class="{ 'has-name': fileName }">
              <label class="file-label">
                <input class="file-input" type="file" @change="fileChange" />
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label"> Choose an image... </span>
                </span>
                <span class="file-name" v-if="fileName">
                  {{ fileName }}
                </span>
              </label>
            </div>

            <div class="field is-grouped is-justify-content-center mt-3">
              <div class="control">
                <button type="submit" :disabled="!file" class="button is-link">
                  Save
                </button>
              </div>
              <div class="control">
                <button @click.stop="onClose" class="button is-link is-light">
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  props: ["show", "close"],
  setup(props) {
    const fileName = ref("");
    const imageSrc = ref("");
    const store = useStore();
    const file = ref(null);

    const fileChange = ({ target }) => {
      file.value = null;
      if (target.files[0] && target.files[0].type.startsWith("image/")) {
        imageSrc.value = URL.createObjectURL(target.files[0]);
        fileName.value = target.files[0].name;
        file.value = target.files[0];
      }
    };

    const onClose = () => {
      fileName.value = "";
      imageSrc.value = "";
      props.close();
    };

    const upload = async () => {
      await store.dispatch("updateUserAvatar", file.value);
      onClose();
    };

    return {
      imageSrc,
      fileName,
      fileChange,
      onClose,
      upload,
      file,
    };
  },
};
</script>

<style scoped>
i.fa-times-circle {
  pointer-events: auto;
  cursor: pointer;
  transform: translateY(-0.7rem);
  font-size: 2rem;
}
i.fa-times-circle:hover {
  color: #c0c0c0;
}
.previewAvatar {
  /* margin: 2rem auto; */
  text-align: center;
}
</style>