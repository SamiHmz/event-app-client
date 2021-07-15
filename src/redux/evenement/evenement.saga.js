import { takeLatest, put, call, all } from "redux-saga/effects";
import evenemetActions from "./evenement.actions.types";
import { toast } from "react-toastify";
import { toastConfig } from "../../services/axios";
import { message } from "antd";
import {
  fetchingDemandesSuccess,
  createDemandeSuccess,
  DemandeValidationFetchingSuccess,
  OneDemandeFetchingSuccess,
  createValidationSuccess,
  updateDemandeSuccess,
  deleteDemandeSuccess,
  updateValidationSuccess,
  deleteValidationSuccess,
} from "./evenement.actions";
import {
  getAllDemandes,
  createDemande,
  getAllValidation,
  getOneDemande,
  createDemandeValidation,
  updateDemande,
  deleteDemande,
  updateDemandeValidation,
  deleteDemandeValidation,
} from "../../services/evenement.services";

function* onFetchDemandesStarts({ payload }) {
  try {
    const { data: demandes } = yield call(getAllDemandes, payload.pageNumber);
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
    yield message.success("la demande a été créé  avec succès");
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

export function* onCreateValidationStart({ payload }) {
  try {
    const { data: validation } = yield call(
      createDemandeValidation,
      payload.validation
    );
    yield put(createValidationSuccess(validation));
    yield payload.resetForm();
    yield payload.onCancel();
    yield message.success("la validation a été créé  avec succès");
  } catch (error) {
    yield payload.setErrors({ server: error.response.data });
    // if (error.response && error.response.status >= 400) {
    //   console.log(error);

    //   toast.error(error.response.data, toastConfig);
    // }
  }
}
export function* watchCreateValidationStart() {
  yield takeLatest(
    evenemetActions.CREATE_VALIDATION_START,
    onCreateValidationStart
  );
}

export function* onUpdateDemandeStart({ payload }) {
  try {
    const { data: demande } = yield call(
      updateDemande,
      payload.demande,
      payload.id
    );
    yield put(updateDemandeSuccess(demande));
    yield payload.closeForm();

    yield message.success("la demande a été modifièe  avec succès");
  } catch (error) {
    yield payload.setErrors({ server: error.response.data });
  }
}
export function* watchUpdateDemandeStart() {
  yield takeLatest(evenemetActions.START_UPDATE_DEMANDE, onUpdateDemandeStart);
}

export function* onDeleteDemandeStart({ payload }) {
  try {
    yield call(deleteDemande, payload.id);
    yield put(deleteDemandeSuccess(payload.id));
    message.success("la demande est supprimé avec succès");
  } catch (error) {
    console.log(error);
  }
}
export function* watchDeleteDemandeStart() {
  yield takeLatest(evenemetActions.START_DELETE_DEMANDE, onDeleteDemandeStart);
}

export function* onUpdateValidationStart({ payload }) {
  try {
    const { data: validation } = yield call(
      updateDemandeValidation,
      payload.validation,
      payload.id
    );
    yield put(updateValidationSuccess(validation));
    yield payload.resetForm();
    yield payload.onCancel();
    yield message.success("la validation a été modifier avec succès");
  } catch (error) {
    yield payload.setErrors({ server: error.response.data });
  }
}

export function* watchUpdateValidationStart() {
  yield takeLatest(
    evenemetActions.START_UPDATE_VALIDATION,
    onUpdateValidationStart
  );
}

export function* onDeleteValidationStart({ payload }) {
  try {
    yield call(deleteDemandeValidation, payload.id);
    yield put(deleteValidationSuccess(payload.id));
  } catch (error) {
    console.log(error);
  }
}
export function* watchDeleteValidationStart() {
  yield takeLatest(
    evenemetActions.START_DELETE_VALIDATION,
    onDeleteValidationStart
  );
}
export function* evenementSagas() {
  yield all([
    call(watchEvenementCreated),
    call(watchFetchDemandesStart),
    call(watchDemandeValidationFetching),
    call(watchFetchOneDemandeStart),
    call(watchCreateValidationStart),
    call(watchUpdateDemandeStart),
    call(watchDeleteDemandeStart),
    call(watchUpdateValidationStart),
    call(watchDeleteValidationStart),
  ]);
}
