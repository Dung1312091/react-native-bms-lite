import { SELECTED_TRIP } from "../constants/actionTypes";
const initialState = {};
const selectTripReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_TRIP:
      return {
        ...state,
        trip: action.trip
      };
    default:
      return state;
  }
};
export default selectTripReducer;
