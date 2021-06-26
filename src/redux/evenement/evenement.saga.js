import { takeLatest, takeEvery, put, call } from "redux-saga/effects";
import evenemetActions from "./evenement.actions.types";
import { fetchingDemandesSuccess } from "./evenement.actions";
import { getAllDemandes } from "../../services/evenement.services";

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
