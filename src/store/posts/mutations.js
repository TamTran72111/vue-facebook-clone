export default {
  fetchPosts(state, posts) {
    state.posts = posts;
  },
  clearPosts(state) {
    state.posts = [];
    state._postSnapshotSubscriber();
    state._postSnapshotSubscriber = null;
  },
  addPostListener(state, subscriber) {
    state._postSnapshotSubscriber = subscriber;
  },
};
