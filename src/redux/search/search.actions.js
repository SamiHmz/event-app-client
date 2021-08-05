import SearchActions from "./search.actions.type";

export const setSearchValue = (value) => ({
  type: SearchActions.SET_SEARCH_VALUE,
  payload: {
    value,
  },
});
export const setSearchField = (value) => ({
  type: SearchActions.SET_SEARCH_FIELD,
  payload: {
    value,
  },
});
export const setFilter = (field, value) => ({
  type: SearchActions.SET_FILTER,
  payload: {
    field,
    value,
  },
});
