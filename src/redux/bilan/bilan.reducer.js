import BilanActions from "./bilan.actions.type";

const INITIAL_STATE = {
  bilansList: [],
  isBilansLoading: true,
  currentBilan: null,
  isCurrentBilanLoading: true,
};

const bilanReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BilanActions.BILAN_FETCHING_SUCCESS: {
      return {
        ...state,
        bilansList: action.payload.bilans,
        isBilansLoading: false,
      };
    }
    case BilanActions.CREATE_BILAN_SUCCESS: {
      return {
        ...state,
        bilansList: [action.payload.bilan, ...state.bilansList],
      };
    }
    case BilanActions.DELETE_BILAN_SUCCESS: {
      return {
        ...state,
        bilansList: state.bilansList.filter(
          (validation) => validation.id !== action.payload.id
        ),
      };
    }
    case BilanActions.UPDATE_BILAN_SUCCESS:
      return {
        ...state,
        bilansList: state.bilansList.map((bilan) => {
          if (bilan.id === action.payload.bilan.id) return action.payload.bilan;
          return bilan;
        }),
      };
    case BilanActions.ONE_BILAN_FETCHING_SUCCESS:
      return {
        ...state,
        isCurrentBilanLoading: false,
        currentBilan: action.payload.bilan,
      };

    default:
      return state;
  }
};

export default bilanReducer;
