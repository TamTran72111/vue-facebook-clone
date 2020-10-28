import { db, firestore } from "../../firebase";

export default {
  async fetchPosts({ commit, dispatch }) {
    const post_docs = await db
      .collection("posts")
      .orderBy("created_at", "desc")
      .get();

    const posts = post_docs.docs.map((post) => ({
      id: post.id,
      ...post.data(),
    }));

    if (posts.length > 0) {
      commit("addPosts", posts);
    }

    dispatch(
      "fetchComments",
      posts.map((post) => post.id)
    );
  },
  async createPost({ commit, rootGetters }, post) {
    const newPost = await db.collection("posts").add({
      userId: rootGetters.userId,
      displayName: rootGetters.displayName,
      post,
      userAvatar: rootGetters.userAvatar,
      created_at: firestore.FieldValue.serverTimestamp(),
      likes: 0,
      comments: 0,
    });

    const newPostData = await newPost.get();
    commit("addPost", { id: newPostData.id, ...newPostData.data() });
  },
  clearPosts({ commit }) {
    commit("clearPosts");
  },
  async editPost({ commit }, { postId, post }) {
    await db
      .collection("posts")
      .doc(postId)
      .update({ post });
    commit("editPost", { postId, post });
  },
  async deletePost({ commit }, postId) {
    await db
      .collection("posts")
      .doc(postId)
      .delete();
    commit("deletePost", postId);
  },
  async updatePostLike({ getters }, { postId, likeChange }) {
    const likedPostIndex = getters.posts.findIndex(
      (post) => post.id === postId
    );

    const likedPost = getters.posts[likedPostIndex];

    likedPost.likes += likeChange;
    await db
      .collection("posts")
      .doc(postId)
      .update({ likes: likedPost.likes });
  },
  async updatePostComment({ getters }, { postId, commentChange }) {
    const commentedPostIndex = getters.posts.findIndex(
      (post) => post.id === postId
    );

    const commentedPost = getters.posts[commentedPostIndex];
    commentedPost.comments += commentChange;
    await db
      .collection("posts")
      .doc(postId)
      .update({ comments: commentedPost.comments });
  },
  // async createComment({ commit, getters, rootGetters }, { postId, comment }) {
  //   const newComment_doc = await db.collection("comments").add({
  //     postId,
  //     comment,
  //     userId: rootGetters.userId,
  //     displayName: rootGetters.displayName,
  //     userAvatar: rootGetters.userAvatar,
  //     created_at: firestore.FieldValue.serverTimestamp(),
  //   });

  //   const postIndex = getters.posts.findIndex((post) => post.id === postId);

  //   getters.posts[postIndex].comments++;

  //   await db
  //     .collection("posts")
  //     .doc(postId)
  //     .update({
  //       comments: getters.posts[postIndex].comments,
  //     });

  //   const newComment = await newComment_doc.get();
  //   commit("addComment", {
  //     id: newComment.id,
  //     ...newComment.data(),
  //   });
  // },

  // async deleteComment({ commit }, { commentId, postId }) {
  //   await db
  //     .collection("comments")
  //     .doc(commentId)
  //     .delete();
  //   commit("deleteComment", { commentId, postId });
  // },

  // async editComment({ commit }, { postId, commentId, comment }) {
  //   await db
  //     .collection("comments")
  //     .doc(commentId)
  //     .update({
  //       comment,
  //     });
  //   commit("editComment", { postId, commentId, comment });
  // },
};
