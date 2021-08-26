import { createSelector } from "reselect";

const sponsoringInputSelector = (state) => state.search;

export const searchValueSelector = createSelector(
  sponsoringInputSelector,
  (search) => search.searchValue
);
export const searchFieldSelector = createSelector(
  sponsoringInputSelector,
  (search) => search.searchField
);

export const filterSelector = createSelector(
  sponsoringInputSelector,
  (search) => search.filter
);
