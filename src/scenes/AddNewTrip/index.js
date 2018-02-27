import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ReactNative,
  findNodeHandle,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Actions } from "react-native-router-flux";
import Modal from "react-native-modalbox";
import dismissKeyboard from "react-native/Libraries/Utilities/dismissKeyboard";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
import VXRCheckBox from "../../components/Checkbox";
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
  ["0", "", "1 ngày"],
  ["1", "", "1 tuần"],
  ["2", "", "1 tháng"],
  ["3", "", "3 tháng"],
  ["4", "", "6 tháng"]
];
const TimeStopTicketSales = [
  ["0", "", "30 Phút"],
  ["1", "", "1 tiếng"],
  ["2", "", "3 tiếng"],
  ["3", "", "12 tiếng"],
  ["4", "", "1 ngày"]
];
const { height, width } = Dimensions.get("window");
class AddNewTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listTripTime: [],
      isLoading: true,
      listRoute: [],
      timeRun: "",
      timeApplicationId: 0,
      renew: false,
      configPrivate: false,
      checkboxes: [
        {
          id: 2,
          title: "T2",
          checked: true
        },
        {
          id: 3,
          title: "T3",
          checked: true
        },
        {
          id: 4,
          title: "T4",
          checked: true
        },
        {
          id: 5,
          title: "T5",
          checked: true
        },
        {
          id: 6,
          title: "T6",
          checked: true
        },
        {
          id: 7,
          title: "T7",
          checked: true
        },
        {
          id: 8,
          title: "CN",
          checked: true
        }
      ]
    };
    // this.showModal = this.showModal.bind(this);
  }
  // componentWillMount() {
  //   const { time } = this.props.trip || "12:12";
  //   this.state.listTripTime.push(time);
  //   this.setState({
  //     listTripTime: this.state.listTripTime
  //   });
  // }
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
  stepTow = () => {
    Actions.addNewTripStepTow();
  };
  addTrip = () => {
    this.modal.close();
    this.state.listTripTime.push(this.state.timeRun);
    this.setState({
      listTripTime: this.state.listTripTime
    });
  };
  deleteTripTime = index => {
    this.state.listTripTime.splice(index, 1);
    this.setState({
      listTripTime: this.state.listTripTime
    });
  };
  onChangeDateTo = date => {
    // console.warn("date=12>", date);
  };
  onChangeDateFrom = date => {
    // console.warn("date23=>", date);
  };
  selectTrip = (index, value) => {
    console.warn(index, value);
  };
  timeApplication = (index, value) => {
    this.setState({
      timeApplicationId: index[0]
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
          key={{ index }}
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
            {item}
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
            data={autoRenew}
            onDropdownSelect={() => {
              return null;
            }}
            defaultValue={autoRenew[2]}
          />
        </View>
      </View>
    );
  };
  render() {
    const viewHeight = 400;
    const restHeight = height - viewHeight;
    const margin = restHeight / 2;
    const heightBottom = height - margin - viewHeight;
    console.log("props ne", this.props);
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
                {this.state.timeApplicationId === "1"
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
                      onDropdownSelect={() => {
                        return null;
                      }}
                      defaultValue={TimeStopTicketSales[0]}
                    />
                  </View>
                </View>
                {/* Cấu hình private riêng */}
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
                  <Text style={{ marginLeft: 12 }}>Cấu hình private riêng</Text>
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
                              value={this.state.timeRun}
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

export default AddNewTrip;
