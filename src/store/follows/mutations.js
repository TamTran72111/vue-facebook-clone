export default {
  fetchFollows(state, follows) {
    state.follows = follows;
  },
  follow(state, follow) {
    state.follows.push(follow);
  },
  unfollow(state, following) {
    const followIndex = state.follows.findIndex(
      (follow) => following === follow.following
    );
    state.follows.splice(followIndex, 1);
  },
};
