export default {
  fetchComments(state, { postId, comments }) {
    state.comments[postId] = comments;
  },
  editComment(state, { postId, commentId, comment }) {
    const commentIndex = state.comments[postId].findIndex(
      (comment) => comment.id == commentId
    );
    state.comments[postId][commentIndex].comment = comment;
  },
};
