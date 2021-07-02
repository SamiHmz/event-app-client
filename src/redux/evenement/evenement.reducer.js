import evenemetActions from "./evenement.actions.types";
const INITIAL_STATE = {
  demandes: {
    data: [],
    isLoading: true,
  },
  demandesValidation: {
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
    case evenemetActions.DEMANDE_CREATION_SUCCESS:
      return {
        ...state,
        demandes: {
          data: [action.payload, ...state.demandes.data],
          isLoading: state.demandes.isLoading,
        },
      };
    case evenemetActions.DEMANDE_VALIDATION_FETCHING_SUCCESS:
      return {
        ...state,
        demandesValidation: {
          data: action.payload.validations,
          isLoading: false,
        },
      };

    default:
      return state;
  }
};

export default evenementReducer;
