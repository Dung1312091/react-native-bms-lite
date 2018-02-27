import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAIL
} from "../../constants/actionTypes";
const initialState = {
  username: null,
  status: null,
  token: null,
  isAuthentication: false
};
const listFromTo = getTripsByDateResult => {
  let tmpTrips = [];
  console.log("getTripsByDateResult=>", getTripsByDateResult);
  if (getTripsByDateResult.data && getTripsByDateResult.data.length > 0) {
    getTripsByDateResult.data.forEach(trip => {
      let routeInfo;
      let routeInfoSplits;
      let pointInfoSplits;
      let fromPoints = [];
      let toPoints = [];
      let routes = [];
      let currentFromIdx = 0;
      let startId = 0;
      let fromArea;
      let endId = 0;
      let toArea;
      if (+trip[4] !== 3 && +trip[1] === 1) {
        routeInfo = trip[3];
        if (routeInfo.startsWith("1~")) {
          routeInfo = routeInfo.substring(2, routeInfo.length);
        }
        routeInfoSplits = routeInfo.split("~");
        console.log("routeInfoSplits=>", routeInfoSplits);
        routeInfoSplits.forEach((pointInfo, pointIdx) => {
          pointInfoSplits = pointInfo.split("|");
          if (pointIdx === 0) {
            fromPoints.push({
              id: +pointInfoSplits[0],
              name: pointInfoSplits[3] || ""
            });
          } else if (pointIdx === routeInfoSplits.length - 1) {
            toPoints.push({
              id: +pointInfoSplits[0],
              name: pointInfoSplits[3] || ""
            });
          } else {
            fromPoints.push({
              id: +pointInfoSplits[0],
              name: pointInfoSplits[3] || ""
            });
            toPoints.push({
              id: +pointInfoSplits[0],
              name: pointInfoSplits[3] || ""
            });
          }
        });
        fromPoints.forEach(fromPoint => {
          toPoints.forEach((toPoint, toIdx) => {
            if (toIdx >= currentFromIdx) {
              routes.push({
                fromId: fromPoint.id,
                fromName: fromPoint.name,
                toId: toPoint.id,
                toName: toPoint.name,
                stageName: `${fromPoint.name} - ${toPoint.name}`
              });
            }
          });
          currentFromIdx += 1;
        });
        // from area
        if (trip[7].startsWith("1~")) {
          fromArea = trip[7].substring(2, trip[7].length);
        } else {
          fromArea = trip[7];
        }
        // start id
        startId = +fromArea.split("|")[0];
        // to area
        if (trip[8].startsWith("1~")) {
          toArea = trip[8].substring(2, trip[8].length);
        } else {
          toArea = trip[8];
        }
        // end id
        endId = +toArea.split("|")[0];
        tmpTrips.push({
          id: +trip[0],
          type: +trip[1],
          name: trip[2] || "",
          startId: startId,
          endId: endId,
          routeInfo: trip[3] || "",
          status: +trip[4],
          routes: routes,
          fromPoints: fromPoints,
          toPoints: toPoints,
          info: trip[5] || "",
          seatTemplate: trip[6] || "",
          seatTemplateId:
            trip[6] !== "" ? +trip[6].substring(0, trip[6].indexOf("~")) : 0
        });
      }
    });
  }
  return tmpTrips;
};
const loginReducers = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATION_SUCCESS: {
      state.isAuthentication = true;
      state.token = action.token;
      (state.trip = action.trip), (state.user = action.user);
      state.seat_templates = action.seat_templates;
      state.group_seat_templates = action.group_seat_templates;
      state.from_to = listFromTo(JSON.parse(action.trip._bodyInit));
      return {
        ...state
      };
    }
    case AUTHENTICATION_FAIL: {
      state.isAuthentication = false;
      state.token = null;
      return {
        ...state
      };
    }
    case LOGIN_SUCCESS:
      state.username = action.data.username;
      state.isAuthentication = true;
      state.trip = action.data.trip;
      (state.user = action.data.user),
        (state.token = action.data.token.access_token);
      state.seat_templates = action.data.seat_templates;
      state.group_seat_templates = action.data.group_seat_templates;
      state.from_to = listFromTo(JSON.parse(action.data.trip._bodyInit));
      return {
        ...state
      };
    case LOGIN_FAIL:
      return {
        error: action.error,
        ...state
      };
    default:
      return state;
  }
};
export default loginReducers;
