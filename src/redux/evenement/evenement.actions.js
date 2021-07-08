import evenemetActions from "./evenement.actions.types";

export const startFetchingDemandes = (pageNumber) => ({
  type: evenemetActions.START_DEMANDE_FETCHING,
  payload: { pageNumber },
});
export const fetchingDemandesSuccess = (demandes) => ({
  type: evenemetActions.DEMANDE_FETCHING_SUCCESS,
  payload: { demandes },
});

export const startCreateDemande = (payload) => ({
  type: evenemetActions.START_DEMANDE_CREACTION,
  payload,
});
export const createDemandeSuccess = (demande) => ({
  type: evenemetActions.DEMANDE_CREATION_SUCCESS,
  payload: demande,
});

export const startDemandeValidationFetching = (id) => ({
  type: evenemetActions.START_DEMANDE_VALIDATION_FETCHING,
  payload: { id },
});
export const DemandeValidationFetchingSuccess = (validations) => ({
  type: evenemetActions.DEMANDE_VALIDATION_FETCHING_SUCCESS,
  payload: { validations },
});

export const startOneDemandeFetching = (id) => ({
  type: evenemetActions.START_ONE_DEMANDE_FETCHING,
  payload: { id },
});

export const OneDemandeFetchingSuccess = (demande) => ({
  type: evenemetActions.ONE_DEMANDE_FETCHING_SUCCESS,
  payload: { demande },
});

export const startCreateValidation = (validation) => ({
  type: evenemetActions.CREATE_VALIDATION_START,
  payload: {
    validation,
  },
});

export const createValidationSuccess = (validation) => ({
  type: evenemetActions.CREATE_VALIDATION_SUCCESS,
  payload: {
    validation,
  },
});

export const startUpdateDemande = ({ demande, id, ...others }) => ({
  type: evenemetActions.START_UPDATE_DEMANDE,
  payload: {
    demande,
    id,
    ...others,
  },
});

export const updateDemandeSuccess = (demande) => ({
  type: evenemetActions.UPDATE_DEMANDE_SUCCESS,
  payload: {
    demande,
  },
});

export const startDeleteDemande = (id) => ({
  type: evenemetActions.START_DELETE_DEMANDE,
  payload: { id },
});
export const deleteDemandeSuccess = (id) => ({
  type: evenemetActions.DELETE_DEMANDE_SUCCESS,
  payload: { id },
});
