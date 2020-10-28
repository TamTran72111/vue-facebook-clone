import { db, firestore } from "../../firebase";

const Posts = db.collection("posts");

export default {
  async fetchPosts({ commit, dispatch }) {
    const post_docs = await Posts.orderBy("created_at", "desc").get();

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
    const newPost = await Posts.add({
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
    await Posts.doc(postId).update({ post });
    commit("editPost", { postId, post });
  },
  async deletePost({ commit, dispatch }, postId) {
    await Posts.doc(postId).delete();
    commit("deletePost", postId);

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
};
