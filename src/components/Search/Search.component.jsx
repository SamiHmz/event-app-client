import React from "react";
import SearchInput from "../SearchInput/SearchInput.component";
import SearchParams from "../SearchParams/SearchParams.component";

const Search = ({ options, defaultSearchField }) => {
  return (
    <>
      <SearchInput defaultSearchField={defaultSearchField} />
      <SearchParams options={options} />
    </>
  );
};
export default Search;
