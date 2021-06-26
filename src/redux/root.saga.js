import { all, call, spawn } from "redux-saga/effects";
import { watchLoginStarts } from "./user/user.sagas";
import { watchFetchDemandesStart } from "../redux/evenement/evenement.saga";

export default function* rootSaga() {
  const sagas = [watchLoginStarts, watchFetchDemandesStart];

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
