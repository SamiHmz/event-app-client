import sponsoringActions from "./sponsoring.actions.type";

const INITIAL_STATE = {
  sponsoringList: [],
  isSponsoringLoading: true,
  currentSponsoring: null,
  isCurrentSponsoringLoading: true,
  isValidationLoading: true,
  sponsoringValidations: [],
};

const sponsoringReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case sponsoringActions.SPONSORING_FETCHING_SUCCESS: {
      return {
        ...state,
        sponsoringList: action.payload.sponsorings,
        isSponsoringLoading: false,
      };
    }
    case sponsoringActions.CREATE_SPONSORING_SUCCESS: {
      return {
        ...state,
        sponsoringList: [action.payload.sponsoring, ...state.sponsoringList],
      };
    }
    case sponsoringActions.DELETE_SPONSORING_SUCCESS: {
      return {
        ...state,
        sponsoringList: state.sponsoringList.filter(
          (validation) => validation.id !== action.payload.id
        ),
      };
    }
    case sponsoringActions.UPDATE_SPONSORING_SUCCESS:
      return {
        ...state,
        sponsoringList: state.sponsoringList.map((sponsoring) => {
          if (sponsoring.id === action.payload.sponsoring.id)
            return action.payload.sponsoring;
          return sponsoring;
        }),
      };
    case sponsoringActions.ONE_SPONSORING_FETCHING_SUCCESS:
      return {
        ...state,
        isCurrentSponsoringLoading: false,
        currentSponsoring: action.payload.sponsoring,
      };
    case sponsoringActions.SPONSORING_VALIDATION_FETCHING_SUCCESS:
      return {
        ...state,
        isValidationLoading: false,
        sponsoringValidations: action.payload.validations,
      };
    case sponsoringActions.CREATE_SPONSORING_VALIDATION_SUCCESS:
      return {
        ...state,
        sponsoringValidations: [
          ...state.sponsoringValidations,
          action.payload.validation,
        ],
      };
    case sponsoringActions.UPDATE_SPONSORING_VALIDATION_SUCCESS:
      return {
        ...state,
        sponsoringValidations: state.sponsoringValidations.map((validation) => {
          if (validation.id === action.payload.validation.id)
            return action.payload.validation;
          return validation;
        }),
      };
    case sponsoringActions.DELETE_SPONSORING_VALIDATION_SUCCESS:
      return {
        ...state,
        sponsoringValidations: state.sponsoringValidations.filter(
          (validation) => validation.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export default sponsoringReducer;
