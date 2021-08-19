import { createSelector } from "reselect";

const dashboardInputSelector = (state) => state.dashboard;

export const dashboardSelector = createSelector(
  dashboardInputSelector,
  (dashboard) => dashboard.dashboard
);

export const isDashboardsLoadingSelector = createSelector(
  dashboardInputSelector,
  (dashboard) => dashboard.isDashboardsLoading
);
