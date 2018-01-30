import { combineReducers } from "redux";
import loginReducers from "../scenes/Login/reducer";
import getDayReducers from "../components/DateRangePicker/reducer";
import getConfigurationOverview from "./configurationOverview";
import changeRouteReducer from "../containers/DropdownTrip/reducer";
import selectTripReducer from "./tripDetail";
import seatOverviewReducers from "../containers/SeatOverview/reducers";
const allReducers = combineReducers({
  loginReducers,
  getDayReducers,
  getConfigurationOverview,
  changeRouteReducer,
  selectTripReducer,
  seatOverviewReducers
});
export default allReducers;
