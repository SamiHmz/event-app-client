import { takeLatest, put, call, all } from "redux-saga/effects";
import { message } from "antd";
import IntervenantActions from "./intervenant.actions.type";
import {
  getAllIntervenant,
  createIntervenant,
  deleteIntervenant,
  updateIntervenant,
} from "../../services/intervenant.services";
import {
  intervenantFetchingSuccess,
  createIntervenantSuccess,
  deleteIntervenantSuccess,
  updateIntervenantSuccess,
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
export function* intervenantSagas() {
  yield all([
    call(watchIntervenantFetchingStart),
    call(watchCreateIntervenantStart),
    call(watchDeleteIntervenantStart),
    call(watchUpdateIntervenantStart),
  ]);
}