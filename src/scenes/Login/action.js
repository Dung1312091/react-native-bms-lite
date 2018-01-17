import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTHENTICATION
} from "../../constants/actionTypes";

export const LoginAction = params => {
  return {
    type: LOGIN,
    params
  };
};
//Action sent by Redux-saga
export const LoginSuccess = result => {
  return {
    type: LOGIN_SUCCESS,
    result
  };
};

export const LoginFail = error => {
  return {
    type: LOGIN_FAIL,
    error
  };
};
export const Authentication = date => {
  return {
    type: AUTHENTICATION,
    date
  };
};
