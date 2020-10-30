import { db } from "../../firebase";

const User = db.collection("users");

export default {
  async fetchUser({ commit, dispatch }, userId) {
    const user = await User.doc(userId).get();
    commit("fetchUser", {
      userId,
      ...user.data(),
    });
    dispatch("fetchUserPosts", userId);
  },
  clearUser({ commit, dispatch }) {
    commit("clearUser");
    dispatch("clearPosts");
  },
  async editProfile({ commit }, { userId, profile }) {
    await User.doc(userId).update(profile);
    commit("editProfile", profile);
  },
};
