import { SELECTED_TRIP } from "../constants/actionTypes";
export const selectTrip = trip => {
  return {
    type: SELECTED_TRIP,
    trip
  };
};
