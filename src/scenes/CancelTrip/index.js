import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight
} from "react-native";
import { Actions } from "react-native-router-flux";
// import Modal from "react-native-modalbox";
import {
  Container,
  Body,
  Title,
  Left,
  Button,
  Icon,
  Header,
  Col,
  Grid,
  CheckBox,
  Right
} from "native-base";
import DatePicker from "../../components/DatePicker";
import MyDropdown from "../../components/myDropDown";
import Loading from "../../components/Loading";
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
  }
});
const optionList = [["0", "", "Tất cả các ngày"], ["1", "", "Thứ trong tuần"]];
const autoRenew = [
  ["0", "", "1 tháng trước khi hết hạn"],
  ["1", "", "2 tháng trước khi hết hạn"]
];
const TimeStopTicketSales = [
  ["0", "", "30 Phút"],
  ["1", "", "60 Phút"],
  ["2", "", "120 Phút"],
  ["3", "", "180 Phút"]
];
class CancelTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listTripTime: [],
      isLoading: true,
      isShownote: false,
      countBookOrPaid: 0,
      timeApplicationId: 0,
      stopSellingTicked: true,
      checkboxes: [
        {
          id: 2,
          title: "T2",
          checked: true,
          binaryValue: 2,
          day: 1
        },
        {
          id: 3,
          title: "T3",
          checked: true,
          binaryValue: 4,
          day: 2
        },
        {
          id: 4,
          title: "T4",
          checked: true,
          binaryValue: 8,
          day: 3
        },
        {
          id: 5,
          title: "T5",
          checked: true,
          binaryValue: 16,
          day: 4
        },
        {
          id: 6,
          title: "T6",
          checked: true,
          binaryValue: 32,
          day: 5
        },
        {
          id: 7,
          title: "T7",
          checked: true,
          binaryValue: 64,
          day: 6
        },
        {
          id: 8,
          title: "CN",
          checked: true,
          binaryValue: 1,
          day: 0
        }
      ]
    };
    // this.showModal = this.showModal.bind(this);
  }
  componentDidMount() {
    // console.warn("==>", this.props.trip);
    const { trip } = this.props;
    // console.log("trip==>", trip);
    const statistic = trip.configCustom.statistic;
    if (trip.configCustom && statistic) {
      if (statistic.booked > 0 || statistic.paid > 0) {
        this.setState({
          isShownote: true,
          countBookOrPaid:
            statistic.booked > 0 ? statistic.booked : statistic.paid
        });
      }
    }
  }
  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({
  //       isLoading: false
  //     });
  //   }, 100);
  // }
  renderListCheckBoxDayOfWeek = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap"
        }}
      >
        {this.renderListCheckBox()}
      </View>
    );
  };
  renderListCheckBox = () => {
    return this.state.checkboxes.map(cb => {
      return (
        <View style={{ flexDirection: "row" }} key={cb.id}>
          <CheckBox
            checked={cb.checked}
            onPress={() => this.toggleCheckbox(cb.id)}
          />
          <Text style={{ marginLeft: 12 }}>{cb.title}</Text>
        </View>
      );
    });
  };
  toggleCheckbox = id => {
    let index = this.state.checkboxes.findIndex(cb => cb.id === id);
    this.state.checkboxes[index].checked = !this.state.checkboxes[index]
      .checked;
    this.setState({
      checkboxes: this.state.checkboxes
    });
  };
  back = () => {
    Actions.pop();
  };
  timeApplication = (index, value) => {
    this.setState({
      timeApplicationId: +index[0]
    });
  };
  changeStopSellingTicked = () => {
    this.setState({
      stopSellingTicked: !this.state.stopSellingTicked
    });
  };
  cancelTicket = () => {
    let { stopSellingTicked } = this.state;
    if (stopSellingTicked) {
      // console.warn("call api");
    } else {
      Actions.pop();
    }
  };
  render() {
    let { date, time } = this.props.trip;
    let {
      isShownote,
      countBookOrPaid,
      timeApplicationId,
      stopSellingTicked
    } = this.state;
    let route = this.props.route.value[2];
    return (
      <Container style={{ backgroundColor: "#fff" }}>
        <Header style={styles.headerStyle}>
          <Left style={{ flex: 1 }}>
            <Button transparent onPress={this.back}>
              <Icon name="arrow-back" style={styles.headerTextStyle} />
            </Button>
          </Left>
          <Body style={{ flex: 4, alignItems: "center" }}>
            <Title>HỦY VÉ</Title>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>

        <View style={{ flex: 1 }}>
          <View>
            <ScrollView>
              <View>
                <View style={{ padding: 6, backgroundColor: "#ECEFF4" }}>
                  <Text>THÔNG TIN CHUYẾN HỦY</Text>
                </View>
              </View>

              <View>
                <View style={{ padding: 6, backgroundColor: "#fff" }}>
                  <Text>Chuyến: {time}</Text>
                  <Text>Tuyến: {route}</Text>
                </View>
              </View>

              <View
                style={{
                  padding: 6,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              />
              <View>
                <View style={{ padding: 6, backgroundColor: "#ECEFF4" }}>
                  <Text>THỜI GIAN ÁP DỤNG</Text>
                </View>
              </View>
              <View style={{ marginTop: 5 }} />
              {/* Thời gian áp dụng */}
              <Grid style={{ padding: "1%", flex: 0 }}>
                <Col
                  style={{
                    margin: "1%",
                    flex: 1
                  }}
                >
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: "#DBDBDB",
                      height: 40
                    }}
                  >
                    <DatePicker
                      text="Từ ngày"
                      defaultValue={date}
                      onChangeDate={() => {}}
                    />
                  </View>
                </Col>
                <Col style={{ margin: "1%", flex: 1 }}>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: "#DBDBDB",
                      height: 40
                    }}
                  >
                    <DatePicker
                      text="Đến ngày"
                      defaultValue={date}
                      onChangeDate={() => {}}
                    />
                  </View>
                </Col>
              </Grid>
              {/* Option chọn tất cả các ngày hoặc cac thử trong tuần */}
              <View
                style={{
                  alignItems: "center",
                  height: 40,
                  padding: 6
                }}
              >
                <View style={{ width: "100%" }}>
                  <MyDropdown
                    data={optionList}
                    onDropdownSelect={this.timeApplication}
                    defaultValue={{}}
                  />
                </View>
              </View>
              <View style={{ marginTop: 16 }} />
              {/* Checkbox các thứ trong tuần */}
              {timeApplicationId === 1
                ? this.renderListCheckBoxDayOfWeek()
                : null}
              {/* Ghi chu */}
              {isShownote ? (
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 6,
                    marginTop: 20,
                    backgroundColor: "#FFE6E6",
                    borderLeftWidth: 6,
                    borderLeftColor: "#4A86E8"
                  }}
                >
                  <View>
                    <Text>Chú ý: {` `}</Text>
                  </View>
                  <View
                    style={{
                      width: 0,
                      flexGrow: 1,
                      flex: 1
                    }}
                  >
                    <Text>
                      Có {countBookOrPaid} chuyến đang có khách đặt trong khoảng
                      thời gian trên, bạn cần liên lạc với khách để chuyển sang
                      sang chuyến khác hoặc hủy vé. Sau đó thực hiện lại
                    </Text>
                  </View>
                </View>
              ) : null}
              {/* Cấu hình ngưng bán vé */}
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 14,
                  marginBottom: 20
                }}
              >
                <CheckBox
                  checked={stopSellingTicked}
                  onPress={this.changeStopSellingTicked}
                />
                <Text style={{ marginLeft: 12 }}>
                  Ngưng bán vé trong thời gian chuyển vé khách đã đặt
                </Text>
              </View>
            </ScrollView>
          </View>
          <View
            style={[
              {
                width: "100%",
                // marginTop: 3,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                position: "absolute",
                bottom: 0
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
              onPress={this.cancelTicket}
            >
              <Text>{stopSellingTicked ? "XÁC NHẬN" : "ĐÓNG"}</Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }
}

export default CancelTrip;
