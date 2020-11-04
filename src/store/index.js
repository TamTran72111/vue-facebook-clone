import { createStore } from "vuex";

import auth from "./auth";
import posts from "./posts";
import likes from "./likes";
import comments from "./comments";
import user from "./user";
import follows from "./follows";
import notifcations from "./notifications";

export default createStore({
  modules: {
    auth,
    posts,
    likes,
    comments,
    user,
    follows,
    notifcations,
  },
});
