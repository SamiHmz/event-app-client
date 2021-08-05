import React from "react";
import { useSelector } from "react-redux";
import {
  searchValueSelector,
  filterSelector,
} from "../redux/search/search.selectors";
const useSearch = () => {
  const searchValue = useSelector(searchValueSelector);
  const filter = useSelector(filterSelector);
  return { searchValue, filter };
};
export default useSearch;
