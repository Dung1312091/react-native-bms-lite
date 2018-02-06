import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight
} from "react-native";
import { Actions } from "react-native-router-flux";
import {
  Container,
  Body,
  Title,
  Left,
  Button,
  Icon,
  Header,
  Col,
  Grid
} from "native-base";
import DatePicker from "../../components/DatePicker";
import MyDropdown from "../../components/myDropDown";
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
class AddTrip extends React.Component {
  back = () => {
    Actions.pop();
  };
  render() {
    return (
      <Container style={{ backgroundColor: "#EFEFEF" }}>
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
        <View style={{ flex: 1 }}>
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
              style={{ justifyContent: "center", backgroundColor: "#ECEFF4" }}
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
              >
                <Icon name="md-add" style={{ color: "#fff" }} />
              </TouchableHighlight>
            </View>
          </View>
          <View style={{ backgroundColor: "#fff", height: 100 }}>
            <View style={{ padding: 3 }}>
              <ScrollView>
                <View
                  style={{
                    flexDirection: "row",
                    flexGrow: 1,
                    flexWrap: "wrap"
                  }}
                >
                  {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map(
                    (itm, index) => {
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
                            10:20
                          </Text>
                        </View>
                      );
                    }
                  )}
                </View>
              </ScrollView>
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
                style={{ borderWidth: 1, borderColor: "#DBDBDB", height: 40 }}
              >
                <DatePicker text="Từ ngày" />
              </View>
            </Col>
            <Col style={{ margin: "1%", flex: 1 }}>
              <View
                style={{ borderWidth: 1, borderColor: "#DBDBDB", height: 40 }}
              >
                <DatePicker text="Đến ngày" />
              </View>
            </Col>
          </Grid>
          {/* Option chọn tất cả các ngày hoặc cac thử trong tuần */}
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <View style={{ width: "90%" }}>
              <MyDropdown
                data={optionList}
                onDropdownSelect={() => {
                  return null;
                }}
              />
            </View>
          </View>
        </View>
      </Container>
    );
  }
}

export default AddTrip;
