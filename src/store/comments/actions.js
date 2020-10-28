import { db, firestore } from "../../firebase";

export default {
  async fetchPostComments({ commit }, postId) {
    const comments = await db
      .collection("comments")
      .where("postId", "==", postId)
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
  async fetchComments({ dispatch }, postIndices) {
    postIndices.forEach(async (postId) => {
      await dispatch("fetchPostComments", postId);
    });
  },
  async createComment({ commit, dispatch, rootGetters }, { postId, comment }) {
    const newComment = {
      postId,
      comment,
      userId: rootGetters.userId,
      displayName: rootGetters.displayName,
      userAvatar: rootGetters.userAvatar,
    };
    const newCommentDoc = await db.collection("comments").add({
      ...newComment,
      created_at: firestore.FieldValue.serverTimestamp(),
    });

    // Increase the comment count of the corresponding post
    dispatch("updatePostComment", { postId, commentChange: 1 });

    commit("addComment", {
      id: newCommentDoc.id,
      ...newComment,
    });
  },
  async editComment({ commit }, { postId, commentId, comment }) {
    await db
      .collection("comments")
      .doc(commentId)
      .update({
        comment,
      });
    commit("editComment", { postId, commentId, comment });
  },
  async deleteComment({ commit, dispatch }, { commentId, postId }) {
    commit("deleteComment", { commentId, postId });

    await db
      .collection("comments")
      .doc(commentId)
      .delete();

    // Decrease the comment count of the corresponding post
    await dispatch("updatePostComment", { postId, commentChange: -1 });
  },
};
