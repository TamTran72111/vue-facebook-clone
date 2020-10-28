export default {
  getComments(state) {
    return (postId) => state.comments[postId];
  },
};
