export default {
  login(state, user) {
    state.user = user;
  },
  logout(state) {
    state.user = null;
  },
  setupAuthListener(state, listener) {
    state.authListener = listener;
  },
  cleanupAuthListener(state) {
    if (state.authListener) {
      state.authListener();
      state.authListener = null;
    }
  },
};
