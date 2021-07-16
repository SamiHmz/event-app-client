import NotificationsActions from "./notifications.actions.type";

export const startNotificationsFetching = (pageNumber) => ({
  type: NotificationsActions.START_NOTIFICATIONS_FETCHING,
  payload: {
    pageNumber,
  },
});

export const notificationsFetchingSuccess = (notificationsList) => ({
  type: NotificationsActions.NOTIFICATIONS_FETCHING_SUCCESS,
  payload: {
    notificationsList,
  },
});

export const setCurrentPage = () => ({
  type: NotificationsActions.SET_CURRENT_PAGE,
});

export const setNotificationsIsLoading = () => ({
  type: NotificationsActions.SET_NOTFICATION_IS_LOADING,
});

export const setHasMore = () => ({
  type: NotificationsActions.SET_HAS_MORE,
});

export const startFetchUnviewedNotificationCount = () => ({
  type: NotificationsActions.START_FETCH_UNVIEWED_NOTIFICATIONS_COUNT,
});

export const setUnviewedNotificationCount = (count) => ({
  type: NotificationsActions.SET_UNVIEWED_NOTIFICATIONS_COUNT,
  payload: {
    count,
  },
});

export const setAllNotificationsToViewed = () => ({
  type: NotificationsActions.SET_ALL_NOTIFICATION_TO_VIEWED,
});
export const addNewNotification = (notification) => ({
  type: NotificationsActions.ADD_NEW_NOTIFICATION,
  payload: {
    notification,
  },
});

export const notificationClicked = (id) => ({
  type: NotificationsActions.NOTIFICATION_CLICKED,
  payload: { id },
});
export const setNotificationToClickedSuccess = (id) => ({
  type: NotificationsActions.SET_NOTIFICATION_TO_CLICKED,
  payload: {
    id,
  },
});
