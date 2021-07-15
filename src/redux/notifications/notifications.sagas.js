import { takeLatest, put, call, all, take } from "redux-saga/effects";
import NotificationsActions from "./notifications.actions.type";
import {
  notificationsFetchingSuccess,
  setHasMore,
  setNotificationsIsLoading,
  setUnviewedNotificationCount,
} from "./notifications.actions";
import {
  getAllNotifications,
  getUnviewedNotificationsCount,
  setAllnotificationsToViewed,
} from "../../services/notifications.services";

export function* onNotificationsFetchingStart({ payload }) {
  try {
    const { data: notificaitons } = yield call(
      getAllNotifications,
      payload.pageNumber
    );
    if (notificaitons.length == 0) {
      yield put(setNotificationsIsLoading());
      yield put(setHasMore());
    } else {
      yield put(notificationsFetchingSuccess(notificaitons));
    }
  } catch (error) {
    console.log(error);
  }
}
export function* watchNotificationsFetchingStart() {
  yield takeLatest(
    NotificationsActions.START_NOTIFICATIONS_FETCHING,
    onNotificationsFetchingStart
  );
}
export function* onNotificationsCountFetchingStart() {
  try {
    const { data } = yield call(getUnviewedNotificationsCount);
    yield put(setUnviewedNotificationCount(data.count));
  } catch (error) {
    console.log(error);
  }
}

export function* watchNotificationsCountFetchinStart() {
  yield takeLatest(
    NotificationsActions.START_FETCH_UNVIEWED_NOTIFICATIONS_COUNT,
    onNotificationsCountFetchingStart
  );
}

export function* onSetAllNotificationstoViewed() {
  try {
    yield call(setAllnotificationsToViewed);
    yield put(setUnviewedNotificationCount(0));
  } catch (error) {
    console.log(error);
  }
}

export function* watchSetAllNotificationstoViewed() {
  yield takeLatest(
    NotificationsActions.SET_ALL_NOTIFICATION_TO_VIEWED,
    onSetAllNotificationstoViewed
  );
}

export function* notificaitonsSagas() {
  yield all([
    call(watchNotificationsFetchingStart),
    call(watchNotificationsCountFetchinStart),
    call(watchSetAllNotificationstoViewed),
  ]);
}
