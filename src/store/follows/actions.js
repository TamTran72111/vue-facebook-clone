import { db } from "../../firebase";

const Follows = db.collection("follows");

export default {
  async fetchFollows({ commit, rootGetters }) {
    const follow_docs = await Follows.where(
      "follower",
      "==",
      rootGetters.userId
    ).get();

    const folows = follow_docs.docs.map((follow) => ({
      id: follow.id,
      ...follow.data(),
    }));
    commit("fetchFollows", folows);
  },
  async follow({ rootGetters, commit }) {
    const follower = rootGetters.userId;
    const following = rootGetters.user.userId;
    const follow = await Follows.add({
      follower,
      following,
    });

    commit("follow", {
      id: follow.id,
      following,
      follower,
    });
  },
  async unfollow({ rootGetters, commit }) {
    const following = rootGetters.user.userId;
    const follow = rootGetters.followed(following);
    await Follows.doc(follow.id).delete();
    commit("unfollow", following);
  },
};
