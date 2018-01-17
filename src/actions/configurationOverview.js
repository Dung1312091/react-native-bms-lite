import {
  GET_CONFIGURATION_OVWERVIEW,
  GET_CONFIGURATION_OVWERVIEW_SUCCESS,
  GET_CONFIGURATION_OVWERVIEW_FAIL
} from "../constants/actionTypes";
export const getConfigurationOverview = params => {
  return {
    type: GET_CONFIGURATION_OVWERVIEW,
    params
  };
};
//Action sent by Redux-saga
export const getConfigurationOverviewSuccess = result => {
  return {
    type: GET_CONFIGURATION_OVWERVIEW_SUCCESS,
    result
  };
};

export const getConfigurationOverviewFail = error => {
  return {
    type: GET_CONFIGURATION_OVWERVIEW_FAIL,
    error
  };
};
