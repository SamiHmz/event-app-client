import SearchActions from "./search.actions.type";

const INITIAL_STATE = {
  searchValue: {},
  searchField: "",
  filter: {},
};

const setFilter = (state, action) => {
  if (action.payload.value.length === 0) {
    delete state.filter[action.payload.field];
    return { ...state.filter };
  } else
    return {
      ...state.filter,
      ...{ [action.payload.field]: action.payload.value },
    };
};

const setSearchValue = (state, action) => {
  if (!action.payload.value[state.searchField]) {
    return {};
  } else return action.payload.value;
};

const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SearchActions.SET_SEARCH_VALUE: {
      return {
        ...state,
        searchValue: setSearchValue(state, action),
      };
    }
    case SearchActions.SET_SEARCH_FIELD: {
      return {
        ...state,
        searchField: action.payload.value,
      };
    }
    case SearchActions.SET_FILTER: {
      return {
        ...state,
        filter: setFilter(state, action),
      };
    }
    default:
      return state;
  }
};

export default searchReducer;
