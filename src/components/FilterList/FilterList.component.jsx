import React from "react";
import { Checkbox } from "antd";
import { setFilter } from "../../redux/search/search.actions";
import { capitaliseFirst } from "../../util/usefull_functions";
import { useDispatch } from "react-redux";

const FilterList = ({ list, defaultFilter }) => {
  const dispatch = useDispatch();

  return (
    <div>
      {list?.map((item) => {
        return (
          <div key={item.title}>
            <div>{capitaliseFirst(item.title)}</div>
            <Checkbox.Group
              options={item.options}
              defaultValue={defaultFilter}
              onChange={(selectedValues) =>
                dispatch(setFilter(item.title, selectedValues))
              }
            />
            <br />
            <br />
          </div>
        );
      })}
    </div>
  );
};
export default FilterList;
