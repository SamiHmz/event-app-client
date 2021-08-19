import { all, call, spawn } from "redux-saga/effects";
import { userSagas } from "./user/user.sagas";
import { evenementSagas } from "./evenement/evenement.saga";
import { notificaitonsSagas } from "./notifications/notifications.sagas";
import { intervenantSagas } from "./intervenant/intervenant.sagas";
import { sponsoringSagas } from "./sponsoring/sponsoring.sagas";
import { bilanSagas } from "./bilan/bilan.sagas";
import { utilisateurSagas } from "./utilisateur/utilisateur.sagas";
import { dashboardSagas } from "./dashboard/dashboard.sagas";
export default function* rootSaga() {
  const sagas = [
    userSagas,
    evenementSagas,
    notificaitonsSagas,
    intervenantSagas,
    sponsoringSagas,
    bilanSagas,
    utilisateurSagas,
    dashboardSagas,
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
