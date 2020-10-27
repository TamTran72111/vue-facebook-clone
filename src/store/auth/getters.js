export default {
  displayName(state) {
    return state.user.displayName;
  },
  userAvatar(state) {
    return state.user.avatar;
  },
  isLoggedIn(state) {
    return state.user !== null;
  },
  userId(state) {
    return state.user.id;
  },
};
