import { db } from "../../firebase";

const User = db.collection("users");

export default {
  async fetchUser({ commit }, userId) {
    const user = await User.doc(userId).get();
    commit("fetchUser", {
      userId,
      ...user.data(),
    });
  },
  clearUser({ commit }) {
    commit("clearUser");
  },
  async editProfile({ commit }, { userId, profile }) {
    await User.doc(userId).update(profile);
    commit("editProfile", profile);
  },
};
