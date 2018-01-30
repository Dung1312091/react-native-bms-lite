import {
  GET_TICKET_INFO,
  BUILD_DATA_RENDER_SEAT_DIAGRAM
} from "../../constants/actionTypes";
let buildString = (lable, coach, row, col, id) => {
  if (id) {
    return `${lable}|${coach}|${row}|${col}|${id}`;
  } else {
    return `${lable}|${coach}|${row}|${col}`;
  }
};
let setUpAllDataToRender = (routeData, tripDetail, ticketInfo) => {
  let result = [];
  let floor_1 = [];
  let floor_2 = [];
  let rowFloor_1 = 0;
  let rowFloor_2 = 0;
  let colFloor_1 = 0;
  let colFloor_2 = 0;
  let listRoute = routeData;
  let seatDiagram = listRoute[6].split("~");
  let seatDiagramId = seatDiagram[0];
  let infor = seatDiagram[1].split("|");
  let coach = infor[1]; //so tang
  let startIndex = 6;
  // let tripDetail = this.props.selectTripReducer.trip.configCustom.selling_configs.selling_configs[2].seats.split(
  //   "~"
  // );
  // console.log("tripDetail==>", tripDetail);
  // let ticketInfo = this.props.seatOverviewReducers.ticketInfo.data.tickets;

  // console.log("seatOverviewReducers==>", ticketInfo);
  // console.log("ticketInfo==>", ticketInfo);
  if (+coach === 1) {
    startIndex = 5;
    floor_1 = seatDiagram[2].split("|");
    rowFloor_1 = floor_1[1];
    colFloor_1 = floor_1[2];
  } else if (+coach === 2) {
    floor_1 = seatDiagram[2].split("|");
    floor_2 = seatDiagram[3].split("|");
    rowFloor_1 = floor_1[1];
    colFloor_1 = floor_1[2];
    rowFloor_2 = floor_2[1];
    colFloor_2 = floor_2[2];
  }
  let tmpSeats = [];
  for (let i = startIndex; i < seatDiagram.length; i++) {
    let item = seatDiagram[i].split("|");
    let isOnline = false;
    let paymentStatus = null;
    const itemCoach = +item[5];
    const itemRow = +item[6];
    const itemCol = +item[7];
    // console.log("tripDetail==>", tripDetail);
    let strFindSeatOnline = buildString(
      item[4],
      itemCoach,
      itemRow,
      itemCol,
      seatDiagramId
    );
    let strPaymentMethodSeat = buildString(
      item[4],
      itemCoach,
      itemRow,
      itemCol
    );
    // var strFind = `${item[4]}|${itemCoach}|${itemRow}|${itemCol}|${seatDiagramId}`;
    if (tripDetail.indexOf(strFindSeatOnline) !== -1) {
      isOnline = true;
    }
    let index = ticketInfo.findIndex(x => x[0] == strPaymentMethodSeat);
    if (index !== -1) {
      paymentStatus = +ticketInfo[index][1];
    }
    tmpSeats.push({
      _label: item[4] || "",
      _coach: itemCoach,
      _row: itemRow,
      _col: itemCol,
      _isOnline: isOnline,
      _isPaymentStatus: paymentStatus
    });
  }
  // console.log("tmpSeats=>", tmpSeats);
  for (let c = 1; c <= coach; c++) {
    let currentRows = rowFloor_1;
    let currentCols = colFloor_1;
    if (c === 2) currentRows = rowFloor_2;
    if (c === 2) currentCols = colFloor_2;
    for (let a = 1; a <= currentRows; a++) {
      for (let b = 1; b <= currentCols; b++) {
        if (result[c - 1] === undefined) {
          result[c - 1] = [];
        }
        if (result[c - 1][a - 1] === undefined) {
          result[c - 1][a - 1] = [];
        }
        const items = tmpSeats.filter(
          item => item._coach === c && item._row === a && item._col === b
        );
        // console.log("items=>", items);
        if (items.length > 0) {
          result[c - 1][a - 1][b - 1] = {
            _label: items[0]._label,
            _coach: c,
            _row: a,
            _col: b,
            _isOnline: items[0]._isOnline,
            _isPaymentStatus: items[0]._isPaymentStatus
          };
        } else {
          result[c - 1][a - 1][b - 1] = {};
        }
      }
    }
  }
  console.log("result=>", result);
  return result;
};
export const getTicketInfo = params => {
  return {
    type: GET_TICKET_INFO,
    params
  };
};
export const buildDataRenderSeatDiagram = (route, tripDetail, ticketInfo) => {
  let data = setUpAllDataToRender(route, tripDetail, ticketInfo);
  return {
    type: BUILD_DATA_RENDER_SEAT_DIAGRAM,
    data: data
  };
};
