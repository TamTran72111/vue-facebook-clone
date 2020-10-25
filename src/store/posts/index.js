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
  },
  actions: {
    async createPost({ commit, rootGetters }, post) {
      const newPost = await db.collection("posts").add({
        userId: rootGetters.userId,
        displayName: rootGetters.displayName,
        post,
        userAvatar: rootGetters.userAvatar,
        created_at: firestore.FieldValue.serverTimestamp(),
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
  },
};
