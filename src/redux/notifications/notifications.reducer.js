import NotificationsActions from "./notifications.actions.type";
const INITIAL_STATE = {
  notificationsList: [],
  notificationsNotReadCount: 0,
  notificationsIsLoading: true,
  currentPage: 1,
  hasMore: true,
  unviewedNotificationsCount: 0,
};

const notificationsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NotificationsActions.NOTIFICATIONS_FETCHING_SUCCESS: {
      return {
        ...state,
        notificationsList: [
          ...state.notificationsList,
          ...action.payload.notificationsList,
        ],
        notificationsIsLoading: false,
      };
    }
    case NotificationsActions.SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };
    }
    case NotificationsActions.SET_NOTFICATION_IS_LOADING: {
      return {
        ...state,
        notificationsIsLoading: !state.notificationsIsLoading,
      };
    }
    case NotificationsActions.SET_HAS_MORE: {
      return {
        ...state,
        hasMore: false,
      };
    }
    case NotificationsActions.SET_UNVIEWED_NOTIFICATIONS_COUNT: {
      return {
        ...state,
        unviewedNotificationsCount: action.payload.count,
      };
    }
    case NotificationsActions.ADD_NEW_NOTIFICATION: {
      return {
        ...state,
        unviewedNotificationsCount: state.unviewedNotificationsCount + 1,
        notificationsList: [
          action.payload.notification,
          ...state.notificationsList,
        ],
      };
    }
    case NotificationsActions.SET_NOTIFICATION_TO_CLICKED: {
      return {
        ...state,
        notificationsList: state.notificationsList.map((item) => {
          if (item.id == action.payload.id) {
            item.is_clicked = true;
          }
          return item;
        }),
      };
    }
    default:
      return state;
  }
};

export default notificationsReducer;
