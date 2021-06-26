import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Menu, Button } from "antd";
import logo from "../../img/logo.png";

import { CalendarFilled, ClockCircleFilled } from "@ant-design/icons";
import { ReactComponent as Intervenants } from "../../img/intervenants.svg";
import { ReactComponent as Dashboard } from "../../img/dashboard.svg";
import { ReactComponent as Journaliste } from "../../img/journaliste.svg";
import { ReactComponent as Dollar } from "../../img/dollar.svg";
import { ReactComponent as Checked } from "../../img/checked.svg";
import { ReactComponent as Bilan } from "../../img/bilan.svg";
import { SideBareLogo } from "../sideBare/sideBare.styles";

const intiateurList = [
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
const { SubMenu } = Menu;
const MenuItem = Menu.Item;
const AntSideBare = () => {
  const [collapsed, setColapsed] = useState(false);
  const toggleCollapsed = () => {
    setColapsed(!collapsed);
  };

  const history = useHistory();

  const renderSideBareMenuItem = (MenuItems) => {
    return MenuItems.map(({ text, component, to }, index) => {
      return (
        <MenuItem key={index} icon={component} onClick={() => history.push(to)}>
          {text}
        </MenuItem>
      );
    });
  };

  return (
    <div style={{ width: "20%", height: "100%" }}>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        style={{ height: "100%" }}
      >
        <SideBareLogo src={logo} />
        {renderSideBareMenuItem(intiateurList)}
      </Menu>
    </div>
  );
};

export default AntSideBare;
