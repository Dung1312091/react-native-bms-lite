import { combineReducers } from "redux";
import loginReducers from "../scenes/Login/reducer";
import getDayReducers from "../components/DateRangePicker/reducer";
import getConfigurationOverview from "./configurationOverview";
import changeRouteReducer from "../containers/DropdownTrip/reducer";
const allReducers = combineReducers({
  loginReducers,
  getDayReducers,
  getConfigurationOverview,
  changeRouteReducer
});
export default allReducers;
