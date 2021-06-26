import evenemetActions from "./evenement.actions.types";
const INITIAL_STATE = {
  demandes: {
    data: [],
    isLoading: true,
  },
};

const evenementReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case evenemetActions.DEMANDE_FETCHING_SUCCESS:
      return {
        ...state,
        demandes: { data: action.payload.demandes, isLoading: false },
      };

    default:
      return state;
  }
};

export default evenementReducer;
