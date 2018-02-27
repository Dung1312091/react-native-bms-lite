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
  CheckBox
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
class AddTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listTripTime: [],
      isLoading: true
    };
    // this.showModal = this.showModal.bind(this);
  }
  componentWillMount() {
    const { time } = this.props.trip;
    this.state.listTripTime.push(time);
    this.setState({
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
            onPress={() => console.warn("hihi")}
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
  render() {
    // console.warn("asnakllasn", this.props.trip);
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
                    <Text>THÔNG TIN CHUYẾN HỦY</Text>
                  </View>
                </View>

                <View>
                  <View style={{ padding: 6, backgroundColor: "#fff" }}>
                    <Text>Chuyến: 06:00</Text>
                    <Text>Tuyến: Sài Gòn - Nha Trang</Text>
                  </View>
                </View>

                <View
                  style={{
                    padding: 6,
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      backgroundColor: "#ECEFF4"
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
                      disabled={true}
                      // onPress={() => this.modal.open()}
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
                      <DatePicker text="Từ ngày" />
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
                      <DatePicker text="Đến ngày" />
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
                      onDropdownSelect={() => {
                        return null;
                      }}
                      defaultValue={{}}
                    />
                  </View>
                </View>
                <View style={{ marginTop: 16 }} />
                {/* Checkbox các thứ trong tuần */}
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap"
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <CheckBox checked={true} />
                    <Text style={{ marginLeft: 12 }}>T2</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <CheckBox checked={true} />
                    <Text style={{ marginLeft: 12 }}>T2</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <CheckBox checked={true} />
                    <Text style={{ marginLeft: 12 }}>T2</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <CheckBox checked={true} />
                    <Text style={{ marginLeft: 12 }}>T2</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <CheckBox checked={true} />
                    <Text style={{ marginLeft: 12 }}>T2</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <CheckBox checked={true} />
                    <Text style={{ marginLeft: 12 }}>T2</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <CheckBox checked={true} />
                    <Text style={{ marginLeft: 12 }}>T2</Text>
                  </View>
                </View>
                {/* Tự động gia hạn cấu hình */}
                <View style={{ flexDirection: "row", marginTop: 14 }}>
                  <CheckBox checked={true} />
                  <Text style={{ marginLeft: 12 }}>
                    Tự động gia hạn cấu hình
                  </Text>
                </View>
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
                      defaultValue={{}}
                    />
                  </View>
                </View>
                {/* Thời gian ngưng bán vé trước khi khởi hành */}
                <View style={{ marginTop: 10 }} />
                <View style={{ padding: 6 }}>
                  <View style={{ backgroundColor: "#ECEFF4" }}>
                    <Text>THỜI GIAN NGƯNG BÁN VÉ TRƯỚC KHI KHỞI HÀNH</Text>
                  </View>
                  <View style={{ width: "100%", height: 40, marginTop: 5 }}>
                    <MyDropdown
                      data={TimeStopTicketSales}
                      onDropdownSelect={() => {
                        return null;
                      }}
                      defaultValue={{}}
                    />
                  </View>
                </View>
                {/* Cấu hình private riêng */}
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 14,
                    marginBottom: 20
                  }}
                >
                  <CheckBox checked={true} />
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
                onPress={this.changeSeatOnline}
              >
                <Text>Tiếp tục</Text>
              </Button>
            </View>
          </View>
        )}
      </Container>
    );
  }
}

export default AddTrip;
