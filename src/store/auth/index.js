import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

export default {
  state() {
    return {
      user: null,
      authListener: null,
    };
  },
  getters,
  mutations,
  actions,
};
