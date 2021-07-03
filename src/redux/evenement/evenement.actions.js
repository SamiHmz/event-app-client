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
