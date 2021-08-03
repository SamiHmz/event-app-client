import React from "react";
import Icon from "@ant-design/icons";
import { ReactComponent as FilterIcon } from "../../img/filter-.svg";
import { Popover, Badge, Spin } from "antd";
import SearchFieldList from "../SearchFieldList/SearchFieldList.component";
const styles = {
  fontSize: "25px",
  cursor: "pointer",
  color: "#FF4500",
  alignSelf: "center",
  marginLeft: "10px",
};
const SearchParams = ({ options }) => {
  return (
    <Popover
      content={<SearchFieldList options={options} />}
      placement="bottom"
      trigger="click"
    >
      <Icon style={styles} component={FilterIcon} />
    </Popover>
  );
};

export default SearchParams;
