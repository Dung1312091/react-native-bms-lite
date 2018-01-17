import { GET_DAY, SELECT_DAY } from "../../constants/actionTypes";
import moment from "moment";
var day = moment();
var date = moment(day).format("DD-MM-YYYY");
const initialState = date;

const getDayReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_DAY:
      return (state.day = moment(day).format("DD-MM-YYYY"));
    case SELECT_DAY: {
      // console.log('nhin gi ma nhin');
      return (state.day = moment(action.date).format("DD-MM-YYYY"));
    }
    default:
      return state;
  }
};
export default getDayReducers;
