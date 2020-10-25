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
  },
};
