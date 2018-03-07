import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  findNodeHandle,
  Dimensions,
  TouchableOpacity,
  Alert
} from "react-native";
import { Actions } from "react-native-router-flux";
import Modal from "react-native-modalbox";
import dismissKeyboard from "react-native/Libraries/Utilities/dismissKeyboard";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import moment from "moment";
import uuidv4 from "uuid/v4";
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
  CheckBox
} from "native-base";
import DatePicker from "../../components/DatePicker";
import MyDropdown from "../../components/myDropDown";
import Loading from "../../components/Loading";
import { connect } from "react-redux";
import { RIGHT_PRIVATE_CONFIG } from "../../constants/global";
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
let listAutoRenew = [
  ["1440", "", "1 ngày"],
  ["10080", "", "1 tuần"],
  ["43200", "", "1 tháng"],
  ["129600", "", "3 tháng"],
  ["259200", "", "6 tháng"]
];
const TimeStopTicketSales = [
  ["30", "", "30 Phút"],
  ["60", "", "1 tiếng"],
  ["180", "", "3 tiếng"],
  ["720", "", "12 tiếng"],
  ["1440", "", "1 ngày"]
];
const { height } = Dimensions.get("window");
class AddNewTrip extends React.Component {
  constructor(props) {
    super(props);
    console.log("--->", this.props);
    this.state = {
      listTripTime: [],
      isLoading: true,
      listRoute: [],
      timeRun: "",
      timeApplicationId: 0,
      renew: false,
      renew_value: 1440,
      configPrivate: false,
      start_date: "",
      end_date: "",
      other_config: {},
      trip_id: this.props.route.route_id,
      timeStart: "",
      timeEnd: "",
      frequency: "",
      driver: "",
      timeStopSellingTicket: 30,
      showPrivate: true,
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
      ],
      autoRenew: []
    };

