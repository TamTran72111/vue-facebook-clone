import { db, firestore } from "../../firebase";

const Notifications = db.collection("notifications");
export const notificationType = {
  CREATE_NEW_POST: "CREATE_NEW_POST",
  LIKE_POST: "LIKE_POST",
  COMMENT_ON_POST: "COMMENT_ON_POST",
};

export default {
  async fetchNotifications({ commit, rootGetters }) {
    const notifications = await Notifications.where(
      "receiver",
      "==",
      rootGetters.userId
    )
      .orderBy("created_at", "desc")
      .get();

    commit(
      "fetchNotifications",
      notifications.docs.map((notification) => ({
        id: notification.id,
        ...notification.data(),
      }))
    );
  },
  async createNotification({ rootGetters }, { postId, type }) {
    const postIndex = rootGetters.posts.findIndex((post) => postId === post.id);
    const post = rootGetters.posts[postIndex];
    const newNotification = {
      postId,
      sender: rootGetters.displayName,
      receiver: post.userId,
      type,
      created_at: firestore.FieldValue.serverTimestamp(),
    };
    await Notifications.add(newNotification);
  },
  async createLikeNotification({ dispatch }, postId) {
    await dispatch("createNotification", {
      postId,
      type: notificationType.LIKE_POST,
    });
  },
  removeNotification(_, notificationId) {
    Notifications.doc(notificationId).delete();
  },
  async createCommentNotification({ dispatch }, postId) {
    await dispatch("createNotification", {
      postId,
      type: notificationType.COMMENT_ON_POST,
    });
  },
};
