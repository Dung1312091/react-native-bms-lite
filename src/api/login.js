import { onlineSeatUrl, urlLogin } from "../constants/urlApi";

function* Login(account) {
  const response = yield fetch(urlLogin, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: account.username,
      password: account.password,
      grant_type: "password"
    })
  });
  return response;
}
function* apiChangeSeatOnline(data, token) {
  const response = yield fetch(onlineSeatUrl, {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from_date: data.from_date,
      info: data.info,
      is_priority: data.is_priority,
      status: data.status,
      stop_points: data.stop_points,
      time_limit: data.time_limit,
      times: data.times,
      to_date: data.to_date,
      trip_id: data.trip_id,
      type: data.type
    })
  });
  return response;
}
function* apiConfig(url, data, token) {
  console.log("data", data);
  const response = yield fetch(url, {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      compId: data.compId,
      date_of_week: data.date_of_week,
      date_of_week_value: data.date_of_week_value,
      from_date: data.from_date,
      info: data.info,
      is_priority: data.is_priority,
      is_renew: data.is_renew,
      name: data.name,
      renew_value: data.renew_value,
      note: data.note,
      status: 1,
      stop_points: data.stop_points,
      time_limit: data.time_limit,
      times: data.times,
      to_date: data.to_date,
      trip_id: data.trip_id,
      type: 2
    })
  });
  return response;
}
function* apiOtherConfig(url, data, token) {
  console.log("data", data);
  const response = yield fetch(url, {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      company_id: data.company_id,
      config_type: 2,
      detail: data.detail,
      from_date: data.from_date,
      is_renew: data.renew,
      name: data.name,
      note: data.note,
      payment_method: data.payment_method,
      renew_value: data.renew_value,
      to_date: data.to_date,
      status: data.status,
      trip_id: data.trip_id
    })
  });
  return response;
}
function* apiFareConfig(url, data, token) {
  console.log("data", data);
  const response = yield fetch(url, {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      apply_for: data.apply_for,
      date_of_week: data.date_of_week,
      date_of_week_value: data.date_of_week_value,
      end_date: data.end_date,
      fare_info: data.fare_info,
      is_priority: data.is_priority,
      is_renew: data.is_renew,
      meal_info: data.meal_info,
      name: data.name,
      renew_value: data.renew_value,
      start_date: data.start_date,
      status: data.status,
      times: data.times,
      trip_id: data.trip_id
    })
  });
  return response;
}
const buidQueryString = (url, method, params) => {
  let route = url;
  if (method == "GET" && params) {
    const query = Object.keys(params)
      .map(k => {
        if (Array.isArray(params[k])) {
          return params[k]
            .map(val => `${encodeURIComponent(k)}[]=${encodeURIComponent(val)}`)
            .join("&");
        }

        return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`;
      })
      .join("&");
    route += `?${query}`;
    return route;
  }
};
function* CallAPI(BASE_URL, path, method, params) {
  let pat = BASE_URL + path;
  let url = buidQueryString(pat, method, params);
  const response = yield fetch(url, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  return response;
}

export const Api = {
  Login,
  CallAPI,
  apiChangeSeatOnline,
  apiConfig,
  apiFareConfig,
  apiOtherConfig
};
