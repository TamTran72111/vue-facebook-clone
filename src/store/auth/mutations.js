export default {
  login(state, user) {
    state.user = user;
  },
  logout(state) {
    state.user = null;
  },
};