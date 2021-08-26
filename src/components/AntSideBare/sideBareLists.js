import React from "react";
import {
  DashboardFilled,
  EuroCircleFilled,
  FileTextFilled,
  CalendarFilled,
  ClockCircleFilled,
  UsergroupAddOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { ReactComponent as Acount } from "../../img/user.svg";

export const intiateurSimpleList = [
  {
    text: "Dashboard",
    component: <DashboardFilled />,
    to: "/",
  },
  {
    text: "Evenements",
    component: <CalendarFilled />,
    to: "/evenements",
  },
  {
    text: "Demandes",
    component: <ClockCircleFilled />,
    to: "/demandes",
  },
  {
    text: "Intervenants",
    component: <UsergroupAddOutlined />,
    to: "/intervenants",
  },
  {
    text: "Sponsoring",
    component: <EuroCircleFilled />,
    to: "/sponsorings",
  },
  {
    text: "Bilans",
    component: <FileTextFilled />,
    to: "/bilans",
  },
];

export const administrateurSimpleList = [
  ...intiateurSimpleList,
  {
    text: "Utilisateurs",
    component: <UserAddOutlined />,
    to: "/utilisateurs",
  },
];
