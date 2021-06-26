import React from "react";
import { SideBareContainer, SideBareLogo } from "./sideBare.styles";
import SideBareList from "../SideBareList/SideBareList.component";
import logo from "../../img/logo.png";

const SideBare = () => {
  return (
    <SideBareContainer>
      <SideBareLogo src={logo} />
      <SideBareList />
    </SideBareContainer>
  );
};

export default SideBare;