    // this.showModal = this.showModal.bind(this);
  }
  componentWillMount() {
    console.log("---a", this.props.userInfo);
    let { trip } = this.props;
    console.warn("trip", trip);
    let listUserRights = this.props.userInfo.split("~");
    let rs = listUserRights.findIndex(cb => cb === RIGHT_PRIVATE_CONFIG);
    console.warn("rs=>", rs);
    if (trip && trip.time) {
      this.state.listTripTime.push({
        id: uuidv4(),
        time: trip.time,
        minutes: 0,
        driver: ""
      });
    }
    this.setState({
      showPrivate: rs === -1 ? false : true,
      listTripTime: this.state.listTripTime
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
  _scrollToInput(reactNode) {
    // Add a 'scroll' ref to your ScrollView
    this.scroll.scrollToFocusedInput(reactNode);
  }
  buildScheduleValue = () => {
    let schedule_value = "";
    this.state.checkboxes.forEach(item => {
      schedule_value = item.checked
        ? `${schedule_value}1`
        : `${schedule_value}0`;
    });
    return schedule_value;
  };
  buildDetailOtherConfig = () => {
    let listDetail = [];
    let listTime = "";
    this.state.listTripTime.forEach((item, index) => {
      let detail = {
        time: item.time,
        schedule_type: 2,
        schedule_value: this.buildScheduleValue(),
        min_booking_time: null,
        max_booking_time: null,
        receive_time_type: null,
        receive_time_value: null,
        driver_info: item.driver
      };
      listDetail.push(detail);
      if (index === this.state.listTripTime.length) {
        listTime = `${listTime}${item.time}`;
      } else {
        listTime = `${listTime}${item.time}|`;
      }
    });
    return {
      listDetail: listDetail,
      listTime: listTime
    };
  };
  buildDateOfWeekValue = () => {
    let value = 0;
    let { timeApplicationId, checkboxes } = this.state;
    if (timeApplicationId === 0) return value;
    checkboxes.forEach(item => {
      if (item.checked) {
        value += item.binaryValue;
      }
    });
    return value;
  };
  stepTow = () => {
    if (this.state.listTripTime.length === 0) {
      this.showErr("Vui lòng thêm giờ để cấu hình");
      return;
    }
    let data = this.buildDetailOtherConfig();
    let { renew, renew_value, timeStopSellingTicket } = this.state;
    let is_priority = 0;
    let other_config = {
      company_id: +this.props.user.data.CompId,
      config_type: 2,
      detail: data.listDetail,
      from_date: moment(this.state.start_date, "DD-MM-YYYY").format(
        "YYYY-MM-DD"
      ),
      is_renew: renew ? 1 : 0,
      name: "BMS Lite Config(Schedule) 24437",
      note: "",
      payment_method: 0,
      renew_value: renew ? renew_value : null,
      to_date: moment(this.state.end_date, "DD-MM-YYYY").format("YYYY-MM-DD"),
      status: 1,
      trip_id: +this.state.trip_id
    };
    console.warn("--->", other_config);
    if (this.state.showPrivate) {
      is_priority = 1;
      if (this.state.configPrivate) {
        is_priority = 2;
      }
    }
    Actions.addNewTripStepTow({
      other_config: other_config,
      listTime: data.listTime,
      date_of_week_value: this.buildDateOfWeekValue(),
      date_of_week: this.state.timeApplicationId === 0 ? 0 : 1,
      is_priority: is_priority,
      time_limit: timeStopSellingTicket
    });
  };
  formatHours = strTime => {
    let timeValue = strTime;
    let hasErr = false;
    if (timeValue == "" || timeValue === undefined) {
      hasErr = true;
    } else {
      let sHours = timeValue.split(":")[0];
      let sMinutes = timeValue.split(":")[1];
      if (sHours == "" || isNaN(sHours) || parseInt(sHours) > 23) {
        hasErr = true;
      } else if (parseInt(sHours) == 0) {
        sHours = "00";
      } else if (sHours < 10 && sHours.length < 2) {
        sHours = "0" + sHours;
      }
      if (
        (isNaN(sMinutes) && sMinutes !== undefined && sMinutes.length > 0) ||
        parseInt(sMinutes) > 59
      ) {
        hasErr = true;
      } else if (
        parseInt(sMinutes) == 0 ||
        sMinutes == undefined ||
        sMinutes == ""
      ) {
        sMinutes = "00";
      } else if (sMinutes < 10 && sMinutes.length < 2) {
        sMinutes = "0" + sMinutes;
      }
      strTime = sHours + ":" + sMinutes;
    }
    return {
      isInvalid: hasErr,
      time: strTime
    };
  };
  checkDigitOnly = str => {
    str = str === undefined || str === null ? "" : "" + str;
    let pat = new RegExp(/^\d+$/);
    return pat.test(str);
  };
  updateHourly(mode) {
    let { timeStart, timeEnd, frequency, driver } = this.state;
    let hasError = false;
    const objHoursly = this.formatHours(this.state.timeRun);
    const objHourslyStart = this.formatHours(timeStart);
    const objHourslyEnd = this.formatHours(timeEnd);
    const minutesFrequency = frequency;
    if (mode === 1) {
      if (objHoursly.isInvalid) {
        hasError = true;
        return {
          msg: "Vui lòng kiểm tra lại giờ chạy"
        };
      }
    } else {
      if (!hasError) {
        if (objHourslyStart.isInvalid) {
          hasError = true;
          return {
            msg: "Vui lòng kiểm tra lại giờ bắt đầu"
          };
        }
      }
      if (!hasError) {
        if (objHourslyEnd.isInvalid) {
          hasError = true;
          return {
            msg: "Vui lòng kiểm tra lại giờ kết thúc"
          };
        }
      }
      if (!hasError) {
        if (frequency === "" || !this.checkDigitOnly(minutesFrequency)) {
          hasError = true;
          return {
            msg: "Vui lòng kiểm tra lại tần suất"
          };
        }
      }
      if (!hasError) {
        const arrValueStart = objHourslyStart.time.split(":");
        const arrValueEnd = objHourslyEnd.time.split(":");
        const dateNow = new Date();
        const momentValueStart = moment([
          dateNow.getFullYear(),
          dateNow.getMonth(),
          dateNow.getDate(),
          arrValueStart[0],
          arrValueStart[1]
        ]);
        const momentValueEnd = moment([
          dateNow.getFullYear(),
          dateNow.getMonth(),
          dateNow.getDate(),
          arrValueEnd[0],
          arrValueEnd[1]
        ]);
        const diffTimes = momentValueEnd.diff(momentValueStart, "minutes");
        if (diffTimes < +minutesFrequency) {
          hasError = true;
          return {
            msg: "Tần suất không hợp lệ"
          };
        }
      }
      if (!hasError) {
        // not allow < 10 minutes
        if (minutesFrequency < 10) {
          hasError = true;
          return {
            msg: "Tần suất thấp nhất là 10 phút"
          };
        }
      }
    }
    if (!hasError) {
      this.addTime(
        mode,
        objHoursly.time,
        objHourslyStart.time,
        objHourslyEnd.time,
        minutesFrequency,
        driver
      );
    }
  }
  addTime = (
    mode,
    hourlyMid,
    hourlyStart,
    hourlyEnd,
    minutesFrequency,
    driver
  ) => {
    if (mode === 1) {
      let foundedItemCurrent = this.state.listTripTime.findIndex(
        cb => cb.time === hourlyMid
      );
      if (foundedItemCurrent === -1) {
        const arrValueMid = hourlyMid.split(":");
        let mMid = +arrValueMid[0] * 60;
        mMid = +arrValueMid[1] + mMid;
        this.state.listTripTime.push({
          id: uuidv4(),
          time: hourlyMid,
          minutes: mMid,
          driver: driver
        });
        this.setState({
          listTripTime: this.state.listTripTime
        });
      }
    } else if (mode === 2) {
      const arrValueStart = hourlyStart.split(":");
      let mStart = +arrValueStart[0] * 60;
      mStart = +arrValueStart[1] + mStart;
      const arrValueEnd = hourlyEnd.split(":");
      let mEnd = +arrValueEnd[0] * 60;
      mEnd = +arrValueEnd[1] + mEnd;
      const dateNow = new Date();
      const momentValueStart = moment([
        dateNow.getFullYear(),
        dateNow.getMonth(),
        dateNow.getDate(),
        arrValueStart[0],
        arrValueStart[1]
      ]);
      const momentValueEnd = moment([
        dateNow.getFullYear(),
        dateNow.getMonth(),
        dateNow.getDate(),
        arrValueEnd[0],
        arrValueEnd[1]
      ]);
      let nDiffTimes = momentValueEnd.diff(momentValueStart, "minutes");
      nDiffTimes = nDiffTimes * 60;
      nDiffTimes /= +minutesFrequency;
      let listTripTime = this.state.listTripTime;
      for (let i = 0; i <= nDiffTimes; i += 1) {
        if (mStart > mEnd) break;
        const hours = Math.floor(mStart / 60);
        const minutes = mStart % 60;
        const strTime = `${hours.toString()}:${minutes.toString()}`;
        const objTime = this.formatHours(strTime);
        if (!objTime.isInvalid) {
          let foundedItemCurrent = listTripTime.findIndex(
            cb => cb.time === objTime.time
          );
          if (foundedItemCurrent === -1) {
            listTripTime.push({
              id: uuidv4(),
              time: objTime.time,
              minutes: mStart,
              driver: driver
            });
          }
        }
        mStart += +minutesFrequency;
      }
      listTripTime.sort((timeA, timeB) => {
        if (timeA.minutes > timeB.minutes) return 1;
        if (timeA.minutes < timeB.minutes) return -1;
        return 0;
      });
      this.setState({
        listTripTime: listTripTime
      });
    }
  };
  showErr = err => {
    Alert.alert(err);
  };
  addTrip = () => {
    let { timeRun, timeStart, timeEnd, frequency } = this.state;
    if (timeRun !== "") {
      let err = this.updateHourly(1);
      if (err) {
        this.showErr(err.msg);
        return;
      }
    }

    if (timeStart !== "" || timeEnd !== "" || frequency !== "") {
      let err = this.updateHourly(2);
      if (err) {
        this.showErr(err.msg);
        return;
      }
    }
    this.modal.close();
  };
  deleteTripTime = index => {
    this.state.listTripTime.splice(index, 1);
    this.setState({
      listTripTime: this.state.listTripTime
    });
  };
  fillterRenew = () => {
    let { start_date, end_date } = this.state;
    if (start_date && end_date) {
      let nDate = moment(
        moment(end_date, "DD-MM-YYYY").format("YYYY-MM-DD")
      ).diff(moment(start_date, "DD-MM-YYYY").format("YYYY-MM-DD"), "days");
      nDate += 1;
      const nMinutes = nDate * 1440;
      if (nMinutes > 0) {
        let autoRenew = listAutoRenew.filter(item => +item[0] <= +nMinutes);
        this.setState({
          autoRenew: autoRenew
        });
      }
    }
  };
  onChangeDateTo = date => {
    this.setState(
      {
        start_date: date
      },
      () => {
        this.fillterRenew();
      }
    );
  };
  onChangeDateFrom = date => {
    this.setState(
      {
        end_date: date
      },
      () => {
        this.fillterRenew();
      }
    );
  };
  selectTrip = id => {
    this.setState({
      trip_id: id
    });
  };
  selectRenewValue = value => {
    this.setState({
      renew_value: value
    });
  };
  timeApplication = (index, value) => {
    this.setState({
      timeApplicationId: +index[0]
    });
  };
  selectTimeStopSellingTicket = id => {
    this.setState({ timeStopSellingTicket: id });
  };
  toggleCheckbox = id => {
    let index = this.state.checkboxes.findIndex(cb => cb.id === id);
    this.state.checkboxes[index].checked = !this.state.checkboxes[index]
      .checked;
    this.setState({
      checkboxes: this.state.checkboxes
    });
  };
  onchangeRenew = () => {
    this.setState({
      renew: !this.state.renew
    });
  };
  onchangeConfigPrivate = () => {
    this.setState({
      configPrivate: !this.state.configPrivate
    });
  };
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
  renderTripTime = () => {
    return this.state.listTripTime.map((item, index) => {
      return (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#999999",
            marginTop: 6,
            marginLeft: 6,
            height: 35
          }}
          key={item.id}
        >
          <TouchableHighlight
            style={{
              backgroundColor: "#fff",
              width: 30,
              height: 30,
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 5
            }}
            onPress={() => this.deleteTripTime(index)}
          >
            <Icon
              name="ios-close-outline"
              // style={{ backgroundColor: "#fff" }}
            />
          </TouchableHighlight>
          <Text
            style={{
              marginLeft: 4,
              color: "#fff",
              marginRight: 5
            }}
          >
            {item.driver !== ""
              ? ` ${item.driver}-${item.time}`
              : `${item.time}`}
          </Text>
        </View>
      );
    });
  };
  renderAutoRenew = () => {
    return (
      <View
        style={{
          alignItems: "center",
          marginTop: 10,
          padding: 6,
          height: 40
        }}
      >
        <View style={{ width: "100%" }}>
          <MyDropdown
            data={this.state.autoRenew}
            onDropdownSelect={this.selectRenewValue}
            defaultValue={{}}
          />
        </View>
      </View>
    );
  };

  render() {
    const viewHeight = 400;
    const restHeight = height - viewHeight;
    const margin = restHeight / 2;
    // const heightBottom = height - margin - viewHeight;
    let { timeRun, timeStart, timeEnd, driver, frequency } = this.state;
    console.warn("isTrip-->", this.props.addTrip);
    return (
      <Container style={{ backgroundColor: "#fff" }}>
        <Header style={styles.headerStyle}>
          <Left style={{ flex: 1 }}>
            <Button transparent onPress={this.back}>
              <Icon name="arrow-back" style={styles.headerTextStyle} />
            </Button>
          </Left>
          <Body style={{ flex: 4 }}>
            <Title style={styles.headerTextStyle}>BƯỚC 1/3: CHỌN CHUYẾN</Title>
          </Body>
        </Header>
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <View style={{ flex: 1 }}>
            <View>
              <ScrollView>
                <View>
                  <View style={{ padding: 6, backgroundColor: "#ECEFF4" }}>
                    <Text>TUYẾN ĐƯỜNG</Text>
                  </View>
                </View>

                {/* Chọn route */}
                {!this.props.addTrip ? (
                  <View
                    style={{
                      alignItems: "center",
                      height: 40,
                      padding: 6
                    }}
                  >
                    <View style={{ width: "100%" }}>
                      <MyDropdown
                        // data={optionListRoute}
                        data={this.props.trip}
                        onDropdownSelect={this.selectTrip}
                        defaultValue={this.props.route.value}
                      />
                    </View>
                  </View>
                ) : (
                  <View>
                    <View
                      style={{
                        paddingLeft: 6,
                        paddingTop: 6,
                        backgroundColor: "#fff",
                        marginBottom: -5
                      }}
                    >
                      <Text style={{ marginLeft: 6 }}>
                        Chuyến:{this.props.trip.time}
                      </Text>
                      <Text style={{ marginLeft: 6 }}>
                        Tuyến:{this.props.route.value[2]}
                      </Text>
                    </View>
                  </View>
                )}
                <View style={{ marginTop: 15 }} />
                <View
                  style={{
                    padding: 6,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: "#ECEFF4"
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center"
                    }}
                  >
                    <Text>DANH SÁCH THÊM CHUYẾN MỚI</Text>
                  </View>
                  {/* Danh sách chuyến thêm mới */}
                  {this.props.addTrip ? null : (
                    <View style={{ justifyContent: "center" }}>
                      <TouchableHighlight
                        style={{
                          height: 35,
                          width: 70,
                          alignItems: "center",
                          backgroundColor: "#4A86E8",
                          justifyContent: "center"
                        }}
                        onPress={() => this.modal.open()}
                      >
                        <Icon name="md-add" style={{ color: "#fff" }} />
                      </TouchableHighlight>
                    </View>
                  )}
                </View>
                <View
                  style={{
                    backgroundColor: "#fff"
                  }}
                >
                  <View style={{ padding: 3 }}>
                    {/* <ScrollView style={{ zIndex: 1000 }}> */}
                    <View
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap"
                      }}
                    >
                      {this.renderTripTime()}
                    </View>
                    {/* </ScrollView> */}
                  </View>
                </View>
                {/* Thời gian áp dụng */}
                <View
                  style={{
                    justifyContent: "center",
                    backgroundColor: "#ECEFF4",
                    padding: 6
                  }}
                >
                  <Text>THỜI GIAN ÁP DỤNG</Text>
                </View>
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
                        onChangeDate={this.onChangeDateTo}
                        defaultValue={this.props.trip.date}
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
                        onChangeDate={this.onChangeDateFrom}
                        defaultValue={this.props.trip.date}
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
                      defaultValue={optionList[0]}
                    />
                  </View>
                </View>
                <View style={{ marginTop: 16 }} />
                {/* Checkbox các thứ trong tuần */}
                {this.state.timeApplicationId === 1
                  ? this.renderListCheckBoxDayOfWeek()
                  : null}
                {/* Tự động gia hạn cấu hình */}
                <View style={{ flexDirection: "row", marginTop: 14 }}>
                  <CheckBox
                    checked={this.state.renew}
                    onPress={this.onchangeRenew.bind(this)}
                  />
                  <Text style={{ marginLeft: 12 }}>
                    Tự động gia hạn cấu hình
                  </Text>
                </View>
                {this.state.renew ? this.renderAutoRenew() : null}
                {/* Thời gian ngưng bán vé trước khi khởi hành */}
                <View style={{ marginTop: 10 }} />
                <View style={{ padding: 6 }}>
                  <View style={{ backgroundColor: "#ECEFF4" }}>
                    <Text style={{ paddingTop: 6, paddingBottom: 6 }}>
                      THỜI GIAN NGƯNG BÁN VÉ TRƯỚC KHI KHỞI HÀNH
                    </Text>
                  </View>
                  <View style={{ width: "100%", height: 40, marginTop: 5 }}>
                    <MyDropdown
                      data={TimeStopTicketSales}
                      onDropdownSelect={this.selectTimeStopSellingTicket}
                      defaultValue={TimeStopTicketSales[0]}
                    />
                  </View>
                </View>
                {/* Cấu hình private riêng */}
                {this.state.showPrivate ? (
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 14,
                      marginBottom: 60
                    }}
                  >
                    <CheckBox
                      checked={this.state.configPrivate}
                      onPress={this.onchangeConfigPrivate.bind(this)}
                    />
                    <Text style={{ marginLeft: 12 }}>
                      Cấu hình private riêng
                    </Text>
                  </View>
                ) : null}
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
                  bottom: 5,
                  zIndex: 0
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
                onPress={this.stepTow}
              >
                <Text>Tiếp tục</Text>
              </Button>
            </View>
          </View>
        )}

        <Modal
          style={[
            {
              height: "100%",
              width: "82%",
              backgroundColor: "transparent",
              justifyContent: "center"
            }
          ]}
          position={"center"}
          ref={ref => {
            this.modal = ref;
          }}
          swipeArea={20}
        >
          <ScrollView>
            <KeyboardAvoidingView
              style={{
                flex: 1
              }}
            >
              <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View>
                  <View style={{ height: margin }}>
                    <TouchableOpacity
                      style={{ flex: 1 }}
                      onPress={() => this.modal.close()}
                    >
                      {/* <Text>a</Text> */}
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      height: viewHeight,
                      // marginTop: margin,
                      // marginBottom: margin,
                      backgroundColor: "#fff"
                    }}
                  >
                    {/* <View
                    style={{
                      marginLeft: 30,
                      marginRight: 30
                    }}
                  > */}
                    <View
                      style={{
                        backgroundColor: "#ECEFF4",
                        padding: 8
                        // marginLeft: -30,
                        // marginRight: -30
                      }}
                    >
                      <Text>THÊM CHUYẾN ĐƠN LẺ</Text>
                    </View>
                    <KeyboardAwareScrollView
                      ref={ref => {
                        this.scroll = ref;
                      }}
                    >
                      <View style={{ marginLeft: 30, marginRight: 30 }}>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: 10
                          }}
                        >
                          <View
                            style={{
                              flex: 2,
                              justifyContent: "center",
                              alignItems: "center"
                            }}
                          >
                            <Text>Giờ chạy</Text>
                          </View>

                          <View
                            style={{
                              flex: 3,
                              justifyContent: "center"
                            }}
                          >
                            <TextInput
                              onFocus={event => {
                                this._scrollToInput(
                                  findNodeHandle(event.target)
                                );
                              }}
                              underlineColorAndroid="transparent"
                              style={{
                                borderWidth: 1,
                                height: 40,
                                textAlign: "center"
                              }}
                              placeholder="ví dụ: 10:00, 10:30"
                              onChangeText={text =>
                                this.setState({ timeRun: text })
                              }
                              value={timeRun}
                            />
                          </View>
                        </View>
                        {/* Ten tai */}
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: 10
                          }}
                        >
                          <View
                            style={{
                              flex: 2,
                              justifyContent: "center",
                              alignItems: "center"
                            }}
                          >
                            <Text>Tên tài</Text>
                          </View>

                          <View
                            style={{
                              flex: 3,
                              justifyContent: "center"
                            }}
                          >
                            <TextInput
                              onFocus={event => {
                                this._scrollToInput(
                                  findNodeHandle(event.target)
                                );
                              }}
                              underlineColorAndroid="transparent"
                              style={{
                                borderWidth: 1,
                                height: 40,
                                textAlign: "center"
                              }}
                              placeholder="ví dụ: Tài Vĩnh Long"
                              onChangeText={text =>
                                this.setState({ driver: text })
                              }
                              value={driver}
                            />
                          </View>
                        </View>
                      </View>
                      {/* Thêm chuyến theo tần xuất */}
                      <View
                        style={{
                          backgroundColor: "#ECEFF4",
                          padding: 8,
                          marginTop: 10
                        }}
                      >
                        <Text>THÊM CHUYẾN THEO TẦN XUẤT</Text>
                      </View>
                      {/* bắt đầu */}
                      <View style={{ marginLeft: 30, marginRight: 30 }}>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: 10
                          }}
                        >
                          <View
                            style={{
                              flex: 2,
                              justifyContent: "center",
                              alignItems: "center"
                            }}
                          >
                            <Text>Bắt đầu</Text>
                          </View>

                          <View
                            style={{
                              flex: 3,
                              justifyContent: "center"
                            }}
                          >
                            <TextInput
                              onFocus={event => {
                                this._scrollToInput(
                                  findNodeHandle(event.target)
                                );
                              }}
                              underlineColorAndroid="transparent"
                              style={{
                                borderWidth: 1,
                                height: 40,
                                textAlign: "center"
                              }}
                              placeholder="ví dụ: 6:00"
                              onChangeText={text =>
                                this.setState({ timeStart: text })
                              }
                              value={timeStart}
                            />
                          </View>
                        </View>
                        {/* kết thúc */}
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: 10
                          }}
                        >
                          <View
                            style={{
                              flex: 2,
                              justifyContent: "center",
                              alignItems: "center"
                            }}
                          >
                            <Text>Kết thúc</Text>
                          </View>

                          <View
                            style={{
                              flex: 3,
                              justifyContent: "center"
                            }}
                          >
                            <TextInput
                              onFocus={event => {
                                this._scrollToInput(
                                  findNodeHandle(event.target)
                                );
                              }}
                              underlineColorAndroid="transparent"
                              style={{
                                borderWidth: 1,
                                height: 40,
                                textAlign: "center"
                              }}
                              placeholder="ví dụ: 22:00"
                              onChangeText={text =>
                                this.setState({ timeEnd: text })
                              }
                              value={timeEnd}
                            />
                          </View>
                        </View>
                        {/* Tần xuất */}
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: 10
                          }}
                        >
                          <View
                            style={{
                              flex: 2,
                              justifyContent: "center",
                              alignItems: "center"
                            }}
                          >
                            <Text>Tần xuất</Text>
                          </View>

                          <View
                            style={{
                              flex: 3,
                              justifyContent: "center"
                            }}
                          >
                            <TextInput
                              onFocus={event => {
                                this._scrollToInput(
                                  findNodeHandle(event.target)
                                );
                              }}
                              underlineColorAndroid="transparent"
                              style={{
                                borderWidth: 1,
                                height: 40,
                                textAlign: "center"
                              }}
                              placeholder="ví dụ: 120ph/chuyến"
                              onChangeText={text =>
                                this.setState({ frequency: text })
                              }
                              value={frequency}
                            />
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          width: "100%",
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: 20
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            width: "96%",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "blue",
                            height: 40
                          }}
                          onPress={this.addTrip}
                        >
                          <Text style={{ color: "#fff" }}>Thêm</Text>
                        </TouchableOpacity>
                      </View>
                    </KeyboardAwareScrollView>
                    {/* </View> */}
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </ScrollView>
        </Modal>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    userInfo: state.loginReducers.user.data.Info
  };
};
export default connect(mapStateToProps, null)(AddNewTrip);
