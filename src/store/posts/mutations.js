export default {
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
  // addComment(state, comment) {
  //   const postIndex = state.posts.findIndex(
  //     (post) => post.id === comment.postId
  //   );
  //   if (postIndex != -1) {
  //     state.posts[postIndex].commentList.push(comment);
  //   }
  // },
  // fetchComments(state, payload) {
  //   const postIndex = state.posts.findIndex(
  //     (post) => post.id === payload.postId
  //   );
  //   if (postIndex != -1) {
  //     state.posts[postIndex].commentList = payload.comments;
  //   }
  // },
  // deleteComment(state, { commentId, postId }) {
  //   const postIndex = state.posts.findIndex((post) => post.id === postId);
  //   if (postIndex != -1) {
  //     state.posts[postIndex].commentList = state.posts[
  //       postIndex
  //     ].commentList.filter((comment) => comment.id !== commentId);
  //   }
  // },
  // editComment(state, { postId, commentId, comment }) {
  //   const postIndex = state.posts.findIndex((post) => post.id === postId);
  //   if (postIndex != -1) {
  //     const commentIndex = state.posts[postIndex].commentList.findIndex(
  //       (comment) => comment.id == commentId
  //     );
  //     if (commentIndex != -1) {
  //       state.posts[postIndex].commentList[commentIndex].comment = comment;
  //     }
  //   }
  // },
};
