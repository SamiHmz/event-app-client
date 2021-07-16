import { createSelector } from "reselect";
import { notification } from "antd";

const notificationsInputSelector = (state) => state.notifications;

export const notificationsSelector = createSelector(
  [notificationsInputSelector],
  (notifications) =>
    notifications.notificationsList.map((item) => {
      return {
        id: item.id,
        details: item.details,
        createdAt: item.createdAt,
        src: null,
        nom: item.nom,
        is_clicked: item.is_clicked,
        lien: item.lien,
      };
    })
);

export const notificationsIsLoadingSelector = createSelector(
  [notificationsInputSelector],
  (notifications) => notifications.notificationsIsLoading
);

export const currentNotificationsPageSelector = createSelector(
  [notificationsInputSelector],
  (notifications) => notifications.currentPage
);

export const hasMoreSelector = createSelector(
  [notificationsInputSelector],
  (notifications) => notifications.hasMore
);

export const unviewedNotificationsCountSelector = createSelector(
  [notificationsInputSelector],
  (notifications) => notifications.unviewedNotificationsCount
);
