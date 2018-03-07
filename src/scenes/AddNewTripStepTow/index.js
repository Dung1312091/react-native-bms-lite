import React, { Component } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import {
  Container,
  Body,
  Title,
  Left,
  Button,
  Icon,
  Header,
  Tabs,
  Tab,
  Content,
  Grid
} from "native-base";
import { connect } from "react-redux";
import MyDropdown from "../../components/myDropDown";
import { Actions } from "react-native-router-flux";
import Seat from "../../components/Seat";
// const optionList = [["0", "", "Chọn loại xe"]];
class AddNewTripStepTow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionList: [["0", "", "Chọn loại xe"]],
      data: [],
      id: null,
      listSelectItem: [],
      coach: null
    };
  }
  back = () => {
    Actions.pop();
  };
  showErr = err => {
    Alert.alert(err);
  };
  next = () => {
    if (this.state.listSelectItem.length < 2) {
      this.showErr("Bạn cần chọn ít nhất 2 chỗ bán Online");
      return;
    }
    Actions.fareCreation({
      id: this.state.id,
      listSeat: this.state.listSelectItem,
      other_config: this.props.other_config,
      listTime: this.props.listTime,
      date_of_week_value: this.props.date_of_week_value,
      date_of_week: this.props.date_of_week,
      coach: this.state.coach,
      is_priority: this.props.is_priority,
      time_limit: this.props.time_limit
    });
  };
  selectTrip = id => {
    // console.warn("this.state.data", this.state.optionList);
    let value = this.state.optionList.filter(item => item[0] === id);
    //console.warn("value=>", value);
    let seatInfo = value[0][1].split("~");
    let seatDiagram = seatInfo[0].split("|");
    let seatDiagramId = value[0][0];
    console.warn("value=>", value);
    let coach = seatDiagram[1]; //so tang
    let result = [];
    let floor_1 = [];
    let floor_2 = [];
    let rowFloor_1 = 0;
    let rowFloor_2 = 0;
    let colFloor_1 = 0;
    let colFloor_2 = 0;
    let startIndex = 5;
    if (+coach === 1) {
      startIndex = 4;
      floor_1 = seatInfo[1].split("|");
      rowFloor_1 = floor_1[1];
      colFloor_1 = floor_1[2];
    } else if (+coach === 2) {
      floor_1 = seatInfo[1].split("|");
      floor_2 = seatInfo[2].split("|");
      rowFloor_1 = floor_1[1];
      colFloor_1 = floor_1[2];
      rowFloor_2 = floor_2[1];
      colFloor_2 = floor_2[2];
    }
    let tmpSeats = [];
    for (let i = startIndex; i < seatInfo.length; i++) {
      let item = seatInfo[i].split("|");
      let isOnline = false;
      let paymentStatus = null;
      const itemCoach = +item[5];
      const itemRow = +item[6];
      const itemCol = +item[7];
      tmpSeats.push({
        _label: item[4] || "",
        _coach: itemCoach,
        _row: itemRow,
        _col: itemCol,
        _isOnline: isOnline,
        _isPaymentStatus: paymentStatus,
        _seatDiagramId: seatDiagramId
      });
    }
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
    // console.log("result=>", result);
    this.setState({
      data: result,
      id: id,
      coach: coach
    });
  };
  componentWillMount() {
    console.warn("ahihi");
    const seat_templates = this.props.seat_templates.data;
    // console.log(
    //   "this.props.seat_templates.data=>",
    //   this.props.seat_templates.data
    // );
    // console.log("seat_templates==>", seat_templates);
    seat_templates.forEach(item => {
      let temp = [item.id, item.info, item.name];
      this.state.optionList.push(temp);
    });
    this.setState({
      optionList: this.state.optionList
    });
    // console.log(this.state.optionList);
  }

  renderSeat = seatNumber => {
    return seatNumber.map((item, index) => {
      return (
        <Seat
          key={item._label}
          item={item}
          selectSeat={this.selectSeat}
          unSelectSeat={this.unSelectSeat}
        />
      );
    });
  };
  selectSeat = (data, isShow) => {
    this.state.listSelectItem.push(data);
    if (isShow) {
      this.setState({
        isShowButton: true
      });
    }
    console.warn(data);
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
    console.warn(data);
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
  render() {
    const { optionList, data } = this.state;
    // console.log("data==>", data);
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
              BƯỚC 2/3: CHỌN CHỖ MỞ BÁN
            </Title>
          </Body>
        </Header>
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: "center", marginTop: 10, flex: 1 }}>
            <View style={{ width: "96%" }}>
              <MyDropdown
                data={optionList}
                onDropdownSelect={this.selectTrip}
                defaultValue={{}}
              />
            </View>
          </View>

          {data.length === 0 ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 8
              }}
            >
              <Text>Vui lòng chọn loại xe</Text>
            </View>
          ) : (
            <View style={{ flex: 10 }}>
              {/* <View style={{ marginTop: 45 }} /> */}
              <View style={{ flex: 8 }}>
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
                        {data.length > 0 ? this.renderSeatMap(data[0]) : null}
                      </View>
                    </Content>
                  </Tab>
                  <Tab heading="Tầng 2" style={styles.tabHeader}>
                    <Content>
                      <View style={{ marginLeft: 50, marginRight: 50 }}>
                        {data.length > 1 ? this.renderSeatMap(data[1]) : null}
                      </View>
                    </Content>
                  </Tab>
                </Tabs>
              </View>
              <View style={{ flex: 1.3, marginTop: 15 }}>
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
                    <Text style={{ color: "#1B291F" }}>
                      TỔNG CHỖ BÁN ONLINE: 8 Chỗ
                    </Text>
                    <Text> (chạm vào 1 ghế để tắt hoặc mở ghế bán online)</Text>
                  </View>
                </View>
                {/* <View
              style={{
                flexDirection: "column",
                marginTop: 8,
                marginBottom: 3,
                shadowColor: "#D9D9D9"
                // height: "100%"
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <CheckBox checked={true} onPress={this.check} />
                <Text style={{ marginLeft: 15 }}>Cấu hình riêng (private)</Text>
              </View>
            </View> */}
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
                </View>
              </View>
              <View
                style={[
                  {
                    width: "100%",
                    // marginTop: 3,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    flex: 1
                    // position: "absolute",
                    // top: -5,
                    // right: 0,
                    // bottom: 0,
                    // left: 0
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
                  onPress={this.next}
                >
                  <Text>Tiếp tục</Text>
                </Button>
              </View>
            </View>
          )}
        </View>
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
const mapStateToProps = state => {
  console.warn("loginReducers=>", state.loginReducers);
  return {
    seat_templates: state.loginReducers.seat_templates,
    userInfo: state.loginReducers.user.data.Info
  };
};
export default connect(mapStateToProps, null)(AddNewTripStepTow);
