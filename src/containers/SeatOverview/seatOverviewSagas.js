import {
  GET_TICKET_INFO,
  GET_TICKET_INFO_SUCCESS,
  GET_TICKET_INFO_FAIL
} from "../../constants/actionTypes";
import { Api } from "../../api/login";
//Saga effects
import { getToken } from "../../utils/AsyncStorage";
import { put, takeLatest } from "redux-saga/effects";
const ACCESS_TOKEN = "access_token";
function* getTicketInfoBySagas(action) {
  try {
    const token = yield getToken(ACCESS_TOKEN);
    if (token) {
      let params = action.params;
      params.access_token = token;
      let ticket = yield Api.CallAPI(
        "https://api-sandbox.vexere.com/v1/",
        "booking/tickets",
        "GET",
        params
      );
      console.log("ticket==>", ticket);
      if (ticket.status === 200) {
        yield put({
          type: GET_TICKET_INFO_SUCCESS,
          ticketInfo: JSON.parse(ticket._bodyInit)
        });
      }
    }
  } catch (error) {
    throw error;
  }
}
export function* watchGetTicketSagas() {
  yield takeLatest(GET_TICKET_INFO, getTicketInfoBySagas);
}
