import { takeLatest, put, call, all } from "redux-saga/effects";
import { message } from "antd";
import sponsoringActions from "./sponsoring.actions.type";
import {
  getAllSponsoring,
  createSponsoring,
  deleteSponsoring,
  updateSponsoring,
  getOneSponsoring,
  getAllSponsoringValidations,
  createSponsoringValidation,
  updateSponsoringValidation,
  deleteSponsoringValidation,
} from "../../services/sponsoring.services";
import {
  sponsoringFetchingSuccess,
  createSponsoringSuccess,
  deleteSponsoringSuccess,
  updateSponsoringSuccess,
  OneSponsoringFetchingSuccess,
  SponsoringValidationFetchingSuccess,
  createSponsoringValidationSuccess,
  updateValidationSponsoringSuccess,
  deleteValidationSponsoringSuccess,
} from "./sponsoring.actions";

export function* onSponsoringFetchingStart({ payload }) {
  try {
    const { data: sponsorings } = yield call(
      getAllSponsoring,
      payload.pageNumber
    );
    yield put(sponsoringFetchingSuccess(sponsorings));
  } catch (error) {
    console.log(error);
  }
}
export function* watchSponsoringFetchingStart() {
  yield takeLatest(
    sponsoringActions.START_SPONSORING_FETCHING,
    onSponsoringFetchingStart
  );
}

export function* onCreateSponsoringStart({ payload }) {
  try {
    const { data: sponsoring } = yield call(
      createSponsoring,
      payload.sponsoring
    );
    yield put(createSponsoringSuccess(sponsoring));
    yield payload.closeForm();
    yield message.success("le sponsoring a été créé  avec succès");
  } catch (error) {
    yield payload.setErrors({ server: error.response.data });
  }
}
export function* watchCreateSponsoringStart() {
  yield takeLatest(
    sponsoringActions.START_CREATE_SPONSORING,
    onCreateSponsoringStart
  );
}
export function* onDeleteSponsoringStart({ payload }) {
  console.log("id:", payload.id);
  try {
    yield call(deleteSponsoring, payload.id);
    yield put(deleteSponsoringSuccess(payload.id));
    message.success("le sponsoring est supprimé avec succès");
  } catch (error) {
    console.log(error);
  }
}

export function* watchDeleteSponsoringStart() {
  yield takeLatest(
    sponsoringActions.START_DELETE_SPONSORING,
    onDeleteSponsoringStart
  );
}
export function* onUpdateSponsoringStart({ payload }) {
  try {
    const { data: sponsoring } = yield call(
      updateSponsoring,
      payload.sponsoring,
      payload.id
    );
    yield put(updateSponsoringSuccess(sponsoring));
    yield payload.closeForm();

    yield message.success("le sponsoring a été modifièe  avec succès");
  } catch (error) {
    yield payload.setErrors({ server: error.response.data });
  }
}
export function* watchUpdateSponsoringStart() {
  yield takeLatest(
    sponsoringActions.START_UPDATE_SPONSORING,
    onUpdateSponsoringStart
  );
}

function* onFetchOneSponsoringStart({ payload }) {
  try {
    const { data: sponsoring } = yield call(getOneSponsoring, payload.id);
    yield put(OneSponsoringFetchingSuccess(sponsoring));
  } catch (error) {
    console.log(error);
  }

  return;
}
export function* watchFetchOneSponsoringStart() {
  yield takeLatest(
    sponsoringActions.START_ONE_SPONSORING_FETCHING,
    onFetchOneSponsoringStart
  );
}

function* onSponsoringValidationFetchingStart({ payload }) {
  try {
    const { data: validations } = yield call(
      getAllSponsoringValidations,
      payload.id
    );
    yield put(SponsoringValidationFetchingSuccess(validations));
  } catch (error) {
    console.log(error);
  }
}

export function* watchSponsoringValidationFetchingStart() {
  yield takeLatest(
    sponsoringActions.START_SPONSORING_VALIDATION_FETCHING,
    onSponsoringValidationFetchingStart
  );
}

export function* onCreateSponsoringValidationStart({ payload }) {
  try {
    console.log("validation", payload.validation);
    const { data: validation } = yield call(
      createSponsoringValidation,
      payload.validation
    );
    yield put(createSponsoringValidationSuccess(validation));
    yield payload.resetForm();
    yield payload.onCancel();
    yield message.success("la validation a été créé  avec succès");
  } catch (error) {
    yield payload.setErrors({ server: error.response.data });
  }
}
export function* watchCreateSponsoringValidationStart() {
  yield takeLatest(
    sponsoringActions.CREATE_SPONSORING_VALIDATION_START,
    onCreateSponsoringValidationStart
  );
}

export function* onUpdateSponsoringValidationStart({ payload }) {
  try {
    const { data: validation } = yield call(
      updateSponsoringValidation,
      payload.validation,
      payload.id
    );
    yield put(updateValidationSponsoringSuccess(validation));
    yield payload.resetForm();
    yield payload.onCancel();
    yield message.success("la validation a été modifier avec succès");
  } catch (error) {
    yield payload.setErrors({ server: error.response.data });
  }
}

export function* watchUpdateSponsoringValidationStart() {
  yield takeLatest(
    sponsoringActions.START_SPONSORING_UPDATE_VALIDATION,
    onUpdateSponsoringValidationStart
  );
}

export function* onDeleteSponsoringValidationStart({ payload }) {
  try {
    yield call(deleteSponsoringValidation, payload.id);
    yield put(deleteValidationSponsoringSuccess(payload.id));
  } catch (error) {
    console.log(error);
  }
}
export function* watchDeleteSponsoringValidationStart() {
  yield takeLatest(
    sponsoringActions.START_DELETE_SPONSORING_VALIDATION,
    onDeleteSponsoringValidationStart
  );
}

export function* sponsoringSagas() {
  yield all([
    call(watchSponsoringFetchingStart),
    call(watchCreateSponsoringStart),
    call(watchDeleteSponsoringStart),
    call(watchUpdateSponsoringStart),
    call(watchFetchOneSponsoringStart),
    call(watchSponsoringValidationFetchingStart),
    call(watchCreateSponsoringValidationStart),
    call(watchUpdateSponsoringValidationStart),
    call(watchDeleteSponsoringValidationStart),
  ]);
}
