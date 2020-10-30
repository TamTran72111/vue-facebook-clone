import { db, storage } from "../../firebase";

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
  async updateUserAvatar({ rootGetters, dispatch }, file) {
    const fileExtension = file.type.substr(6, 10);
    const fileName = `avatars/${rootGetters.userId}.${fileExtension}`;
    await storage.ref(fileName).put(file);
    const userAvatar = await storage.ref(fileName).getDownloadURL();
    if (rootGetters.userAvatar !== userAvatar) {
      await dispatch("editProfile", {
        userId: rootGetters.userId,
        profile: { avatar: userAvatar },
      });
      await dispatch("updatePostUserData", { userAvatar });
      await dispatch("updateCommentUserData", {
        userId: rootGetters.userId,
        userAvatar,
      });
    }
  },
};
