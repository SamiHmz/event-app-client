import IntervenantActions from "./intervenant.actions.type";

export const startIntervenantFetching = (pageNumber) => ({
  type: IntervenantActions.START_INTERVENANT_FETCHING,
  payload: {
    pageNumber,
  },
});

export const intervenantFetchingSuccess = (intervenants) => ({
  type: IntervenantActions.INTERVENANT_FETCHING_SUCCESS,
  payload: {
    intervenants,
  },
});

export const startCreateIntervenant = (payload) => ({
  type: IntervenantActions.START_CREATE_INTERVENANT,
  payload,
});

export const createIntervenantSuccess = (intervenant) => ({
  type: IntervenantActions.CREATE_INTERVENANT_SUCCESS,
  payload: {
    intervenant,
  },
});

export const startDeleteIntervenant = (id) => ({
  type: IntervenantActions.START_DELETE_INTERVENANT,
  payload: {
    id,
  },
});

export const deleteIntervenantSuccess = (id) => ({
  type: IntervenantActions.DELETE_INTERVENANT_SUCCESS,
  payload: {
    id,
  },
});

export const startUpdateIntervenant = ({ intervenant, id, ...others }) => ({
  type: IntervenantActions.START_UPDATE_INTERVENANT,
  payload: {
    intervenant,
    id,
    ...others,
  },
});

export const updateIntervenantSuccess = (intervenant) => ({
  type: IntervenantActions.UPDATE_INTERVENANT_SUCCESS,
  payload: {
    intervenant,
  },
});

export const startOneIntervenantFetching = (id) => ({
  type: IntervenantActions.START_ONE_INTERVENANT_FETCHING,
  payload: { id },
});

export const OneIntervenantFetchingSuccess = (intervenant) => ({
  type: IntervenantActions.ONE_INTERVENANT_FETCHING_SUCCESS,
  payload: { intervenant },
});

export const startIntervenantValidationFetching = (id) => ({
  type: IntervenantActions.START_INTERVENANT_VALIDATION_FETCHING,
  payload: { id },
});
export const IntervenantValidationFetchingSuccess = (validations) => ({
  type: IntervenantActions.INTERVENANT_VALIDATION_FETCHING_SUCCESS,
  payload: { validations },
});

export const startCreateIntervenantValidation = (payload) => ({
  type: IntervenantActions.CREATE_INTERVENANT_VALIDATION_START,
  payload,
});

export const createIntervenantValidationSuccess = (validation) => ({
  type: IntervenantActions.CREATE_INTERVENANT_VALIDATION_SUCCESS,
  payload: {
    validation,
  },
});

export const startUpdateIntervenantValidation = (payload) => ({
  type: IntervenantActions.START_INTERVENANT_UPDATE_VALIDATION,
  payload,
});

export const updateValidationIntervenantSuccess = (validation) => ({
  type: IntervenantActions.UPDATE_INTERVENANT_VALIDATION_SUCCESS,
  payload: {
    validation,
  },
});

export const startDeleteIntervenantValidation = (id) => ({
  type: IntervenantActions.START_DELETE_INTERVENANT_VALIDATION,
  payload: {
    id,
  },
});

export const deleteValidationIntervenantSuccess = (id) => ({
  type: IntervenantActions.DELETE_INTERVENANT_VALIDATION_SUCCESS,
  payload: {
    id,
  },
});
