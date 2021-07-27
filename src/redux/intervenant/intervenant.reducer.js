import IntervenantActions from "./intervenant.actions.type";

const INITIAL_STATE = {
  intervenantsList: [],
  isIntervenantsLoading: true,
  currentIntervenant: null,
  isCurrentIntervenantLoading: true,
  isValidationLoading: true,
  intervenantValidations: [],
};

const intervenantReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IntervenantActions.INTERVENANT_FETCHING_SUCCESS: {
      return {
        ...state,
        intervenantsList: action.payload.intervenants,
        isIntervenantsLoading: false,
      };
    }
    case IntervenantActions.CREATE_INTERVENANT_SUCCESS: {
      return {
        ...state,
        intervenantsList: [
          action.payload.intervenant,
          ...state.intervenantsList,
        ],
      };
    }
    case IntervenantActions.DELETE_INTERVENANT_SUCCESS: {
      return {
        ...state,
        intervenantsList: state.intervenantsList.filter(
          (validation) => validation.id !== action.payload.id
        ),
      };
    }
    case IntervenantActions.UPDATE_INTERVENANT_SUCCESS:
      return {
        ...state,
        intervenantsList: state.intervenantsList.map((intervenant) => {
          if (intervenant.id === action.payload.intervenant.id)
            return action.payload.intervenant;
          return intervenant;
        }),
      };
    case IntervenantActions.ONE_INTERVENANT_FETCHING_SUCCESS:
      return {
        ...state,
        isCurrentIntervenantLoading: false,
        currentIntervenant: action.payload.intervenant,
      };
    case IntervenantActions.INTERVENANT_VALIDATION_FETCHING_SUCCESS:
      return {
        ...state,
        isValidationLoading: false,
        intervenantValidations: action.payload.validations,
      };
    case IntervenantActions.CREATE_INTERVENANT_VALIDATION_SUCCESS:
      return {
        ...state,
        intervenantValidations: [
          ...state.intervenantValidations,
          action.payload.validation,
        ],
      };
    case IntervenantActions.UPDATE_INTERVENANT_VALIDATION_SUCCESS:
      return {
        ...state,
        intervenantValidations: state.intervenantValidations.map(
          (validation) => {
            if (validation.id === action.payload.validation.id)
              return action.payload.validation;
            return validation;
          }
        ),
      };
    case IntervenantActions.DELETE_INTERVENANT_VALIDATION_SUCCESS:
      return {
        ...state,
        intervenantValidations: state.intervenantValidations.filter(
          (validation) => validation.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export default intervenantReducer;
