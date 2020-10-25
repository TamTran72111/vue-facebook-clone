import { auth, db, firestore } from "../../firebase";

const defaultUserAvatar =
  "https://firebasestorage.googleapis.com/v0/b/vue-projects-89c61.appspot.com/o/avatars%2Fdefault-user-avater.png?alt=media&token=55e5edb1-e550-4161-8ee0-3e72d2d2a20f";

export default {
  state() {
    return {
      user: null,
    };
  },
  getters: {
    displayName(state) {
      return state.user.displayName;
    },
    userAvatar(state) {
      return state.user.avatar;
    },
    isLoggedIn(state) {
      return state.user !== null;
    },
    userId(state) {
      return state.user.id;
    },
  },
  mutations: {
    login(state, user) {
      state.user = user;
    },
    logout(state) {
      state.user = null;
    },
  },
  actions: {
    async tryLogin({ dispatch }) {
      setTimeout(() => {
        if (auth.currentUser) {
          dispatch("loginWithUid", auth.currentUser.uid);
        }
      }, 400);
    },
    async login({ dispatch }, payload) {
      const authUser = await auth.signInWithEmailAndPassword(
        payload.email,
        payload.password
      );
      await dispatch("loginWithUid", authUser.user.uid);
    },
    async signup({ dispatch }, payload) {
      const authUser = await auth.createUserWithEmailAndPassword(
        payload.email,
        payload.password
      );

      const displayName = `${payload.firstname} ${payload.surname}`;

      await db
        .collection("users")
        .doc(authUser.user.uid)
        .set({
          email: payload.email,
          firstname: payload.firstname,
          surname: payload.surname,
          displayName,
          avatar: defaultUserAvatar,
          created_at: firestore.FieldValue.serverTimestamp(),
        });

      await dispatch("loginWithUid", authUser.user.uid);
    },
    async loginWithUid({ commit }, uid) {
      const new_user = await db
        .collection("users")
        .doc(uid)
        .get();

      commit("login", {
        id: uid,
        ...new_user.data(),
      });
    },
    logout({ commit }) {
      auth.signOut();
      commit("logout");
    },
  },
};
