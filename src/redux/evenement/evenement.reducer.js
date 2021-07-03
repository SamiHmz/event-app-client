import evenemetActions from "./evenement.actions.types";
const INITIAL_STATE = {
  demandes: [],
  demandesValidation: [],
  isDemandesLoading: true,
  isCurrentDemandeLoading: true,
  isValidationLoading: true,
  currentDemande: null,
};

const evenementReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case evenemetActions.DEMANDE_FETCHING_SUCCESS:
      return {
        ...state,
        isDemandesLoading: false,
        demandes: action.payload.demandes,
      };
    case evenemetActions.DEMANDE_CREATION_SUCCESS:
      return {
        ...state,
        demandes: [action.payload, ...state.demandes],
      };
    case evenemetActions.DEMANDE_VALIDATION_FETCHING_SUCCESS:
      return {
        ...state,
        isValidationLoading: false,
        demandesValidation: action.payload.validations,
      };
    case evenemetActions.ONE_DEMANDE_FETCHING_SUCCESS:
      return {
        ...state,
        isCurrentDemandeLoading: false,
        currentDemande: action.payload.demande,
      };

    default:
      return state;
  }
};

export default evenementReducer;
