import React, { useState } from "react";
import { Radio, Space, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setSearchField } from "../../redux/search/search.actions";
import { searchFieldSelector } from "../../redux/search/search.selectors";
const SearchFieldList = ({ options }) => {
  const dispatch = useDispatch();
  const value = useSelector(searchFieldSelector);
  return (
    <Radio.Group
      onChange={(e) => dispatch(setSearchField(e.target.value))}
      value={value}
    >
      <Space direction="vertical">
        {options?.map((option) => (
          <Radio value={option}>{option}</Radio>
        ))}
      </Space>
    </Radio.Group>
  );
};
export default SearchFieldList;
