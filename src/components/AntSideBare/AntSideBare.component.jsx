import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Menu } from "antd";
import logo from "../../img/logo.png";

import { SideBareLogo } from "../sideBare/sideBare.styles";
import {
  intiateurSimpleList,
  administrateurAdminList,
  administrateurSimpleList,
} from "./sideBareLists";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/user/user.selectors";
import { roles, typeUtilisateur } from "../../util/magic_strings";
import { AntSideBareContainer } from "./AntSideBare.styles";
import windowSize from "react-window-size";

const MenuItem = Menu.Item;

const AntSideBare = ({ windowWidth }) => {
  const user = useSelector(userSelector);
  const getCurrentList = () => {
    if (user.type === typeUtilisateur.ADMINISTRATEUR) {
      if (user.role === roles.SIMPLE) {
        return administrateurSimpleList;
      } else return administrateurAdminList;
    } else {
      return intiateurSimpleList;
    }
    return [];
  };

  const history = useHistory();
  const defaultSelectedKeys = getCurrentList().findIndex(
    (item) => item.to === history.location.pathname
  );

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
    <AntSideBareContainer windowWidth={windowWidth}>
      <Menu
        defaultSelectedKeys={[defaultSelectedKeys.toString()]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        style={{ minHeight: "100%" }}
      >
        <SideBareLogo src={logo} />
        {renderSideBareMenuItem(getCurrentList())}
      </Menu>
    </AntSideBareContainer>
  );
};

export default windowSize(AntSideBare);
