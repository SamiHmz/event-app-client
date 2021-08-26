import React from "react";
import { Checkbox } from "antd";
import { setFilter } from "../../redux/search/search.actions";
import { capitaliseFirst } from "../../util/usefull_functions";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/user/user.selectors";
import { typeUtilisateur } from "../../util/magic_strings";

const FilterList = ({ list }) => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  return (
    <div>
      {list?.map((item) => {
        var defaultFilter = [];
        if (item.default) {
          if (user.type === typeUtilisateur.ADMINISTRATEUR) {
            defaultFilter = [item.default];
          } else {
            defaultFilter = item.options;
          }
        }

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
