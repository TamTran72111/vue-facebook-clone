import { db, firestore } from "../../firebase";

const Comments = db.collection("comments");

export default {
  async fetchPostComments({ commit }, postId) {
    const comments = await Comments.where("postId", "==", postId)
      .orderBy("created_at", "asc")
      .get();

    commit("fetchComments", {
      postId: postId,
      comments: comments.docs.map((comment) => ({
        id: comment.id,
        ...comment.data(),
      })),
    });
  },
  async createComment({ dispatch, rootGetters }, { postId, comment }) {
    await Comments.add({
      postId,
      comment,
      userId: rootGetters.userId,
      displayName: rootGetters.displayName,
      userAvatar: rootGetters.userAvatar,
      created_at: firestore.FieldValue.serverTimestamp(),
    });

    // Increase the comment count of the corresponding post
    dispatch("updatePostComment", { postId, commentChange: 1 });
  },
  async editComment({ commit }, { postId, commentId, comment }) {
    await Comments.doc(commentId).update({
      comment,
    });
    commit("editComment", { postId, commentId, comment });
  },
  async deleteComment({ commit, dispatch }, { commentId, postId }) {
    commit("deleteComment", { commentId, postId });

    await Comments.doc(commentId).delete();

    // Decrease the comment count of the corresponding post
    await dispatch("updatePostComment", { postId, commentChange: -1 });
  },
  async deletePostComments(_, postId) {
    // Delete all comments related a post when the post is deleted.
    const comments = await Comments.where("postId", "==", postId).get();
    comments.docs.forEach((comment) => comment.ref.delete());

    // Deleted comments still exist in the store's state, but it
    // does not cause any problem, so just leave it there.
  },
};
