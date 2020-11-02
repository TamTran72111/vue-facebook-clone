import { auth, db, firestore } from "../../firebase";

const defaultUserAvatar =
  "https://firebasestorage.googleapis.com/v0/b/vue-projects-89c61.appspot.com/o/avatars%2Fdefault-user-avater.png?alt=media&token=55e5edb1-e550-4161-8ee0-3e72d2d2a20f";

export default {
  tryLogin({ dispatch }) {
    setTimeout(() => {
      // Try to login when users manually navigate using URL
      if (auth.currentUser) {
        dispatch("loginWithUserId", auth.currentUser.uid);
      }
    }, 400);
  },
  async login({ dispatch }, payload) {
    const authUser = await auth.signInWithEmailAndPassword(
      payload.email,
      payload.password
    );
    await dispatch("loginWithUserId", authUser.user.uid);
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
  },
  logout({ commit }) {
    auth.signOut();
    commit("logout");
  },
};
