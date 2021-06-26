import React from "react";
import { Menu } from "antd";

import { CalendarFilled, ClockCircleFilled } from "@ant-design/icons";
import { ReactComponent as Intervenants } from "../../img/intervenants.svg";
import { ReactComponent as Dashboard } from "../../img/dashboard.svg";
import { ReactComponent as Journaliste } from "../../img/journaliste.svg";
import { ReactComponent as Dollar } from "../../img/dollar.svg";
import { ReactComponent as Checked } from "../../img/checked.svg";
import { ReactComponent as Bilan } from "../../img/bilan.svg";

const intiateurList = [
  {
    text: "Dashboard",
    component: <Dashboard />,
    to: "/",
    //   },
    //   {
    //     text: "Evenements",
    //     component: CalendarFilled,
    //     to: "/evenements",
    //   },
    //   {
    //     text: "Demandes",
    //     component: ClockCircleFilled,
    //     to: "/demandes",
    //   },
    //   {
    //     text: "Intervenats",
    //     component: Intervenants,
    //     to: "/demandes",
    //   },
    //   {
    //     text: "Journalistes",
    //     component: Journaliste,
    //     to: "/demandes",
    //   },
    //   {
    //     text: "Sponsoring",
    //     component: Dollar,
    //     to: "/demandes",
    //   },
    //   {
    //     text: "Reservations",
    //     component: Checked,
    //     to: "/demandes",
    //   },
    //   {
    //     text: "Bilans",
    //     component: Bilan,
    //     to: "/demandes",
  },
];
const MenuItem = Menu.Item;

const AntSideBareList = () => {
  return intiateurList.map(({ text, component }) => {
    return (
      <MenuItem key={text} icon={<CalendarFilled />}>
        {text}
      </MenuItem>
    );
  });
};

export default AntSideBareList;
