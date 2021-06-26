import React from "react";
import { Typography } from "antd";
import Icon from "@ant-design/icons";
import { SideBareListItemContainer } from "./SideBareListItem.styles";

const { Text } = Typography;

const SideBareListItem = ({ text, component, to }) => {
  return (
    /*  aded some styles to override ant design default fontsize*/
    <SideBareListItemContainer to={to}>
      <Icon
        component={component}
        style={{
          fontSize: "20px",
          marginRight: "20px",
        }}
      />
      <Text strong>{text}</Text>
    </SideBareListItemContainer>
  );
};

export default SideBareListItem;
