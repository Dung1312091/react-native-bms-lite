import {
  CHANGE_SEAT_ONLINE,
  CHANGE_SEAT_ONLINE_SUCCESS,
  CHANGE_SEAT_ONLINE_FAIL,
  GET_CONFIGURATION_OVWERVIEW_SUCCESS
} from "../../constants/actionTypes";
const initialState = {};
const seatDiagramReducers = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SEAT_ONLINE_SUCCESS: {
      console.warn("action====>", action);
      return {
        ...state,
        updateSeatSuccess: action.updateSeatSuccess
      };
    }
    case GET_CONFIGURATION_OVWERVIEW_SUCCESS: {
      console.warn("GET_CONFIGURATION_OVWERVIEW_SUCCESS====>", action);
      return {
        ...state,
        updateSeatSuccess: false
      };
    }
    default:
      return state;
  }
};
export default seatDiagramReducers;