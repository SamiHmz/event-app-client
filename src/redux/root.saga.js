import { all, call, spawn } from "redux-saga/effects";
import { userSagas } from "./user/user.sagas";
import { evenementSagas } from "./evenement/evenement.saga";
import { notificaitonsSagas } from "./notifications/notifications.sagas";
import { intervenantSagas } from "./intervenant/intervenant.sagas";

export default function* rootSaga() {
  const sagas = [
    userSagas,
    evenementSagas,
    notificaitonsSagas,
    intervenantSagas,
  ];

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
