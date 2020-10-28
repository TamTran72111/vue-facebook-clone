export default {
  addPost(state, post) {
    state.posts.unshift(post);
  },
  addPosts(state, posts) {
    state.posts = [...state.posts, ...posts];
  },
  fetchPosts(state, posts) {
    state.posts = posts;
  },
  clearPosts(state) {
    state.posts = [];
    state._postSnapshotSubscriber();
    state._postSnapshotSubscriber = null;
  },
  editPost(state, { postId, post }) {
    const postIndex = state.posts.findIndex((post) => post.id === postId);
    state.posts[postIndex].post = post;
  },
  deletePost(state, postId) {
    state.posts = state.posts.filter((post) => post.id !== postId);
  },
  addPostListener(state, subscriber) {
    state._postSnapshotSubscriber = subscriber;
  },
};
