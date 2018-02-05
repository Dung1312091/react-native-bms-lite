import {
  CHANGE_SEAT_ONLINE,
  CHANGE_SEAT_ONLINE_SUCCESS,
  CHANGE_SEAT_ONLINE_FAIL
} from "../../constants/actionTypes";

export const changeSeatOnline = data => {
  return {
    type: CHANGE_SEAT_ONLINE,
    data
  };
};
//Action sent by Redux-saga
export const changeSeatOnlineSuccess = result => {
  return {
    type: CHANGE_SEAT_ONLINE_SUCCESS,
    result
  };
};

export const changeSeatOnlineFail = error => {
  return {
    type: CHANGE_SEAT_ONLINE_FAIL,
    error
  };
};
