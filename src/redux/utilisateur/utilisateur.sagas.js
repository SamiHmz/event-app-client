import { takeLatest, put, call, all } from "redux-saga/effects";
import { message } from "antd";
import UtilisateurActions from "./utilisateur.actions.type";
import {
  getAllUtilisateur,
  createUtilisateur,
  deleteUtilisateur,
  updateUtilisateur,
  getOneUtilisateur,
} from "../../services/utilisateur.services";
import {
  utilisateurFetchingSuccess,
  createUtilisateurSuccess,
  deleteUtilisateurSuccess,
  updateUtilisateurSuccess,
  OneUtilisateurFetchingSuccess,
} from "./utilisateur.actions";

export function* onUtilisateurFetchingStart({ payload }) {
  try {
    const { data: utilisateurs } = yield call(
      getAllUtilisateur,
      payload.pageNumber,
      payload.search,
      payload.filter
    );
    yield put(utilisateurFetchingSuccess(utilisateurs));
  } catch (error) {
    console.log(error);
  }
}
export function* watchUtilisateurFetchingStart() {
  yield takeLatest(
    UtilisateurActions.START_UTILISATEUR_FETCHING,
    onUtilisateurFetchingStart
  );
}

export function* onCreateUtilisateurStart({ payload }) {
  try {
    const { data: utilisateur } = yield call(
      createUtilisateur,
      payload.utilisateur
    );
    yield put(createUtilisateurSuccess(utilisateur));
    yield payload.closeForm();
    yield message.success("l'utilisateur a été créé  avec succès");
  } catch (error) {
    yield payload.setErrors({ server: error.response.data });
  }
}
export function* watchCreateUtilisateurStart() {
  yield takeLatest(
    UtilisateurActions.START_CREATE_UTILISATEUR,
    onCreateUtilisateurStart
  );
}
export function* onDeleteUtilisateurStart({ payload }) {
  console.log("id:", payload.id);
  try {
    yield call(deleteUtilisateur, payload.id);
    yield put(deleteUtilisateurSuccess(payload.id));
    message.success("l'utilisateur est supprimé avec succès");
  } catch (error) {
    console.log(error);
  }
}

export function* watchDeleteUtilisateurStart() {
  yield takeLatest(
    UtilisateurActions.START_DELETE_UTILISATEUR,
    onDeleteUtilisateurStart
  );
}
export function* onUpdateUtilisateurStart({ payload }) {
  try {
    const { data: utilisateur } = yield call(
      updateUtilisateur,
      payload.utilisateur,
      payload.id
    );
    yield put(updateUtilisateurSuccess(utilisateur));
    yield payload.closeForm();

    yield message.success("l'utilisateur a été modifièe  avec succès");
  } catch (error) {
    yield payload.setErrors({ server: error.response.data });
  }
}
export function* watchUpdateUtilisateurStart() {
  yield takeLatest(
    UtilisateurActions.START_UPDATE_UTILISATEUR,
    onUpdateUtilisateurStart
  );
}

function* onFetchOneUtilisateurStart({ payload }) {
  try {
    const { data: utilisateur } = yield call(getOneUtilisateur, payload.id);
    yield put(OneUtilisateurFetchingSuccess(utilisateur));
  } catch (error) {
    console.log(error);
  }
}
export function* watchFetchOneUtilisateurStart() {
  yield takeLatest(
    UtilisateurActions.START_ONE_UTILISATEUR_FETCHING,
    onFetchOneUtilisateurStart
  );
}

export function* utilisateurSagas() {
  yield all([
    call(watchUtilisateurFetchingStart),
    call(watchCreateUtilisateurStart),
    call(watchDeleteUtilisateurStart),
    call(watchUpdateUtilisateurStart),
    call(watchFetchOneUtilisateurStart),
  ]);
}
