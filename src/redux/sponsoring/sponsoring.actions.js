import sponsoringActions from "./sponsoring.actions.type";

export const startSponsoringFetching = (pageNumber) => ({
  type: sponsoringActions.START_SPONSORING_FETCHING,
  payload: {
    pageNumber,
  },
});

export const sponsoringFetchingSuccess = (sponsorings) => ({
  type: sponsoringActions.SPONSORING_FETCHING_SUCCESS,
  payload: {
    sponsorings,
  },
});

export const startCreateSponsoring = (payload) => ({
  type: sponsoringActions.START_CREATE_SPONSORING,
  payload,
});

export const createSponsoringSuccess = (sponsoring) => ({
  type: sponsoringActions.CREATE_SPONSORING_SUCCESS,
  payload: {
    sponsoring,
  },
});

export const startDeleteSponsoring = (id) => ({
  type: sponsoringActions.START_DELETE_SPONSORING,
  payload: {
    id,
  },
});

export const deleteSponsoringSuccess = (id) => ({
  type: sponsoringActions.DELETE_SPONSORING_SUCCESS,
  payload: {
    id,
  },
});

export const startUpdateSponsoring = ({ sponsoring, id, ...others }) => ({
  type: sponsoringActions.START_UPDATE_SPONSORING,
  payload: {
    sponsoring,
    id,
    ...others,
  },
});

export const updateSponsoringSuccess = (sponsoring) => ({
  type: sponsoringActions.UPDATE_SPONSORING_SUCCESS,
  payload: {
    sponsoring,
  },
});

export const startOneSponsoringFetching = (id) => ({
  type: sponsoringActions.START_ONE_SPONSORING_FETCHING,
  payload: { id },
});

export const OneSponsoringFetchingSuccess = (sponsoring) => ({
  type: sponsoringActions.ONE_SPONSORING_FETCHING_SUCCESS,
  payload: { sponsoring },
});

export const startSponsoringValidationFetching = (id) => ({
  type: sponsoringActions.START_SPONSORING_VALIDATION_FETCHING,
  payload: { id },
});
export const SponsoringValidationFetchingSuccess = (validations) => ({
  type: sponsoringActions.SPONSORING_VALIDATION_FETCHING_SUCCESS,
  payload: { validations },
});

export const startCreateSponsoringValidation = (payload) => ({
  type: sponsoringActions.CREATE_SPONSORING_VALIDATION_START,
  payload,
});

export const createSponsoringValidationSuccess = (validation) => ({
  type: sponsoringActions.CREATE_SPONSORING_VALIDATION_SUCCESS,
  payload: {
    validation,
  },
});

export const startUpdateSponsoringValidation = (payload) => ({
  type: sponsoringActions.START_SPONSORING_UPDATE_VALIDATION,
  payload,
});

export const updateValidationSponsoringSuccess = (validation) => ({
  type: sponsoringActions.UPDATE_SPONSORING_VALIDATION_SUCCESS,
  payload: {
    validation,
  },
});

export const startDeleteSponsoringValidation = (id) => ({
  type: sponsoringActions.START_DELETE_SPONSORING_VALIDATION,
  payload: {
    id,
  },
});

export const deleteValidationSponsoringSuccess = (id) => ({
  type: sponsoringActions.DELETE_SPONSORING_VALIDATION_SUCCESS,
  payload: {
    id,
  },
});
