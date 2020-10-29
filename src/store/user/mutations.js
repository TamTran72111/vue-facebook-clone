export default {
  fetchUser(state, user) {
    state.browsingUser = user;
  },
  editProfile(state, profile) {
    state.browsingUser = { ...state.browsingUser, ...profile };
  },
  clearUser(state) {
    state.browsingUser = null;
  },
};
