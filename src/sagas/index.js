import { fork } from "redux-saga/effects";
import { watchLoginSagas } from "../scenes/Login/loginSagas";
import { watchGetConfigurationOverviewSagas } from "./configurationOverviewSagas";
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield [fork(watchLoginSagas), fork(watchGetConfigurationOverviewSagas)];
}
