import { createStore } from "vuex";

import auth from "./auth";
import posts from "./posts";
import likes from "./likes";

export default createStore({
  modules: {
    auth,
    posts,
    likes,
  },
});
