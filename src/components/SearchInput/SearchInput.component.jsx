import React from "react";
import windowSize from "react-window-size";
import { Input, Popover } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { SearchIconContainer } from "./SearchInput.styles";

const { Search } = Input;
const SearchInput = ({ windowWidth }) => {
  return windowWidth > 700 ? (
    <Search
      size="large"
      placeholder="input search text"
      enterButton
      style={{ width: "50%" }}
    />
  ) : (
    <div>
      <Popover
        content={<Search />}
        placement="right"
        title="Search"
        trigger="click"
      >
        <SearchIconContainer>
          <SearchOutlined style={{ color: "#FFF", fontSize: "16px" }} />
        </SearchIconContainer>
      </Popover>
    </div>
  );
};
export default windowSize(SearchInput);
