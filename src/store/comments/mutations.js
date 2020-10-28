export default {
  fetchComments(state, { postId, comments }) {
    state.comments[postId] = comments;
  },
  addComment(state, comment) {
    if (state.comments[comment.postId] === undefined) {
      state.comments[comment.postId] = [];
    }
    state.comments[comment.postId].push(comment);
  },
  editComment(state, { postId, commentId, comment }) {
    const commentIndex = state.comments[postId].findIndex(
      (comment) => comment.id == commentId
    );
    state.comments[postId][commentIndex].comment = comment;
  },
  deleteComment(state, { commentId, postId }) {
    state.comments[postId] = state.comments[postId].filter(
      (comment) => comment.id !== commentId
    );
  },
};
