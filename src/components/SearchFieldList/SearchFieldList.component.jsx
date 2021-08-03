import React, { useState } from "react";
import { Radio, Space, Button } from "antd";
import { useDispatch } from "react-redux";
import { setSearchField } from "../../redux/search/search.actions";
const SearchFieldList = ({ options }) => {
  const dispatch = useDispatch();
  return (
    <Radio.Group onChange={(e) => dispatch(setSearchField(e.target.value))}>
      <Space direction="vertical">
        {options?.map((option) => (
          <Radio value={option}>{option}</Radio>
        ))}
      </Space>
    </Radio.Group>
  );
};
export default SearchFieldList;
