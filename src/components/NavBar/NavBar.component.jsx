import React from "react";
import Icon from "@ant-design/icons";
import { ReactComponent as ShevronDown } from "../../img/chevron-down-solid.svg";
import { ReactComponent as Menu } from "../../img/menu.svg";
import Notifications from "../Notifications/Notifications.component";
import { Typography } from "antd";
import { Avatar } from "antd";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/user/user.selectors";
import useWindowSize from "../../hooks/useWindowSize";
import moment from "moment";

import {
  NavBarContainer,
  NavBarElements,
  NavBarElementsRight,
} from "./NavBar.styles";
import { baseUrl } from "../../config";

const iconStyles = { fontSize: "20px", cursor: "pointer", color: "#bfbfbf" };

const { Text } = Typography;

const NavBar = ({ onOpen }) => {
  const user = useSelector(userSelector);
  const { width: windowWidth } = useWindowSize();

  const logOut = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  const avatartOptions = user.photo
    ? {
        src: baseUrl + user.photo,
      }
    : { style: { color: "#f56a00", backgroundColor: "#fde3cf" } };
  return (
    <NavBarContainer windowWidth={windowWidth}>
      {windowWidth < 700 ? (
        <Icon component={Menu} style={iconStyles} onClick={onOpen} />
      ) : null}

      <NavBarElements>
        <Text type="secondary">
          {moment(new Date()).format("MMMM Do YYYY")}
        </Text>
        <NavBarElementsRight>
          <Notifications />
          <Avatar
            {...avatartOptions}
            size={{
              xs: "32px",
              sm: "32px",
              md: "32px",
              lg: "40x",
              xl: "40px",
              xxl: "40px",
            }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {user.nom[0]}
          </Avatar>
          <Text type="secondary">{user.nom}</Text>
          <Icon component={ShevronDown} style={iconStyles} onClick={logOut} />
        </NavBarElementsRight>
      </NavBarElements>
    </NavBarContainer>
  );
};

export default NavBar;
