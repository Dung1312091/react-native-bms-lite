import React, { Component } from "react";
import PropTypes from "prop-types";
import { Content, Text, Grid, Col } from "native-base";
import { TouchableOpacity, View, Alert } from "react-native";
import ActionSheet from "react-native-actionsheet";
import { connect } from "react-redux";
import moment from "moment";
import { getConfigurationOverview } from "../../actions/configurationOverview";
import { selectTrip } from "../../actions/tripDetail";
import Loading from "../../components/Loading";
import { getTicketInfo, buildDataRenderSeatDiagram } from "./action";
const options = [
  "Bỏ qua",
  "Xuất bến",
  "Hủy chuyến",
  "Nhập chuyến",
  "Thay đổi giờ",
  "Thay đổi giá",
  "Thay đổi chỗ bán",
  "Thay đổi lịch bán"
];
const optionsAddTrip = ["Bỏ qua", "Thêm chuyến"];
const CANCEL_INDEX = 0;
class SeatOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
      fromAreaId: "",
      toAreaId: "",
      tempData: {},
      isTrip: false
    };
  }
  static calculateSeatStyle(bookedQty, totalQty, type) {
    const style = {
      backgroundColor: "red",
      width: "50%"
    };
    const w = totalQty > 0 ? Math.round(bookedQty / totalQty * 100) : 0;

    if (type === 2) {
      style.backgroundColor = "#b6ffea"; // xanh + thanh toán
    } else if (type === 3) {
      style.backgroundColor = "#ffeb96"; // vàng + đặt chỗ và thanh toán
    } else if (type === 1) {
      style.backgroundColor = "#ffc2c2"; // đỏ + đặt chỗ
    }

    style.width = `${w.toString()}%`;

    // console.log(style);
    return style;
  }
  componentWillMount() {
    let fromDate = moment(this.props.dayReducers, "DD-MM-YYYY").format(
      "YYYY-MM-DD"
    );
    let toDate = this.converDate(fromDate, 3);
    let get_trip = this.props.loginReducers.trip._bodyInit;
    let user = this.props.loginReducers.user;
    let token = this.props.loginReducers.token;
    let trip = JSON.parse(get_trip);
    let params = {
      access_token: token,
      company_id: user.data.CompId,
      route_id: trip.data[0][0],
      from_date: fromDate,
      to_date: toDate,
      groups: "selling_configs,fare_configs,statistic",
      start: true
    };
    this.props.getConfigurationOverview(params);
    this.setState({
      fromAreaId: trip.data[0][7].split("|")[0],
      toAreaId: trip.data[0][8].split("|")[0],
      tempData: params
    });
    // try {
    //   AsyncStorage.getItem(ROUTE).then(value => {
    //     if (value) {
    //       let route = JSON.parse(value);
    //       params.route_id = route[0];
    //       AsyncStorage.getItem(DATE).then(value => {
    //         if (value) {
    //           (params.fromDate = value),
    //             (params.to_date = this.converDate(value, 3));
    //           this.props.getConfigurationOverview(params);
    //         }
    //       });
    //     } else {
    //       this.props.getConfigurationOverview(params);
    //     }
    //   });
    // } catch (error) {
    //   // Error saving data
    // }
  }
  onPress = () => {
    this.setState(previousState => {
      return {
        checked: !previousState.checked
      };
    });
  };
  converDate = (date, day) => {
    let Date = moment(date).utc();
    let tomorrow = Date.add(day, "days");
    let tomorrowDate = moment(tomorrow).format("YYYY-MM-DD");
    return tomorrowDate;
  };
  dayOfWeek = date => {
    const dates = moment(date);
    const dow = dates.day();
    switch (dow) {
      case 0:
        return "Chủ nhật";
      case 1:
        return "Thứ 2";
      case 2:
        return "Thứ 3";
      case 3:
        return "Thứ 4";
      case 4:
        return "Thứ 5";
      case 5:
        return "Thứ 6";
      case 6:
        return "Thứ 7";
      default:
        break;
    }
  };
  renderHeadTable = dates => {
    const { columnHeader, headerTextStyle } = styles;
    let result = null;
    if (dates) {
      result = dates.map((item, index) => {
        let date = moment(item, "YYYY-MM-DD").format("DD/MM");
        return (
          <Col style={columnHeader} key={index}>
            <Text style={headerTextStyle}>{this.dayOfWeek(item)}</Text>
            <Text style={headerTextStyle}>{date}</Text>
          </Col>
        );
      });
    }
    return result;
  };
  findConfigsFare = (arr, str) => {
    let result = null;
    arr.findIndex(function(x) {
      if (!x.indexOf(str)) {
        result = x;
        return result;
      }
    });
    return result;
  };
  splitStr = str => {
    if (str.length > 1) return str.slice(0, 3);
    return str;
  };
  caculatePrice = (price, discount) => {
    return +price - +price * discount / 100;
  };
  formatPriceAndPromotion = fare_configs => {
    let configs = {};
    if (fare_configs.fare_info) {
      let fare_info = fare_configs.fare_info.split("~");
      let str = `${this.state.fromAreaId}|${this.state.toAreaId}`;
      let fareArr = this.findConfigsFare(fare_info, str);
      if (fareArr) {
        let item = fareArr.split("||");
        let res1 = null;
        let res2 = null;
        if (item.length > 1 && item[1] !== "") {
          res1 = item[1].split("|");
        } else {
          res2 = item[0].split("|");
        }
        let kq1 = [];
        let kq2 = null;
        if (res1) {
          res1.forEach(item => {
            let temp = item.split(":");
            kq1.push(temp[1]);
          });
          kq1.sort();
        } else {
          kq2 = res2[2];
        }
        configs.price = kq1[0] ? kq1[0] : kq2 ? kq2 : "0";
      }
    }
    if (fare_configs.promotion_fare_price) {
      configs.promotion_fare_price = fare_configs.promotion_fare_price;
    }
    if (fare_configs.promotion_type && +fare_configs.promotion_type === 3) {
      configs.promotion_type = "%";
    }
    return configs;
  };
  renderSeat(data) {
    const { columnStyle, columnTextStyle, seatOccupancyStyle } = styles;
    let total = 0;
    let totalBooking = 0;
    let price = 0;
    let promotion_fare_price = null;
    let promotion_type = "";
    let type = 0;
    return data.map((trip, i) => {
      if (trip && trip.configCustom) {
        console.log("trip.configCustom=>", trip.configCustom);
        if (
          trip.configCustom.selling_configs &&
          trip.configCustom.selling_configs.selling_configs[2]
        ) {
          total = trip.configCustom.selling_configs.selling_configs[2].total;
        }
        if (trip.configCustom.statistic) {
          if (trip.configCustom.statistic.booked) {
            totalBooking = +trip.configCustom.statistic.booked;
            type = 1;
          }
          if (trip.configCustom.statistic.paid) {
            totalBooking = +totalBooking + +trip.configCustom.statistic.paid;
            type = 2;
          }
          if (
            trip.configCustom.statistic.booked &&
            trip.configCustom.statistic.paid
          )
            type = 3;
        }
        let fare_configs = trip.configCustom.fare_configs;
        if (fare_configs) {
          let configs = this.formatPriceAndPromotion(fare_configs);
          price = configs.price ? configs.price : price;
          promotion_fare_price = configs.promotion_fare_price
            ? configs.promotion_fare_price
            : promotion_fare_price;
          promotion_type = configs.promotion_type
            ? configs.promotion_type
            : promotion_type;
        }
      }
      let id = i + Math.random(); // trip.id
      if (trip.isShow) {
        return (
          <Col key={id} style={columnStyle}>
            <TouchableOpacity
              style={{
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                borderColor: "#d9d8dc"
              }}
              onPress={() => this.showActionSheet(trip, true)}
            >
              <View
                style={[
                  seatOccupancyStyle,
                  SeatOverview.calculateSeatStyle(totalBooking, total, type)
                ]}
              />
              <Text style={{ fontSize: 12 }}>
                {totalBooking}/{total} chỗ
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 11 }}>
                  Từ{" "}
                  {price !== "0"
                    ? this.caculatePrice(
                        this.splitStr(price),
                        +promotion_fare_price
                      )
                    : this.splitStr(price)}k
                </Text>
                <Text style={{ color: "red", fontSize: 11 }}>
                  {promotion_fare_price
                    ? ` -${promotion_fare_price}${promotion_type}`
                    : ""}
                </Text>
              </View>
            </TouchableOpacity>
          </Col>
        );
      } else {
        return (
          <Col style={columnStyle} key={id}>
            <TouchableOpacity
              style={{
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                borderColor: "#d9d8dc"
              }}
              onPress={() => this.showActionSheet(trip, false)}
            />
          </Col>
        );
      }
    });
  }
  renderDataGrid(data) {
    const { columnStyle, columnTextStyle, tableStyle } = styles;
    return data.map((item, index) => {
      return (
        <Grid key={index} style={tableStyle}>
          <Col style={columnStyle}>
            <Text style={columnTextStyle}>{item.time}</Text>
          </Col>
          {this.renderSeat(item.data)}
        </Grid>
      );
    });
  }
  setUpTime = data => {
    let arr = [];
    let result = [];
    data.forEach(date => {
      date.times.forEach(time => {
        arr.push(time.time);
      });
    });
    result = arr.filter(function(item, pos) {
      return arr.indexOf(item) == pos;
    });
    return result.sort();
  };
  setUpAllDataToRender = (times, dates) => {
    let result = [];
    times.forEach(time => {
      let data = [];
      dates.forEach(date => {
        let type = {};
        date.times.forEach(item => {
          if (
            item.time === time &&
            item.configs.selling_configs &&
            item.configs.selling_configs.selling_configs[2] !== undefined
          ) {
            type.isShow = true;
            type.configCustom = item.configs;
            (type.time = item.time), (type.date = date.date);
          } else {
            (type.time = time), (type.date = date.date);
          }
        });
        data.push(type);
      });
      result.push({
        time: time,
        data: data
      });
    });
    return result;
  };
  showActionSheet = (trip, isTrip) => {
    let route = this.props.changeRouteReducers;
    let dateParam = moment(trip.date, "YYYY-MM-DD").format("DD-MM-YYYY");
    let params = {
      trip: route.route_id,
      date: `${trip.time} ${dateParam}`,
      fields: "SeatCode,Status,PaymentInfo"
    };
    // console.log("==>", params);
    this.props.getTicketInfo(params);
    this.props.openModel(trip, isTrip);
    this.props.selectTrip(trip);
  };
  buildTitleActionSheet = (time, date, route) => {
    return (
      <View>
        <Text>Tác vụ</Text>
        <Text>
          Chuyến {time} {date}
        </Text>
        <Text>Sài Gòn - Nha trang</Text>
      </View>
    );
  };
  // getActionSheetRef = (ref) => {
  //   this.actionSheet = ref;
  //   console.warn('ref==>',ref);
  // }
  render() {
    let data = [];
    let response = this.props.configurationOverviewReducers;
    // console.log("getConfigurationOverview=>", getConfigurationOverview);
    let ActionSheetDate = this.props.dayReducers;
    let ActionSheetRoute = this.changeRouteReducers;
    let ActionSheetTitle = this.buildTitleActionSheet(
      "11:20",
      ActionSheetDate,
      ActionSheetRoute
    );
    var dates = moment(this.props.dayReducers, "DD-MM-YYYY").format(
      "YYYY-MM-DD"
    );
    let tomorrowDate = this.converDate(dates, 2);
    let nextTomorrowDate = this.converDate(dates, 3);
    let ListDates = [dates, tomorrowDate, nextTomorrowDate];
    if (Object.keys(response).length > 0 && response.data) {
      let trip_overview = response.data.data.trip_overview.dates;
      if (trip_overview.length < 3 && trip_overview.length > 0) {
        for (let i = 0; i < ListDates.length; i++) {
          let count = 0;
          for (let j = 0; j < trip_overview.length; j++) {
            if (trip_overview[j].date !== ListDates[i]) {
              count++;
            }
          }
          if (count === trip_overview.length) {
            trip_overview.push({
              date: ListDates[i],
              times: []
            });
          }
        }
      }
      trip_overview.sort(function(a, b) {
        return a.date > b.date ? 1 : b.date > a.date ? -1 : 0;
      });
      let listTripTime = this.setUpTime(trip_overview);
      data = this.setUpAllDataToRender(listTripTime, trip_overview);
    }
    // const options = [ 'Cancel', 'Apple', 'Banana', 'Watermelon', 'Durian' ];
    const {
      containerStyle,
      tableStyle,
      columnHeader,
      headerTextStyle
    } = styles;
    return (
      <View style={containerStyle}>
        {this.props.configurationOverviewReducers.isLoading ? (
          <Loading color="#ffffff" />
        ) : null}
        <Grid style={[tableStyle, { backgroundColor: "#ECECEC" }]}>
          {dates ? (
            <Col style={columnHeader}>
              <Text style={headerTextStyle}>CHUYẾN</Text>
            </Col>
          ) : null}
          {ListDates ? this.renderHeadTable(ListDates) : null}
        </Grid>
        <Content style={{ flex: 1 }}>
          {data.length > 0 ? (
            this.renderDataGrid(data)
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1
              }}
            >
              <Text>Nhà xe chưa mở bán</Text>
            </View>
          )}
          <ActionSheet
            ref={o => (this.ActionSheet = o)}
            title={ActionSheetTitle}
            options={options}
            cancelButtonIndex={CANCEL_INDEX}
            onPress={this.handlePress}
            isTrip={this.state.isTrip}
          />
        </Content>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: "#fff"
  },
  tableStyle: {
    flex: 0
  },
  columnHeader: {
    height: 50,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#d9d8dc",
    justifyContent: "center",
    alignItems: "center"
  },
  headerTextStyle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#7E7E7E"
  },
  columnStyle: {
    height: 50,
    // padding: 10,
    borderBottomWidth: 1,
    borderColor: "#d9d8dc",
    justifyContent: "center",
    alignItems: "center"
  },
  columnTextStyle: {
    fontSize: 12,
    fontWeight: "400"
  },
  seatOccupancyStyle: {
    position: "absolute",
    alignSelf: "stretch",
    top: 0,
    left: 0,
    bottom: 0
  },
  rowButtonStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonStyle: {
    marginRight: 20
  },
  wrapper: {
    paddingTop: 50,
    flex: 1
  },

  modal: {
    justifyContent: "center",
    alignItems: "center"
  },

  modal2: {
    height: 230,
    backgroundColor: "#3B5998"
  },

  modal3: {
    height: 300,
    width: 300
  },

  modal4: {
    height: 300
  },

  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "white",
    padding: 10
  },

  btnModal: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: "transparent"
  },

  text: {
    color: "black",
    fontSize: 22
  },
  overlay: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%"
  }
};
SeatOverview.propTypes = {
  dayReducers: PropTypes.any,
  configurationOverviewReducers: PropTypes.any,
  selectDay: PropTypes.any,
  loginReducers: PropTypes.any,
  getConfigurationOverview: PropTypes.any,
  changeRouteReducers: PropTypes.any,
  seatDiagramReducers: PropTypes.any
};
const mapStateToProps = state => {
  return {
    loginReducers: state.loginReducers,
    dayReducers: state.getDayReducers,
    configurationOverviewReducers: state.getConfigurationOverview,
    changeRouteReducers: state.changeRouteReducer,
    seatDiagramReducers: state.seatDiagramReducers
    // seatOverviewReducers: state.seatOverviewReducers
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getConfigurationOverview: params => {
      dispatch(getConfigurationOverview(params));
    },
    selectTrip: trip => {
      dispatch(selectTrip(trip));
    },
    getTicketInfo: params => {
      dispatch(getTicketInfo(params));
    },
    buildDataRenderSeatDiagram: (route, tripDetail, ticketInfo) => {
      dispatch(buildDataRenderSeatDiagram(route, tripDetail, ticketInfo));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SeatOverview);
