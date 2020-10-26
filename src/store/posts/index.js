import { db, firestore } from "../../firebase";

export default {
  state() {
    return {
      posts: [],
    };
  },
  getters: {
    posts(state) {
      return state.posts;
    },
  },
  mutations: {
    addPost(state, post) {
      state.posts.unshift(post);
    },
    addPosts(state, posts) {
      state.posts = [...state.posts, ...posts];
    },
    clearPosts(state) {
      state.posts = [];
    },
    editPost(state, { postId, post }) {
      const postIndex = state.posts.findIndex((post) => post.id === postId);
      state.posts[postIndex].post = post;
    },
    deletePost(state, postId) {
      state.posts = state.posts.filter((post) => post.id !== postId);
    },
  },
  actions: {
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
    async fetchPosts({ commit }) {
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
    },
    clearPosts({ commit }) {
      commit("clearPosts");
    },

    async updatePostLike({ getters }, payload) {
      const likedPostIndex = getters.posts.findIndex(
        (post) => post.id === payload.postId
      );

      const likedPost = getters.posts[likedPostIndex];

      likedPost.likes += payload.likeChange;
      await db
        .collection("posts")
        .doc(likedPost.id)
        .update({ likes: likedPost.likes });
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
  },
};
