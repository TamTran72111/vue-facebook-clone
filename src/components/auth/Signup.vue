<template>
  <div v-if="show" class="modal is-active">
    <ErrorMessage :error="error" :resetError="resetError" />
    <div class="modal-background" @click="hide"></div>
    <div class="modal-content">
      <div class="box">
        <h3 class="title is-2 mb-2">Sign Up</h3>
        <span class="has-text-grey">It's quick and easy.</span>
        <hr class="is-fullwidth" />

        <form @submit.prevent="signup">
          <div class="field is-justify-content-space-between">
            <RequiredInput
              type="text"
              placeholder="First Name"
              v-model.trim="firstname"
            />
            <RequiredInput
              type="text"
              placeholder="Surname"
              v-model.trim="surname"
            />
          </div>

          <RequiredInput
            type="email"
            placeholder="Email"
            v-model.trim="email"
            icon="fa-envelope"
          />

          <RequiredInput
            type="password"
            placeholder="New password"
            v-model="password"
            icon="fa-lock"
          />

          <span class="has-text-light-grey is-size-7"
            >By clicking Sign Up, you agree to our
            <a
              href="https://www.facebook.com/legal/terms/update"
              target="_blank"
              rel="noopener noreferrer"
              >Terms</a
            >,
            <a
              href="https://www.facebook.com/about/privacy/update"
              target="_blank"
              rel="noopener noreferrer"
              >Data Policy</a
            >
            and
            <a
              href="http://https://www.facebook.com/policies/cookies/"
              target="_blank"
              rel="noopener noreferrer"
              >Cookie Policy</a
            >. You may receive SMS notifications from us and can opt out at any
            time.</span
          >

          <div class="field my-3 has-text-centered">
            <div class="control">
              <button class="button is-success is-size-5 has-text-weight-bold">
                Sign up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import RequiredInput from "../ui/RequiredInput";
import ErrorMessage from "../modals/ErrorMessage";

export default {
  props: ["show", "hide"],
  components: {
    RequiredInput,
    ErrorMessage,
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const email = ref("");
    const password = ref("");
    const firstname = ref("");
    const surname = ref("");

    const error = ref("");
    const resetError = () => {
      error.value = "";
    };

    const signup = async () => {
      try {
        await store.dispatch("signup", {
          email: email.value,
          password: password.value,
          firstname: firstname.value,
          surname: surname.value,
        });
        router.replace({ name: "home" });
      } catch (err) {
        error.value = err.message;
      }
    };

    return { signup, email, password, firstname, surname, error, resetError };
  },
};
</script>

<style scoped>
.field.is-justify-content-space-between {
  display: flex;
}

.box {
  max-width: 500px;
}

a.button {
  height: 40px;
  width: 180px;
}
</style>