import React from "react";

import { CalendarFilled, ClockCircleFilled } from "@ant-design/icons";
import { ReactComponent as Intervenants } from "../../img/intervenants.svg";
import { ReactComponent as Dashboard } from "../../img/dashboard.svg";
import { ReactComponent as Journaliste } from "../../img/journaliste.svg";
import { ReactComponent as Dollar } from "../../img/dollar.svg";
import { ReactComponent as Checked } from "../../img/checked.svg";
import { ReactComponent as Bilan } from "../../img/bilan.svg";
import { ReactComponent as Acount } from "../../img/user.svg";

export const intiateurSimpleList = [
  {
    text: "Dashboard",
    component: <Dashboard />,
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
    text: "Intervenats",
    component: <Intervenants />,
    to: "/demandes",
  },
  {
    text: "Journalistes",
    component: <Journaliste />,
    to: "/demandes",
  },
  {
    text: "Sponsoring",
    component: <Dollar />,
    to: "/demandes",
  },
  {
    text: "Reservations",
    component: <Checked />,
    to: "/demandes",
  },
  {
    text: "Bilans",
    component: <Bilan />,
    to: "/demandes",
  },
];

export const administrateurSimpleList = [
  ...intiateurSimpleList,
  {
    text: "Comptes",
    component: <Acount />,
    to: "/comptes",
  },
];
