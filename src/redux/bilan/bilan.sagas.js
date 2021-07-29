import { takeLatest, put, call, all } from "redux-saga/effects";
import { message } from "antd";
import BilanActions from "./bilan.actions.type";
import {
  getAllBilan,
  createBilan,
  deleteBilan,
  updateBilan,
  getOneBilan,
} from "../../services/bilan.services";
import {
  bilanFetchingSuccess,
  createBilanSuccess,
  deleteBilanSuccess,
  updateBilanSuccess,
  OneBilanFetchingSuccess,
} from "./bilan.actions";

export function* onBilanFetchingStart({ payload }) {
  try {
    const { data: bilans } = yield call(getAllBilan, payload.pageNumber);
    yield put(bilanFetchingSuccess(bilans));
  } catch (error) {
    console.log(error);
  }
}
export function* watchBilanFetchingStart() {
  yield takeLatest(BilanActions.START_BILAN_FETCHING, onBilanFetchingStart);
}

export function* onCreateBilanStart({ payload }) {
  try {
    const { data: bilan } = yield call(createBilan, payload.bilan);
    yield put(createBilanSuccess(bilan));
    yield payload.closeForm();
    yield message.success("l'bilan a été créé  avec succès");
  } catch (error) {
    yield payload.setErrors({ server: error.response.data });
  }
}
export function* watchCreateBilanStart() {
  yield takeLatest(BilanActions.START_CREATE_BILAN, onCreateBilanStart);
}
export function* onDeleteBilanStart({ payload }) {
  console.log("id:", payload.id);
  try {
    yield call(deleteBilan, payload.id);
    yield put(deleteBilanSuccess(payload.id));
    message.success("l'bilan est supprimé avec succès");
  } catch (error) {
    console.log(error);
  }
}

export function* watchDeleteBilanStart() {
  yield takeLatest(BilanActions.START_DELETE_BILAN, onDeleteBilanStart);
}
export function* onUpdateBilanStart({ payload }) {
  try {
    const { data: bilan } = yield call(updateBilan, payload.bilan, payload.id);
    yield put(updateBilanSuccess(bilan));
    yield payload.closeForm();

    yield message.success("l'bilan a été modifièe  avec succès");
  } catch (error) {
    yield payload.setErrors({ server: error.response.data });
  }
}
export function* watchUpdateBilanStart() {
  yield takeLatest(BilanActions.START_UPDATE_BILAN, onUpdateBilanStart);
}

function* onFetchOneBilanStart({ payload }) {
  try {
    const { data: bilan } = yield call(getOneBilan, payload.id);
    yield put(OneBilanFetchingSuccess(bilan));
  } catch (error) {
    console.log(error);
  }

  return;
}
export function* watchFetchOneBilanStart() {
  yield takeLatest(BilanActions.START_ONE_BILAN_FETCHING, onFetchOneBilanStart);
}

export function* bilanSagas() {
  yield all([
    call(watchBilanFetchingStart),
    call(watchCreateBilanStart),
    call(watchDeleteBilanStart),
    call(watchUpdateBilanStart),
    call(watchFetchOneBilanStart),
  ]);
}
