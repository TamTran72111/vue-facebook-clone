import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

export default {
  state() {
    return {
      posts: [],
      _postSnapshotSubscriber: null,
    };
  },
  getters,
  mutations,
  actions,
};
