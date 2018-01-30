import {
  GET_TICKET_INFO_SUCCESS,
  GET_TICKET_INFO_FAIL,
  BUILD_DATA_RENDER_SEAT_DIAGRAM
} from "../../constants/actionTypes";
const initialState = {};
const seatOverviewReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_TICKET_INFO_SUCCESS: {
      return {
        ...state,
        ticketInfo: action.ticketInfo
      };
    }
    case GET_TICKET_INFO_FAIL: {
      return {
        ...state,
        ticketInfo: null
      };
    }
    case BUILD_DATA_RENDER_SEAT_DIAGRAM: {
      console.log("action", action);
      return {
        ...state,
        data: action.data
      };
    }
    default:
      return state;
  }
};
export default seatOverviewReducers;
