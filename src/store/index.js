import { createStore } from "vuex";

import auth from "./auth";
import posts from "./posts";

export default createStore({
  modules: {
    auth,
    posts,
  },
});
