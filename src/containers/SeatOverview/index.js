import React, { Component } from "react";
import PropTypes from "prop-types";
import { Content, Text, Grid, Col } from "native-base";
import { TouchableOpacity, View } from "react-native";
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
const CANCEL_INDEX = 0;
class SeatOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: ""
    };
  }
  static calculateSeatStyle(bookedQty, totalQty) {
    const style = {
      backgroundColor: "red",
      width: "50%"
    };
    const w = totalQty > 0 ? Math.round(bookedQty / totalQty * 100) : 0;

    if (w >= 80) {
      style.backgroundColor = "#b6ffea"; // xanh
    } else if (w >= 50) {
      style.backgroundColor = "#ffeb96"; // vàng
    } else {
      style.backgroundColor = "#ffc2c2"; // đỏ
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
    console.log("param=>", params);
    this.props.getConfigurationOverview(params);
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
  // componentWillReceiveProps(nextProps) {
  //   console.log("this.props.selectTripReducer", nextProps.selectTripReducer);
  //   console.log(
  //     "this.props.changeRouteReducers",
  //     nextProps.changeRouteReducers
  //   );
  //   console.log(
  //     "this.props.seatOverviewReducers",
  //     nextProps.seatOverviewReducers
  //   );
  //   if (Object.keys(nextProps.seatOverviewReducers).length > 0 && this.props.seatOverviewReducers!==nextProps.seatOverviewReducers) {
  //     console.log("aaaaaaaa", this.props.seatOverviewReducers);
  //     let ticketInfo = nextProps.seatOverviewReducers.ticketInfo.data.tickets;
  //     let tripDetail = nextProps.selectTripReducer.trip.configCustom.selling_configs.selling_configs[2].seats.split(
  //       "~"
  //     );
  //     this.props.buildDataRenderSeatDiagram(
  //       nextProps.changeRouteReducers.value,
  //       tripDetail,
  //       ticketInfo
  //     );
  //   }
  // }
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
  renderSeat(data) {
    const { columnStyle, columnTextStyle, seatOccupancyStyle } = styles;
    let total = 0;
    let booking = 0;
    return data.map((trip, i) => {
      if (trip && trip.configCustom) {
        if (
          trip.configCustom.selling_configs &&
          trip.configCustom.selling_configs.selling_configs[2]
        ) {
          total = trip.configCustom.selling_configs.selling_configs[2].total;
          // booking = trip.configCustom.statistic
          //   ? trip.configCustom.statistic
          //   : null;
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
                borderBottomWidth: 1,
                borderColor: "#d9d8dc"
              }}
              onPress={() => this.showActionSheet(trip)}
            >
              <View
                style={[
                  seatOccupancyStyle,
                  SeatOverview.calculateSeatStyle(6, total)
                ]}
              />
              <Text style={columnTextStyle}>
                {booking}/{total} chỗ123
              </Text>
              <Text style={columnTextStyle}>Từ 200k -20%</Text>
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
                backgroundColor: "red",
                borderBottomWidth: 1,
                borderColor: "#d9d8dc"
              }}
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
    console.log("dates=>", dates);
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
  showActionSheet = trip => {
    let route = this.props.changeRouteReducers;

    let dateParam = moment(trip.date, "YYYY-MM-DD").format("DD-MM-YYYY");
    let params = {
      trip: route.route_id,
      date: `${trip.time} ${dateParam}`,
      fields: "SeatCode,Status,PaymentInfo"
    };
    // console.log("==>", params);
    this.props.getTicketInfo(params);
    this.props.openModel(trip);
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
      console.log("data", data);
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
        <Grid style={tableStyle}>
          {dates ? (
            <Col style={columnHeader}>
              <Text style={headerTextStyle}>CHUYẾN</Text>
            </Col>
          ) : null}
          {ListDates ? this.renderHeadTable(ListDates) : null}
        </Grid>
        <Content>
          {data.length > 0 ? (
            this.renderDataGrid(data)
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                justifyContent: "center"
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
          />
        </Content>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1
  },
  tableStyle: {
    flex: 0
  },
  columnHeader: {
    height: 50,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#d9d8dc",
    backgroundColor: "#f9f9f9",
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
  changeRouteReducers: PropTypes.any
};
const mapStateToProps = state => {
  return {
    loginReducers: state.loginReducers,
    dayReducers: state.getDayReducers,
    configurationOverviewReducers: state.getConfigurationOverview,
    changeRouteReducers: state.changeRouteReducer,
    // selectTripReducer: state.selectTripReducer,
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
