export default {
  fetchLikes(state, likes) {
    state.likes = likes;
  },
  like(state, newLike) {
    state.likes.push(newLike);
  },
  unlike(state, id) {
    state.likes = state.likes.filter((like) => like.id !== id);
  },
};
