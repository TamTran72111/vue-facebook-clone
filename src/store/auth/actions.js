import { auth, db, firestore } from "../../firebase";

const defaultUserAvatar =
  "https://firebasestorage.googleapis.com/v0/b/vue-projects-89c61.appspot.com/o/avatars%2Fdefault-user-avater.png?alt=media&token=55e5edb1-e550-4161-8ee0-3e72d2d2a20f";

export default {
  setupAuthListener({ dispatch, commit }) {
    const listener = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is authenticated, so fetch the user's info
        dispatch("loginWithUserId", user.uid);
      }
    });
    commit("setupAuthListener", listener);
  },
  cleanupAuthListener({ commit }) {
    commit("cleanupAuthListener");
  },
  async login(_, payload) {
    await auth.signInWithEmailAndPassword(payload.email, payload.password);
  },
  async signup({ commit }, payload) {
    const authUser = await auth.createUserWithEmailAndPassword(
      payload.email,
      payload.password
    );

    const displayName = `${payload.firstname} ${payload.surname}`;

    const newUser = {
      email: payload.email,
      firstname: payload.firstname,
      surname: payload.surname,
      displayName,
      avatar: defaultUserAvatar,
    };

    await db
      .collection("users")
      .doc(authUser.user.uid)
      .set({
        ...newUser,
        created_at: firestore.FieldValue.serverTimestamp(),
      });

    commit("login", {
      id: authUser.user.uid,
      ...newUser,
    });
  },
  async loginWithUserId({ commit, dispatch }, userId) {
    const newUser = await db
      .collection("users")
      .doc(userId)
      .get();

    commit("login", {
      id: userId,
      ...newUser.data(),
    });
    dispatch("fetchLikes");
    dispatch("fetchFollows");
    dispatch("fetchNotifications");
  },
  logout({ commit, dispatch }) {
    auth.signOut();
    dispatch("clearNotifications");
    commit("logout");
  },
};
