import {
  GET_CONFIGURATION_OVWERVIEW_SUCCESS,
  GET_CONFIGURATION_OVWERVIEW
} from "../constants/actionTypes";
const initialState = {};
const getConfigurationOverview = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONFIGURATION_OVWERVIEW_SUCCESS:
      // console.log("action==>", action);
      return {
        ...state,
        data: action.data,
        isLoading: false
      };
    case GET_CONFIGURATION_OVWERVIEW:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
};
export default getConfigurationOverview;
