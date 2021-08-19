import { takeLatest, put, call, all } from "redux-saga/effects";
import DashboardActions from "./dashboard.actions.type";
import { getDashboardData } from "../../services/dashboard.services";
import { dashboardDataFetchingSuccess } from "./dashboard.actions";

export function* onDashboardDataFetchingStart({ payload }) {
  try {
    const { data } = yield call(getDashboardData);
    console.log("data :", data);
    yield put(dashboardDataFetchingSuccess(data));
  } catch (error) {
    console.log(error);
  }
}
export function* watchDashboardDataFetchingStart() {
  yield takeLatest(
    DashboardActions.START_DASHBOARD_FETCHING,
    onDashboardDataFetchingStart
  );
}

export function* dashboardSagas() {
  yield all([call(watchDashboardDataFetchingStart)]);
}
