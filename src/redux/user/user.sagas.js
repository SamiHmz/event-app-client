import { takeLatest, put, call, all } from "redux-saga/effects";
import userActions from "./user.actions";
import { login } from "../../services/user.services";
import jwt_decode from "jwt-decode";

function* onLoginStarts({ payload }) {
  const { type, email, password, setErrors } = payload;
  try {
    const token = yield call(login, type, { email, password });
    yield localStorage.setItem("token", token);
    const user = yield jwt_decode(token);
    yield put({ type: userActions.SET_CURRENT_USER, payload: user });
  } catch (error) {
    yield setErrors({ server: error.response.data });
  }
}

export function* watchLoginStarts() {
  yield takeLatest(userActions.LOGIN_START, onLoginStarts);
}

export function* userSagas() {
  yield all([call(watchLoginStarts)]);
}
