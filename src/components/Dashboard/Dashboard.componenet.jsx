import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  startDashboardDataFetching,
  setDashboardIsLoading,
} from "../../redux/dashboard/dashboard.actions";
import {
  dashboardSelector,
  isDashboardsLoadingSelector,
} from "../../redux/dashboard/dashboard.selectors";
import { userSelector } from "../../redux/user/user.selectors";
import { typeUtilisateur } from "../../util/magic_strings";
import DashboardAdministrateur from "../DashboardAdministrateur/DashboardAdministrateur.component";
import DashboardInitiateur from "../DashboardInitiateur/DashboardInitiateur.component";
import Spinner from "../Spinner/Spinner.component";
const Dashboard = () => {
  const dispatch = useDispatch();
  const dashboardData = useSelector(dashboardSelector);
  const isDashboardsLoading = useSelector(isDashboardsLoadingSelector);
  const user = useSelector(userSelector);
  useEffect(() => {
    dispatch(startDashboardDataFetching());
    return () => dispatch(setDashboardIsLoading());
  }, []);
  return isDashboardsLoading ? (
    <Spinner size="large" />
  ) : user.type === typeUtilisateur.INITIATEUR ? (
    <DashboardInitiateur data={dashboardData} />
  ) : (
    <DashboardAdministrateur data={dashboardData} />
  );
};
export default Dashboard;
