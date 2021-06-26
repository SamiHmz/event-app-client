import { all, call, spawn } from "redux-saga/effects";
import { watchLoginStarts } from "./user/user.sagas";

export default function* rootSaga() {
  const sagas = [watchLoginStarts];

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
