import React from "react";
import Icon from "@ant-design/icons";
import { ReactComponent as ShevronDown } from "../../img/chevron-down-solid.svg";
import { ReactComponent as Menu } from "../../img/menu.svg";
import { ReactComponent as Bell } from "../../img/bxs-bell.svg";
import Notifications from "../Notifications/Notifications.component";
import { Typography } from "antd";
import Avatar from "../Avatar/Avatar.component";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/user/user.selectors";
import {
  NavBarContainer,
  NavBarElements,
  NavBarElementsRight,
} from "./NavBar.styles";
import img from "../../img/avatar.jpg";
import windowSize from "react-window-size";

const iconStyles = { fontSize: "20px", cursor: "pointer" };

const { Text } = Typography;
const NavBar = ({ windowWidth, onOpen }) => {
  const user = useSelector(userSelector);
  return (
    <NavBarContainer windowWidth={windowWidth}>
      {windowWidth < 700 ? (
        <Icon component={Menu} style={iconStyles} onClick={onOpen} />
      ) : null}

      <NavBarElements>
        <Text type="secondary">Tuesday,April 27th,2021</Text>
        <NavBarElementsRight>
          <Notifications />
          <Avatar src={img} />
          <Text type="secondary">{user.nom}</Text>
          <Icon component={ShevronDown} style={{ fontSize: "20px" }} />
        </NavBarElementsRight>
      </NavBarElements>
    </NavBarContainer>
  );
};

export default windowSize(NavBar);
