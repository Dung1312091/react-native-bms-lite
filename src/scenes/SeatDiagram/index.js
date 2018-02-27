import React from "react";
import PropTypes from "prop-types";
import Seat from "../../components/Seat";
import { Text, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import moment from "moment";
import { changeSeatOnline } from "./actions";
import { Actions } from "react-native-router-flux";
import Loading from "../../components/Loading";
import {
  Container,
  Body,
  Title,
  Left,
  Button,
  Icon,
  Header,
  Content,
  Tabs,
  Tab,
  Grid,
  CheckBox
} from "native-base";
class SeatDiagram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      check: false,
      isShowButton: false,
      listSelectItem: [],
      isLoading: true
    };
  }
  buildString = (lable, coach, row, col, id) => {
    if (id) {
      return `${lable}|${coach}|${row}|${col}|${id}`;
    } else {
      return `${lable}|${coach}|${row}|${col}`;
    }
  };
  setUpAllDataToRender = (routeData, tripDetail, ticketInfo) => {
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
    console.log("seatDiagram=>", seatDiagram);
    for (let i = startIndex; i < seatDiagram.length; i++) {
      let item = seatDiagram[i].split("|");
      let isOnline = false;
      let paymentStatus = null;
      const itemCoach = +item[5];
      const itemRow = +item[6];
      const itemCol = +item[7];
      // console.log("tripDetail==>", tripDetail);
      let strFindSeatOnline = this.buildString(
        item[4],
        itemCoach,
        itemRow,
        itemCol,
        seatDiagramId
      );
      let strPaymentMethodSeat = this.buildString(
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
        _isPaymentStatus: paymentStatus,
        _seatDiagramId: seatDiagram[0]
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
              _isPaymentStatus: items[0]._isPaymentStatus,
              _seatDiagramId: items[0]._seatDiagramId
            };
          } else {
            result[c - 1][a - 1][b - 1] = {};
          }
        }
      }
    }
    return result;
  };
  componentWillMount() {
    let ticketInfo = this.props.seatOverviewReducers.ticketInfo.data.tickets;
    let tripDetail = this.props.selectTripReducer.trip.configCustom.selling_configs.selling_configs[2].seats.split(
      "~"
    );
    let data = this.setUpAllDataToRender(
      this.props.changeRouteReducers.value,
      tripDetail,
      ticketInfo
    );
    this.setState({
      data: data
    });
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 100);
  }
  back = () => {
    Actions.pop();
  };
  selectSeat = (data, isShow) => {
    this.state.listSelectItem.push(data);
    if (isShow) {
      this.setState({
        isShowButton: true
      });
    }
  };
  unSelectSeat = data => {
    if (data._isOnline) {
      this.setState({
        isShowButton: true
      });
      let index = this.state.listSelectItem.findIndex(
        x => x._label === data._label
      );
      if (index > -1) {
        this.state.listSelectItem.splice(index, 1);
      }
    }
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.props.changeRouteReducers.value !==
      nextProps.changeRouteReducers.value
    ) {
      let ticketInfo = nextProps.seatOverviewReducers.ticketInfo.data.tickets;
      let tripDetail = nextProps.selectTripReducer.trip.configCustom.selling_configs.selling_configs[2].seats.split(
        "~"
      );
      let data = this.setUpAllDataToRender(
        nextProps.changeRouteReducers.value,
        tripDetail,
        ticketInfo
      );
      this.setState({
        data: data
      });
    }
  }
  check = () => {
    this.setState({
      check: !this.state.check
    });
  };
  buildDataUpdateSeatOnline = data => {
    let str = `2~${data.length}~`;
    data.forEach((item, index) => {
      str += `${item._label}|${item._coach}|${item._row}|${item._col}|${
        item._seatDiagramId
      }`;
      str += index === data.length - 1 ? "" : "~";
    });
    return str;
  };
  changeSeatOnline = () => {
    // console.log("ahihi", this.props.trip);
    let trip = this.props.trip;
    let selling_configs = trip.configCustom.selling_configs.selling_configs[2];
    // console.warn("selling_configs.prior", trip);
    let info = this.buildDataUpdateSeatOnline(this.state.listSelectItem);
    // console.warn("rs==>", info);
    let params = {
      from_date: moment(trip.date, "YYYY-MM-DD").format("DD-MM-YYYY"),
      info: info,
      is_priority: this.state.check ? 2 : selling_configs.prior,
      status: 1,
      stop_points: selling_configs.stop_points,
      time_limit: selling_configs.time_limit,
      times: trip.time,
      to_date: moment(trip.date, "YYYY-MM-DD").format("DD-MM-YYYY"),
      trip_id: this.props.changeRouteReducers.value[0],
      type: 2
    };
    this.props.changeSeatOnline(params);
    // console.warn("param--", params);
  };
  renderSeat = seatNumber => {
    return seatNumber.map((item, index) => {
      return (
        <Seat
          key={index}
          item={item}
          selectSeat={this.selectSeat}
          unSelectSeat={this.unSelectSeat}
        />
      );
    });
  };
  renderSeatMap = arr => {
    return arr.map((item, index) => {
      let gridStyle = index === 0 ? { marginTop: 4 } : null;
      return (
        <Grid key={index} style={[{ backgroundColor: "#EFEFEF" }, gridStyle]}>
          {this.renderSeat(item)}
        </Grid>
      );
    });
  };
  buildHeader = trip => {
    let date = moment(trip.date, "YYYY-MM-DD").format("DD/MM/YYYY"),
      str = `CHUYẾN ${trip.time} ${date}`;
    return str;
  };
  render() {
    let { data } = this.state;
    return (
      <Container style={{ backgroundColor: "#EFEFEF" }}>
        <Header style={styles.headerStyle}>
          <Left style={{ flex: 1 }}>
            <Button transparent onPress={this.back}>
              <Icon name="arrow-back" style={styles.headerTextStyle} />
            </Button>
          </Left>
          <Body style={{ flex: 4 }}>
            <Title style={styles.headerTextStyle}>
              {this.buildHeader(this.props.trip)}
            </Title>
          </Body>
        </Header>

        <View style={{ alignItems: "center" }}>
          <Text>THAY ĐỔI CHỖ BÁN ONLINE</Text>
        </View>
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <View style={{ flex: 1 }}>
            <View style={{ flex: 4 }}>
              <Tabs initialPage={0} style={{ backgroundColor: "#EFEFEF" }}>
                <Tab heading="Tầng 1" style={styles.tabHeader}>
                  <Content>
                    <View
                      style={{
                        marginLeft: 50,
                        marginRight: 50,
                        backgroundColor: "#EFEFEF"
                      }}
                    >
                      {this.renderSeatMap(data[0])}
                    </View>
                  </Content>
                </Tab>
                <Tab heading="Tầng 2" style={styles.tabHeader}>
                  <Content style={{ marginLeft: 50, marginRight: 50 }}>
                    {data.length > 1 ? this.renderSeatMap(data[1]) : null}
                  </Content>
                </Tab>
              </Tabs>
            </View>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: -10
                }}
              >
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Text style={{ color: "#1B291F" }}>TỔNG 8 CHỖ</Text>
                  <Text> (chạm vào 1 ghế để tắt hoặc mở ghế bán online)</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  marginTop: 8,
                  marginBottom: 3,
                  shadowColor: "#D9D9D9"
                  // height: "100%"
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <CheckBox checked={this.state.check} onPress={this.check} />
                  <Text style={{ marginLeft: 15 }}>
                    Cấu hình riêng (private)
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginLeft: 10,
                  marginRight: 10,
                  marginTop: 5
                }}
              >
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <View
                    style={{
                      width: 15,
                      height: 15,
                      backgroundColor: "#FAADD3",
                      borderRadius: 2
                    }}
                  />
                  <Text style={{ color: "#1B2529", marginLeft: 3 }}>
                    Ghế đặt chỗ
                  </Text>
                </View>
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <View
                    style={{
                      width: 15,
                      height: 15,
                      backgroundColor: "#FAF87D",
                      borderRadius: 2
                    }}
                  />
                  <Text style={{ color: "#1B2529", marginLeft: 3 }}>
                    Ghế thanh toán
                  </Text>
                </View>
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <View
                    style={{
                      width: 15,
                      height: 15,
                      backgroundColor: "#007AFF",
                      borderRadius: 2
                    }}
                  />
                  <Text style={{ color: "#1B2529", marginLeft: 3 }}>
                    Ghế bán online
                  </Text>
                </View>
                {this.state.isShowButton ? (
                  <View
                    style={[
                      {
                        width: "100%",
                        // marginTop: 3,
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        position: "absolute",
                        top: -5,
                        right: 0,
                        bottom: 0,
                        left: 0
                      }
                    ]}
                  >
                    <Button
                      style={{
                        width: "99%",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 3
                      }}
                      onPress={this.changeSeatOnline}
                    >
                      <Text>Lưu</Text>
                    </Button>
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        )}
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  headerLeft: {
    flex: 1
  },
  headerBody: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  headerRight: {
    flex: 1
  },
  tabHeader: {
    height: 50,
    backgroundColor: "#EFEFEF"
  },
  displayView: {
    display: "none"
  }
});
SeatDiagram.propTypes = {
  changeRouteReducers: PropTypes.any
};
const mapStateToProps = state => {
  return {
    changeRouteReducers: state.changeRouteReducer,
    selectTripReducer: state.selectTripReducer,
    seatOverviewReducers: state.seatOverviewReducers
  };
};
const mapDispatchToProps = dispatch => {
  return {
    changeSeatOnline: params => {
      dispatch(changeSeatOnline(params));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SeatDiagram);
