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
  apiChangeSeatOnline
};
