import {
  ADD_TRIP,
  ADD_TRIP_SUCCESS,
  ADD_TRIP_FAIL,
  GET_CONFIGURATION_OVWERVIEW
} from "../../constants/actionTypes";
import { Api } from "../../api/login";
//Saga effects
import { getToken } from "../../utils/AsyncStorage";
import { put, takeLatest } from "redux-saga/effects";
import { Actions } from "react-native-router-flux";
const ACCESS_TOKEN = "access_token";
const PARAM = "param";
function* addTrip(action) {
  try {
    const token = yield getToken(ACCESS_TOKEN);
    if (token) {
      let responseConfig = yield Api.apiConfig(
        "https://api-sandbox.vexere.com/v1/route/config",
        action.config,
        token
      );
      if (responseConfig.status === 200) {
        let responseOtherConfig = yield Api.apiOtherConfig(
          "https://api-sandbox.vexere.com/v1/other_config",
          action.other_config,
          token
        );
        if (responseOtherConfig.status === 200) {
          let responseFareConfig = yield Api.apiFareConfig(
            "https://api-sandbox.vexere.com/v1/fare_configs",
            action.fare_configs,
            token
          );
          if (responseFareConfig.status === 200) {
            yield put({
              type: ADD_TRIP_SUCCESS,
              isLoading: false
            });
            let params = yield getToken(PARAM);
            yield put({
              type: GET_CONFIGURATION_OVWERVIEW,
              params: JSON.parse(params)
            });
            // Actions.main();
          }
        }
      }

      // console.warn("--->", responseConfig);
      // console.warn("--->", responseOtherConfig);
      // console.warn("--->", responseFareConfig);
      // if (response.status === 200) {
      //   yield put({
      //     type: CHANGE_SEAT_ONLINE_SUCCESS,
      //     updateSeatSuccess: true
      //   });
      //   let params = yield getToken(PARAM);
      //   yield put({
      //     type: GET_CONFIGURATION_OVWERVIEW,
      //     params: JSON.parse(params)
      //   });
      // }
      console.log("action-==>", action);
    }
  } catch (error) {
    //console.warn(error);
  }
}

export function* watchAddTrip() {
  yield takeLatest(ADD_TRIP, addTrip);
}
