import { auth, db, firestore } from "../../firebase";

export default {
  state() {
    return {
      user: null,
      displayName: null,
    };
  },
  getters: {
    user(state) {
      return state.user;
    },
    displayName(state) {
      return state.displayName;
    },
  },
  mutations: {
    login(state, user) {
      state.user = user;
      state.displayName = user.displayName;
    },
    logout(state) {
      state.user = null;
      state.displayName = null;
    },
  },
  actions: {
    tryLogin({ commit }) {
      setTimeout(() => {
        if (auth.currentUser) {
          commit("login", auth.currentUser);
        }
      }, 400);
    },
    async login({ commit }, payload) {
      const authUser = await auth.signInWithEmailAndPassword(
        payload.email,
        payload.password
      );
      commit("login", authUser.user);
    },

    async signup({ commit }, payload) {
      const authUser = await auth.createUserWithEmailAndPassword(
        payload.email,
        payload.password
      );
      commit("login", authUser.user);

      await authUser.user.updateProfile({
        displayName: `${payload.firstname} ${payload.surname}`,
      });

      const new_user = {
        email: payload.email,
        firstname: payload.firstname,
        surname: payload.surname,
        userId: authUser.user.uid,
        created_at: firestore.FieldValue.serverTimestamp(),
      };

      await db.collection("users").add(new_user);
    },
    logout({ commit }) {
      auth.signOut();
      commit("logout");
    },
  },
};
