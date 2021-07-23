import IntervenantActions from "./intervenant.actions.type";

const INITIAL_STATE = {
  intervenantsList: [],
  isIntervenantsLoading: true,
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
    default:
      return state;
  }
};

export default intervenantReducer;
