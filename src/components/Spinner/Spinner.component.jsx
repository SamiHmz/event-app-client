import React from "react";
import { Spin } from "antd";
import { SpinnerContainer } from "./Spinner.styles";
const Spinner = ({ size }) => {
  return (
    <SpinnerContainer>
      <Spin size={size} />
    </SpinnerContainer>
  );
};
export default Spinner;
