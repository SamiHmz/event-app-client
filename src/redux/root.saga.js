import { all, call, spawn } from "redux-saga/effects";
import { userSagas } from "./user/user.sagas";
import { evenementSagas } from "../redux/evenement/evenement.saga";

export default function* rootSaga() {
  const sagas = [userSagas, evenementSagas];

  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.log(e);
          }
        }
      })
    )
  );
}
