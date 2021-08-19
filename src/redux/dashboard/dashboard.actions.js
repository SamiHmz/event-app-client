import DashboardActions from "./dashboard.actions.type";

export const startDashboardDataFetching = () => ({
  type: DashboardActions.START_DASHBOARD_FETCHING,
});

export const dashboardDataFetchingSuccess = (dashboard) => ({
  type: DashboardActions.DASHBOARD_FETCHING_SUCCESS,
  payload: {
    dashboard,
  },
});

export const setDashboardIsLoading = () => ({
  type: DashboardActions.SET_DASHBOARD_IS_LOADING,
});
