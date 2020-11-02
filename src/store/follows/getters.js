export default {
  followed(state) {
    return (userId) => {
      return state.follows.find((follow) => follow.following === userId);
    };
  },
};
