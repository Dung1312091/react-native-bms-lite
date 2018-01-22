import { CHANGE_ROUTE_ID } from "../../constants/actionTypes";
export const changeRouteId = (route_id, value) => {
  return {
    type: CHANGE_ROUTE_ID,
    route_id: route_id,
    value: value
  };
};
