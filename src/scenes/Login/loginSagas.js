import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAIL,
  AUTHENTICATION
} from "../../constants/actionTypes";
import { Api } from "../../api/login";
// import {AsyncStorage} from 'react-native';
//Saga effects
import { storeToken, getToken } from "../../utils/AsyncStorage";
import { put, takeLatest } from "redux-saga/effects";
const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";
function* LoginSagas(action) {
  var trip = null;
  try {
    const respone = yield Api.Login(action.params);
    // console.log('respone login-->',respone);
    let token = JSON.parse(respone._bodyInit);
    if (token && token.access_token) {
      yield storeToken(ACCESS_TOKEN, token.access_token);
      yield storeToken(REFRESH_TOKEN, token.refresh_token);
      let user = yield Api.CallAPI(
        "https://api-sandbox.vexere.com/v1/",
        "user",
        "GET",
        { access_token: token.access_token }
      );
      if (user.status === 200) {
        let data = JSON.parse(user._bodyInit);
        let params = {
          access_token: token.access_token,
          comp_id: data.data.CompId,
          date: action.params.date,
          fields:
            "Id,Type,Name,RouteInfo,IsPrgStatus,Info,SeatTemplateInfo,FromArea,ToArea"
        };
        trip = yield Api.CallAPI(
          "https://api-sandbox.vexere.com/v1/",
          "trip/get_trips",
          "GET",
          params
        );
        // console.log('trip1',trip);
        if (trip.status === 200) {
          yield put({
            type: LOGIN_SUCCESS,
            data: {
              username: action.params.username,
              trip: trip,
              user: data,
              token: token
            }
          });
        }
      }
    } else {
      yield put({ type: LOGIN_FAIL });
    }
  } catch (error) {
    // console.log('loi');
    yield put({ type: LOGIN_FAIL, error });
  }
}
function* Authentication(action) {
  const token = yield getToken(ACCESS_TOKEN);
  // console.warn('pass qua token');
  if (token) {
    let user = yield Api.CallAPI(
      "https://api-sandbox.vexere.com/v1/",
      "user",
      "GET",
      { access_token: token }
    );
    let data = JSON.parse(user._bodyInit);
    if (user.status === 400) {
      yield put({
        type: AUTHENTICATION_FAIL
      });
    } else if (user.status === 200) {
      let params = {
        access_token: token,
        comp_id: data.data.CompId,
        date: action.date,
        fields:
          "Id,Type,Name,RouteInfo,IsPrgStatus,Info,SeatTemplateInfo,FromArea,ToArea"
      };
      let trip = yield Api.CallAPI(
        "https://api-sandbox.vexere.com/v1/",
        "trip/get_trips",
        "GET",
        params
      );
      if (trip.status === 200) {
        yield put({
          type: AUTHENTICATION_SUCCESS,
          token: token,
          trip: trip,
          user: data
        });
      }
    }
  } else {
    yield put({
      type: AUTHENTICATION_FAIL
    });
  }
}
export function* watchLoginSagas() {
  yield takeLatest(LOGIN, LoginSagas);
  yield takeLatest(AUTHENTICATION, Authentication);
}
