import evenemetActions from "./evenement.actions.types";

export const startFetchingDemandes = (pageNumber) => ({
  type: evenemetActions.START_DEMANDE_FETCHING,
  payload: { pageNumber },
});
export const fetchingDemandesSuccess = (demandes) => ({
  type: evenemetActions.DEMANDE_FETCHING_SUCCESS,
  payload: { demandes },
});

// const fetchingDemandesFailure = ()
