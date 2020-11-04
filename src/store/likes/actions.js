import { db, firestore } from "../../firebase";

const Likes = db.collection("likes");

export default {
  async fetchLikes({ commit, rootGetters }) {
    const like_docs = await Likes.where(
      "userId",
      "==",
      rootGetters.userId
    ).get();

    const likes = like_docs.docs.map((like) => ({
      id: like.id,
      ...like.data(),
    }));

    commit("fetchLikes", likes);
  },
  async like({ commit, dispatch, rootGetters }, postId) {
    const new_like = {
      userId: rootGetters.userId,
      postId: postId,
    };
    const like = await Likes.add({
      ...new_like,
      created_at: firestore.FieldValue.serverTimestamp(),
    });

    // Increase the like count of the corresponding post.
    await dispatch("updatePostLike", {
      postId,
      likeChange: 1,
    });
    await dispatch("createLikeNotification", postId);
    commit("like", {
      id: like.id,
      ...new_like,
    });
  },
  async unlike({ commit, dispatch, getters }, postId) {
    const liked = getters.likes.filter((like) => like.postId === postId);

    // Cannot unlike if not found the like
    if (liked.length > 0) {
      const likeId = liked[0].id;

      await Likes.doc(likeId).delete();

      // Decrease the like count of the corresponding post.
      await dispatch("updatePostLike", {
        postId,
        likeChange: -1,
      });

      commit("unlike", likeId);
    }
  },
  async deletePostLikes(_, postId) {
    // Delete all likes related a post when the post is deleted.
    const likes = await Likes.where("postId", "==", postId).get();
    likes.docs.forEach((like) => like.ref.delete());

    // Deleted likes still exist in the store's state, but it
    // does not cause any problem, so just leave it there.
  },
};
