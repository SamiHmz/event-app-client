import SearchActions from "./search.actions.type";

const INITIAL_STATE = {
  searchValue: {},
  searchField: "",
};

const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SearchActions.SET_SEARCH_VALUE: {
      return {
        ...state,
        searchValue: action.payload.value,
      };
    }
    case SearchActions.SET_SEARCH_FIELD: {
      return {
        ...state,
        searchField: action.payload.value,
      };
    }
    default:
      return state;
  }
};

export default searchReducer;
