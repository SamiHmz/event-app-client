import React from "react";
import { Select } from "antd";
const { Option } = Select;

const SelectInput = ({ options, ...others }) => {
  return (
    <Select {...others}>
      {options.map((option) => (
        <Option value={option} key={option}>
          {option}
        </Option>
      ))}
    </Select>
  );
};

export default SelectInput;
