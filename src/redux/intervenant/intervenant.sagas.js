import { takeLatest, put, call, all } from "redux-saga/effects";
import { message } from "antd";
import IntervenantActions from "./intervenant.actions.type";
import {
  getAllIntervenant,
  createIntervenant,
  deleteIntervenant,
  updateIntervenant,
  getOneIntervenant,
  getAllIntervenantValidations,
  createIntervenantValidation,
  updateIntervenantValidation,
  deleteIntervenantValidation,
} from "../../services/intervenant.services";
import {
  intervenantFetchingSuccess,
  createIntervenantSuccess,
  deleteIntervenantSuccess,
  updateIntervenantSuccess,
  OneIntervenantFetchingSuccess,
  IntervenantValidationFetchingSuccess,
  createIntervenantValidationSuccess,
  updateValidationIntervenantSuccess,
  deleteValidationIntervenantSuccess,
} from "./intervenant.actions";

export function* onIntervenantFetchingStart({ payload }) {
  try {
    const { data: intervenants } = yield call(
      getAllIntervenant,
      payload.pageNumber
    );
    yield put(intervenantFetchingSuccess(intervenants));
  } catch (error) {
    console.log(error);
  }
}
export function* watchIntervenantFetchingStart() {
  yield takeLatest(
    IntervenantActions.START_INTERVENANT_FETCHING,
    onIntervenantFetchingStart
  );
}

export function* onCreateIntervenantStart({ payload }) {
  try {
    const { data: intervenant } = yield call(
      createIntervenant,
      payload.intervenant
    );
    yield put(createIntervenantSuccess(intervenant));
    yield payload.closeForm();
    yield message.success("l'intervenant a été créé  avec succès");
  } catch (error) {
    yield payload.setErrors({ server: error.response.data });
  }
}
export function* watchCreateIntervenantStart() {
  yield takeLatest(
    IntervenantActions.START_CREATE_INTERVENANT,
    onCreateIntervenantStart
  );
}
export function* onDeleteIntervenantStart({ payload }) {
  console.log("id:", payload.id);
  try {
    yield call(deleteIntervenant, payload.id);
    yield put(deleteIntervenantSuccess(payload.id));
    message.success("l'intervenant est supprimé avec succès");
  } catch (error) {
    console.log(error);
  }
}

export function* watchDeleteIntervenantStart() {
  yield takeLatest(
    IntervenantActions.START_DELETE_INTERVENANT,
    onDeleteIntervenantStart
  );
}
export function* onUpdateIntervenantStart({ payload }) {
  try {
    const { data: intervenant } = yield call(
      updateIntervenant,
      payload.intervenant,
      payload.id
    );
    yield put(updateIntervenantSuccess(intervenant));
    yield payload.closeForm();

    yield message.success("l'intervenant a été modifièe  avec succès");
  } catch (error) {
    yield payload.setErrors({ server: error.response.data });
  }
}
export function* watchUpdateIntervenantStart() {
  yield takeLatest(
    IntervenantActions.START_UPDATE_INTERVENANT,
    onUpdateIntervenantStart
  );
}

function* onFetchOneIntervenantStart({ payload }) {
  try {
    const { data: intervenant } = yield call(getOneIntervenant, payload.id);
    yield put(OneIntervenantFetchingSuccess(intervenant));
  } catch (error) {
    console.log(error);
  }

  return;
}
export function* watchFetchOneIntervenantStart() {
  yield takeLatest(
    IntervenantActions.START_ONE_INTERVENANT_FETCHING,
    onFetchOneIntervenantStart
  );
}

function* onIntervenantValidationFetchingStart({ payload }) {
  try {
    const { data: validations } = yield call(
      getAllIntervenantValidations,
      payload.id
    );
    yield put(IntervenantValidationFetchingSuccess(validations));
  } catch (error) {
    console.log(error);
  }
}

export function* watchIntervenantValidationFetchingStart() {
  yield takeLatest(
    IntervenantActions.START_INTERVENANT_VALIDATION_FETCHING,
    onIntervenantValidationFetchingStart
  );
}

export function* onCreateIntervenantValidationStart({ payload }) {
  try {
    console.log("validation", payload.validation);
    const { data: validation } = yield call(
      createIntervenantValidation,
      payload.validation
    );
    yield put(createIntervenantValidationSuccess(validation));
    yield payload.resetForm();
    yield payload.onCancel();
    yield message.success("la validation a été créé  avec succès");
  } catch (error) {
    yield payload.setErrors({ server: error.response.data });
  }
}
export function* watchCreateIntervenantValidationStart() {
  yield takeLatest(
    IntervenantActions.CREATE_INTERVENANT_VALIDATION_START,
    onCreateIntervenantValidationStart
  );
}

export function* onUpdateIntervenantValidationStart({ payload }) {
  try {
    const { data: validation } = yield call(
      updateIntervenantValidation,
      payload.validation,
      payload.id
    );
    yield put(updateValidationIntervenantSuccess(validation));
    yield payload.resetForm();
    yield payload.onCancel();
    yield message.success("la validation a été modifier avec succès");
  } catch (error) {
    yield payload.setErrors({ server: error.response.data });
  }
}

export function* watchUpdateIntervenantValidationStart() {
  yield takeLatest(
    IntervenantActions.START_INTERVENANT_UPDATE_VALIDATION,
    onUpdateIntervenantValidationStart
  );
}

export function* onDeleteIntervenantValidationStart({ payload }) {
  try {
    yield call(deleteIntervenantValidation, payload.id);
    yield put(deleteValidationIntervenantSuccess(payload.id));
  } catch (error) {
    console.log(error);
  }
}
export function* watchDeleteIntervenantValidationStart() {
  yield takeLatest(
    IntervenantActions.START_DELETE_INTERVENANT_VALIDATION,
    onDeleteIntervenantValidationStart
  );
}

export function* intervenantSagas() {
  yield all([
    call(watchIntervenantFetchingStart),
    call(watchCreateIntervenantStart),
    call(watchDeleteIntervenantStart),
    call(watchUpdateIntervenantStart),
    call(watchFetchOneIntervenantStart),
    call(watchIntervenantValidationFetchingStart),
    call(watchCreateIntervenantValidationStart),
    call(watchUpdateIntervenantValidationStart),
    call(watchDeleteIntervenantValidationStart),
  ]);
}
