<template>
  <teleport to="body">
    <div v-if="show" class="modal is-active">
      <div class="modal-background" @click="close"></div>
      <div class="modal-content">
        <div class="box">
          <div class="control has-icons-right">
            <h4 class="title is-4 has-text-centered">Edit Profile</h4>
            <span class="icon is-small is-right" @click="close">
              <i class="fas fa-times-circle"></i>
            </span>
          </div>

          <hr class="mb-3" />
          <form @submit.prevent="editProfile">
            <div class="doubleField">
              <RequiredInput
                type="text"
                label="First Name"
                placeholder="First Name"
                v-model.trim="firstname"
              />
              <RequiredInput
                type="text"
                label="Surname"
                placeholder="Surname"
                v-model.trim="surname"
              />
            </div>

            <div class="doubleField">
              <RequiredInput
                type="text"
                label="Display name"
                placeholder="Display Name"
                v-model.trim="displayName"
              />
              <UnrequiredInput
                type="text"
                label="Location"
                placeholder="Location"
                v-model.trim="location"
                icon="fa-map-marker-alt has-text-info"
              />
            </div>
            <UnrequiredInput
              type="text"
              label="Bio"
              placeholder="Bio"
              v-model.trim="bio"
            />

            <div class="field is-grouped is-justify-content-center">
              <div class="control">
                <button
                  type="submit"
                  :disabled="isInvalid"
                  class="button is-link"
                >
                  Save
                </button>
              </div>
              <div class="control">
                <button @click.stop="close" class="button is-link is-light">
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
import { computed, onMounted, ref } from "vue";
import RequiredInput from "../ui/RequiredInput";
import UnrequiredInput from "../ui/UnrequiredInput";
import { useStore } from "vuex";

export default {
  props: ["show", "close"],
  components: { RequiredInput, UnrequiredInput },
  setup(props) {
    const store = useStore();

    const user = computed(() => store.getters.user);
    const firstname = ref("");
    const surname = ref("");
    const displayName = ref("");
    const bio = ref("");
    const location = ref("");

    onMounted(() => {
      firstname.value = user.value?.firstname;
      surname.value = user.value?.surname;
      displayName.value = user.value?.displayName;
      bio.value = user.value?.bio;
      location.value = user.value?.location;
    });

    const editProfile = async () => {
      const oldDisplayName = user.value.displayName;
      if (
        firstname.value !== user.value.firstname ||
        surname.value !== user.value.surname ||
        displayName.value !== user.value.displayName ||
        bio.value !== user.value.bio ||
        location.value !== user.value.location
      ) {
        await store.dispatch("editProfile", {
          userId: user.value.userId,
          profile: {
            firstname: firstname.value,
            surname: surname.value,
            displayName: displayName.value,
            bio: bio.value,
            location: location.value,
          },
        });
      }
      if (oldDisplayName !== displayName.value) {
        await store.dispatch("updateCommentUserData", {
          userId: user.value.userId,
          displayName: displayName.value,
        });
        await store.dispatch("updatePostUserData", {
          displayName: displayName.value,
        });
      }
      props.close();
    };

    const isInvalid = computed(() => {
      return (
        displayName.value === "" ||
        firstname.value === "" ||
        surname.value === ""
      );
    });

    return {
      firstname,
      surname,
      displayName,
      bio,
      location,
      editProfile,
      isInvalid,
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
.doubleField {
  display: flex;
  justify-content: space-between;
}

button.button {
  width: 80px;
}
</style>