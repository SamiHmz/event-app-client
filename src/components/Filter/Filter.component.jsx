import React, { useEffect, useState } from "react";
import Icon from "@ant-design/icons";
import { ReactComponent as FilterIcon } from "../../img/filter.svg";
import { Popover, Badge, Spin } from "antd";
import FilterList from "../FilterList/FilterList.component";
import {
  setFilter,
  resetFilter,
  setFilterInitialised,
} from "../../redux/search/search.actions";
import { useDispatch, useSelector } from "react-redux";
import { typeUtilisateur } from "../../util/magic_strings";
import { userSelector } from "../../redux/user/user.selectors";

const styles = {
  fontSize: "25px",
  cursor: "pointer",
  color: "#FF4500",
  alignSelf: "center",
  marginLeft: "10px",
};

const Filter = ({ list }) => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  useEffect(() => {
    list.forEach((item) => {
      //
      const defaultvalues =
        user.type === typeUtilisateur.ADMINISTRATEUR
          ? [item.default]
          : item.options;

      if (item.default) {
        dispatch(setFilter(item.title, defaultvalues));
      }
    });

    return () => {
      dispatch(resetFilter());
    };
  }, []);

  return (
    <Popover
      content={<FilterList list={list} />}
      placement="bottom"
      trigger="click"
    >
      <Icon style={styles} component={FilterIcon} />
    </Popover>
  );
};

export default Filter;
