import { GET_DAY, SELECT_DAY } from "../../constants/actionTypes";
export const getToday = () => {
  return {
    type: GET_DAY
  };
};
export const selectDay = date => {
  return {
    type: SELECT_DAY,
    date
  };
};
