import {
  ADD_TRIP,
  ADD_TRIP_SUCCESS,
  ADD_TRIP_FAIL
} from "../../constants/actionTypes";
const initialState = {};
const addTripReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TRIP: {
      return {
        ...state,
        isLoading: true
      };
    }
    //   case GET_TICKET_INFO_FAIL: {
    //     return {
    //       ...state,
    //       ticketInfo: null
    //     };
    //   }
    case ADD_TRIP_SUCCESS: {
      return {
        ...state,
        isLoading: false
      };
    }
    default:
      return state;
  }
};
export default addTripReducer;
