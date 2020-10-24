<template>
  <form @submit.prevent="login" @click="resetError">
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

    <div class="field">
      <div class="control">
        <button
          class="button is-link is-fullwidth is-size-5 has-text-weight-bold"
          type="submit"
        >
          Login
        </button>
      </div>
    </div>

    <div class="has-text-centered">
      <a class="is-link">Forgotten password?</a>
    </div>

    <hr />

    <div class="field has-text-centered">
      <div class="control">
        <a
          class="button is-success is-size-5 has-text-weight-bold"
          @click="toggleSignup"
        >
          Create new account
        </a>
      </div>
    </div>
  </form>
  <ErrorMessage :resetError="resetError" :error="error" />
  <Signup :show="showSignup" :hide="toggleSignup" />
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import RequiredInput from "../ui/RequiredInput";
import ErrorMessage from "../modals/ErrorMessage";
import Signup from "./Signup";

export default {
  components: {
    ErrorMessage,
    Signup,
    RequiredInput,
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const email = ref("");
    const password = ref("");

    const error = ref("");
    const resetError = () => {
      if (error.value !== "") {
        error.value = "";
      }
    };

    const login = async () => {
      if (password.value.length >= 6) {
        try {
          await store.dispatch("login", {
            email: email.value,
            password: password.value,
          });
          router.replace({ name: "home" });
        } catch (err) {
          error.value = err.message;
        }
      } else {
        error.value = "Password should be at least 6 characters";
      }
    };

    const showSignup = ref(false);
    const toggleSignup = () => {
      showSignup.value = !showSignup.value;
    };

    return {
      email,
      password,
      login,
      error,
      resetError,
      toggleSignup,
      showSignup,
    };
  },
};
</script>

<style scoped>
form {
  width: 400px;
  margin: auto;
  padding: 2rem;
  border: 2px solid black;
  border-radius: 10px;
  background-color: #fff;
}

form .login {
  width: 100%;
}

form hr {
  border-top: 1px solid black;
  border-bottom: none;
}
</style>