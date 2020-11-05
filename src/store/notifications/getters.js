export default {
  notifications(state) {
    return state.notifications;
  },
  hasNotifications(state) {
    return state.notifications.length !== 0;
  },
};
