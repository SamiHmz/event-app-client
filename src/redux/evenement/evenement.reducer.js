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
    case evenemetActions.CREATE_VALIDATION_SUCCESS:
      return {
        ...state,
        demandesValidation: [
          ...state.demandesValidation,
          action.payload.validation,
        ],
      };
    case evenemetActions.ONE_DEMANDE_FETCHING_SUCCESS:
      return {
        ...state,
        isCurrentDemandeLoading: false,
        currentDemande: action.payload.demande,
      };

    case evenemetActions.UPDATE_DEMANDE_SUCCESS:
      return {
        ...state,
        demandes: state.demandes.map((demande) => {
          if (demande.id === action.payload.demande.id)
            return action.payload.demande;
          return demande;
        }),
      };
    case evenemetActions.DELETE_DEMANDE_SUCCESS:
      return {
        ...state,
        demandes: state.demandes.filter(
          (demande) => demande.id !== action.payload.id
        ),
      };
    case evenemetActions.UPDATE_VALIDATION_SUCCESS:
      return {
        ...state,
        demandesValidation: state.demandesValidation.map((validation) => {
          if (validation.id === action.payload.validation.id)
            return action.payload.validation;
          return validation;
        }),
      };
    case evenemetActions.DELETE_VALIDATION_SUCCESS:
      return {
        ...state,
        demandesValidation: state.demandesValidation.filter(
          (validation) => validation.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export default evenementReducer;
