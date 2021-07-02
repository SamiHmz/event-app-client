import React from "react";
import Icon from "@ant-design/icons";
import { ReactComponent as ShevronDown } from "../../img/chevron-down-solid.svg";
import { ReactComponent as Bell } from "../../img/bxs-bell.svg";
import { Avatar, Typography } from "antd";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/user/user.selectors";
import {
  NavBarContainer,
  NavBarElements,
  NavBarElementsRight,
} from "./NavBar.styles";
import img from "../../img/avatar.jpg";

const { Text } = Typography;
const NavBar = () => {
  const user = useSelector(userSelector);
  return (
    <NavBarContainer>
      <NavBarElements>
        <Text type="secondary">Tuesday,April 27th,2021</Text>
        <NavBarElementsRight>
          <Icon component={Bell} style={{ fontSize: "20px" }} />
          <Avatar src={img} size="large" />
          <Text type="secondary">{user.nom}</Text>
          <Icon component={ShevronDown} style={{ fontSize: "20px" }} />
        </NavBarElementsRight>
      </NavBarElements>
    </NavBarContainer>
  );
};

export default NavBar;
