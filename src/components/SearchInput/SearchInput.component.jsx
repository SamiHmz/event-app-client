import React, { useEffect } from "react";
import windowSize from "react-window-size";
import { Input, Popover } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { SearchIconContainer } from "./SearchInput.styles";
import { searchFieldSelector } from "../../redux/search/search.selectors";
import {
  setSearchValue,
  setSearchField,
} from "../../redux/search/search.actions";

import { useSelector, useDispatch } from "react-redux";
const { Search } = Input;
const SearchInput = ({ windowWidth, defaultSearchField }) => {
  const dispatch = useDispatch();
  const searchField = useSelector(searchFieldSelector);

  useEffect(() => {
    dispatch(setSearchField(defaultSearchField));
    return () => {
      dispatch(setSearchValue(""));
      dispatch(setSearchField(""));
    };
  }, []);
  return windowWidth > 700 ? (
    <Search
      size="large"
      placeholder="input search text"
      enterButton
      style={{ width: "50%" }}
      onSearch={(value) => dispatch(setSearchValue({ [searchField]: value }))}
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
