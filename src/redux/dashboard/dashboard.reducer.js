import DashboardActions from "./dashboard.actions.type";

const INITIAL_STATE = {
  dashboard: {},
  isDashboardsLoading: true,
};

const dashboardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DashboardActions.DASHBOARD_FETCHING_SUCCESS: {
      console.log("excuted");
      return {
        ...state,
        dashboard: action.payload.dashboard,
        isDashboardsLoading: false,
      };
    }
    case DashboardActions.SET_DASHBOARD_IS_LOADING: {
      console.log("excuted");
      return {
        ...state,
        isDashboardsLoading: true,
      };
    }
    default:
      return state;
  }
};

export default dashboardReducer;
