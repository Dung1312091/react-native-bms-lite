import {
  CHANGE_SEAT_ONLINE,
  CHANGE_SEAT_ONLINE_SUCCESS,
  CHANGE_SEAT_ONLINE_FAIL,
  GET_CONFIGURATION_OVWERVIEW
} from "../../constants/actionTypes";
import { Api } from "../../api/login";
//Saga effects
import { getToken } from "../../utils/AsyncStorage";
import { put, takeLatest } from "redux-saga/effects";
const ACCESS_TOKEN = "access_token";
const PARAM = "param";
function* changeSeatDiagramSagas(action) {
  try {
    const token = yield getToken(ACCESS_TOKEN);
    if (token) {
      let response = yield Api.apiChangeSeatOnline(action.data, token);
      if (response.status === 200) {
        yield put({
          type: CHANGE_SEAT_ONLINE_SUCCESS,
          updateSeatSuccess: true
        });
        let params = yield getToken(PARAM);
        yield put({
          type: GET_CONFIGURATION_OVWERVIEW,
          params: JSON.parse(params)
        });
      }
    }
  } catch (error) {
    //console.warn(error);
  }
}

export function* watchSeatDiagramSagas() {
  yield takeLatest(CHANGE_SEAT_ONLINE, changeSeatDiagramSagas);
}
