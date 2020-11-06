export default {
  fetchNotifications(state, notifications) {
    state.notifications = notifications;
  },
  addNotificationListener(state, notificationListener) {
    state._notificationListener = notificationListener;
  },
  clearNotificationListener(state) {
    if (state._notificationListener) {
      state._notificationListener();
      state._notificationListener = null;
    }
  },
};
