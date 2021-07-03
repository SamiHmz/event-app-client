import { takeLatest, put, call, all } from "redux-saga/effects";
import evenemetActions from "./evenement.actions.types";
import {
  fetchingDemandesSuccess,
  createDemandeSuccess,
  DemandeValidationFetchingSuccess,
  OneDemandeFetchingSuccess,
} from "./evenement.actions";
import {
  getAllDemandes,
  createDemande,
  getAllValidation,
  getOneDemande,
} from "../../services/evenement.services";

function* onFetchDemandesStarts({ payload }) {
  try {
    const { data: demandes } = yield call(getAllDemandes, payload.pageNumber);
    console.log(payload.pageNumber, demandes);
    yield put(fetchingDemandesSuccess(demandes));
  } catch (error) {
    console.log(error);
  }
}

export function* watchFetchDemandesStart() {
  yield takeLatest(
    evenemetActions.START_DEMANDE_FETCHING,
    onFetchDemandesStarts
  );
}

function* onFetchOneDemandeStart({ payload }) {
  try {
    const { data: demande } = yield call(getOneDemande, payload.id);
    yield put(OneDemandeFetchingSuccess(demande));
  } catch (error) {
    console.log(error);
  }

  return;
}
export function* watchFetchOneDemandeStart() {
  yield takeLatest(
    evenemetActions.START_ONE_DEMANDE_FETCHING,
    onFetchOneDemandeStart
  );
}

export function* onEvenementCreatedStart({ payload }) {
  try {
    const { data: demande } = yield call(createDemande, payload.demande);
    yield put(createDemandeSuccess(demande));
    yield payload.closeForm();
  } catch (error) {
    yield payload.setErrors({ server: error.response.data });
  }
}

export function* watchEvenementCreated() {
  yield takeLatest(
    evenemetActions.START_DEMANDE_CREACTION,
    onEvenementCreatedStart
  );
}

function* onDemandeValidationFetchingStart({ payload }) {
  try {
    const { data: demandes } = yield call(getAllValidation, payload.id);
    yield put(DemandeValidationFetchingSuccess(demandes));
  } catch (error) {
    console.log(error);
  }
}

export function* watchDemandeValidationFetching() {
  yield takeLatest(
    evenemetActions.START_DEMANDE_VALIDATION_FETCHING,
    onDemandeValidationFetchingStart
  );
}

export function* evenementSagas() {
  yield all([
    call(watchEvenementCreated),
    call(watchFetchDemandesStart),
    call(watchDemandeValidationFetching),
    call(watchFetchOneDemandeStart),
  ]);
}
