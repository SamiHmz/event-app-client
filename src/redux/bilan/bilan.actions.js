import BilanActions from "./bilan.actions.type";

export const startBilanFetching = (pageNumber) => ({
  type: BilanActions.START_BILAN_FETCHING,
  payload: {
    pageNumber,
  },
});

export const bilanFetchingSuccess = (bilans) => ({
  type: BilanActions.BILAN_FETCHING_SUCCESS,
  payload: {
    bilans,
  },
});

export const startCreateBilan = (payload) => ({
  type: BilanActions.START_CREATE_BILAN,
  payload,
});

export const createBilanSuccess = (bilan) => ({
  type: BilanActions.CREATE_BILAN_SUCCESS,
  payload: {
    bilan,
  },
});

export const startDeleteBilan = (id) => ({
  type: BilanActions.START_DELETE_BILAN,
  payload: {
    id,
  },
});

export const deleteBilanSuccess = (id) => ({
  type: BilanActions.DELETE_BILAN_SUCCESS,
  payload: {
    id,
  },
});

export const startUpdateBilan = ({ bilan, id, ...others }) => ({
  type: BilanActions.START_UPDATE_BILAN,
  payload: {
    bilan,
    id,
    ...others,
  },
});

export const updateBilanSuccess = (bilan) => ({
  type: BilanActions.UPDATE_BILAN_SUCCESS,
  payload: {
    bilan,
  },
});

export const startOneBilanFetching = (id) => ({
  type: BilanActions.START_ONE_BILAN_FETCHING,
  payload: { id },
});

export const OneBilanFetchingSuccess = (bilan) => ({
  type: BilanActions.ONE_BILAN_FETCHING_SUCCESS,
  payload: { bilan },
});
