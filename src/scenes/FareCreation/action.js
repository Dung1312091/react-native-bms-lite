import {
  ADD_TRIP,
  ADD_TRIP_SUCCESS,
  ADD_TRIP_FAIL
} from "../../constants/actionTypes";

export const addTrip = (config, other_config, fare_configs) => {
  return {
    type: ADD_TRIP,
    config,
    other_config,
    fare_configs
  };
};
//Action sent by Redux-saga
export const addTripSuccess = result => {
  return {
    type: ADD_TRIP_SUCCESS,
    result
  };
};

export const addTripFail = error => {
  return {
    type: ADD_TRIP_FAIL,
    error
  };
};
