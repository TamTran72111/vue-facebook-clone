import { db, firestore } from "../../firebase";

const Posts = db.collection("posts");

export default {
  async fetchPosts({ commit, dispatch }, PostQuery = Posts) {
    const unsubscribe = await PostQuery.orderBy(
      "created_at",
      "desc"
    ).onSnapshot((snapshot) => {
      // Update posts on snapshot change
      const posts = snapshot.docs.map((post) => ({
        id: post.id,
        ...post.data(),
      }));
      commit("fetchPosts", posts);

      // Update comments for changed posts (added and modified only)
      snapshot.docChanges().forEach((change) => {
        if (change.type === "modified" || change.type === "added") {
          dispatch("fetchPostComments", change.doc.id);
        }
      });
    });
    commit("addPostListener", unsubscribe);
  },
  async fetchUserPosts({ dispatch }, userId) {
    dispatch("fetchPosts", Posts.where("userId", "==", userId));
  },
  createPost({ rootGetters }, post) {
    Posts.add({
      userId: rootGetters.userId,
      displayName: rootGetters.displayName,
      post,
      userAvatar: rootGetters.userAvatar,
      created_at: firestore.FieldValue.serverTimestamp(),
      likes: 0,
      comments: 0,
    });
  },
  clearPosts({ commit }) {
    commit("clearPosts");
  },
  async editPost(_, { postId, post }) {
    await Posts.doc(postId).update({ post });
  },
  async deletePost({ dispatch }, postId) {
    await Posts.doc(postId).delete();

    await dispatch("deletePostLikes", postId);
    await dispatch("deletePostComments", postId);
  },
  async updatePostLike({ getters }, { postId, likeChange }) {
    const likedPostIndex = getters.posts.findIndex(
      (post) => post.id === postId
    );

    const likedPost = getters.posts[likedPostIndex];

    likedPost.likes += likeChange;
    await Posts.doc(postId).update({ likes: likedPost.likes });
  },
  async updatePostComment({ getters }, { postId, commentChange }) {
    const commentedPostIndex = getters.posts.findIndex(
      (post) => post.id === postId
    );

    const commentedPost = getters.posts[commentedPostIndex];
    commentedPost.comments += commentChange;
    await Posts.doc(postId).update({ comments: commentedPost.comments });
  },
  async updatePostUserData({ rootGetters }, newUserData) {
    const posts = rootGetters.posts;
    const batch = db.batch();
    posts.forEach((post) => {
      batch.update(Posts.doc(post.id), newUserData);
    });
    await batch.commit();
  },
};
