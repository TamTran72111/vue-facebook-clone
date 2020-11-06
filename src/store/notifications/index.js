import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

export default {
  state() {
    return {
      notifications: [],
      _notificationListener: null,
    };
  },
  getters,
  mutations,
  actions,
};
