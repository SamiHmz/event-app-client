import { takeLatest, put, call, all } from "redux-saga/effects";
import evenemetActions from "./evenement.actions.types";
import {
  fetchingDemandesSuccess,
  createDemandeSuccess,
  DemandeValidationFetchingSuccess,
} from "./evenement.actions";
import {
  getAllDemandes,
  createDemande,
  getAllValidation,
} from "../../services/evenement.services";

function* onFetchDemandesStarts({ payload }) {
  try {
    const { data: demades } = yield call(getAllDemandes, payload.pageNumber);
    yield put(fetchingDemandesSuccess(demades));
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

export function* onEvenementCreatedStart({ payload }) {
  try {
    const { data: demande } = yield call(createDemande, payload.demande);
    yield put(createDemandeSuccess(demande));
    yield payload.closeForm();
    yield payload.resetForm();
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
  ]);
}
