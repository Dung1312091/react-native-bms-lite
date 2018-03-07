import { combineReducers } from "redux";
import loginReducers from "../scenes/Login/reducer";
import getDayReducers from "../components/DateRangePicker/reducer";
import getConfigurationOverview from "./configurationOverview";
import changeRouteReducer from "../containers/DropdownTrip/reducer";
import selectTripReducer from "./tripDetail";
import seatOverviewReducers from "../containers/SeatOverview/reducers";
import seatDiagramReducers from "../scenes/SeatDiagram/reducer";
import addTripReducer from "../scenes/FareCreation/reducer";
const allReducers = combineReducers({
  loginReducers,
  getDayReducers,
  getConfigurationOverview,
  changeRouteReducer,
  selectTripReducer,
  seatOverviewReducers,
  seatDiagramReducers,
  addTripReducer
});
export default allReducers;
