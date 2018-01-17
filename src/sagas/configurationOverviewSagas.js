import {
  GET_CONFIGURATION_OVWERVIEW,
  GET_CONFIGURATION_OVWERVIEW_SUCCESS,
  GET_CONFIGURATION_OVWERVIEW_FAIL
} from "../constants/actionTypes";
import { Api } from "../api/login";
//Saga effects
import { put, takeLatest } from "redux-saga/effects";
function* getConfigurationOverviewSagas(action) {
  try {
    // console.log('action.params==>',action.params);
    const response = yield Api.CallAPI(
      "https://api-sandbox.vexere.com/v1/",
      "configuration_overview",
      "GET",
      action.params
    );
    if (response.status === 200) {
      let data = JSON.parse(response._bodyInit);
      yield put({ type: GET_CONFIGURATION_OVWERVIEW_SUCCESS, data: data });
    }
  } catch (error) {
    yield put({ type: GET_CONFIGURATION_OVWERVIEW_FAIL, data: error });
  }
}
export function* watchGetConfigurationOverviewSagas() {
  yield takeLatest(GET_CONFIGURATION_OVWERVIEW, getConfigurationOverviewSagas);
}
