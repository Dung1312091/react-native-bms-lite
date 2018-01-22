// import {
//   GET_DAY,
//   GET_DAY_SUCCESS,
//   GET_DAY_FAIL
// } from "../../constants/actionTypes";
// import { getToken } from "../utils//AsyncStorage";
// //Saga effects
// import { put, takeLatest } from "redux-saga/effects";
// const FROM_DATE = 'from_date';
// function* getDay() {
//     try {
//         const date = yield getToken(FROM_DATE);
//         if (date) {
//              yield put({ type: GET_DAY_SUCCESS, date: date });
//         }
//     } catch (error) {
//          yield put({ type: GET_DAY_FAIL});
//     }    
// }
// export function* watchGetDaySagas() {
//   yield takeLatest(GET_DAY, getDay);
// }
