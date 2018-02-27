import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity
} from "react-native";
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
  Grid,
  Col
} from "native-base";
import MyDropdown from "../../components/myDropDown";
import { Actions } from "react-native-router-flux";
import ScrollableTabView, {
  ScrollableTabBar
} from "react-native-scrollable-tab-view";
import { connect } from "react-redux";
// const optionList = [
//   ["0", "", "Chọn giá vé theo sơ đồ ghế"],
//   ["1", "", "Thứ trong tuần"]
// ];
const listData = [
  [
    ["SG-VL", "18:00", "21/2/2017"],
    "VH2S927",
    ["A1", "C2", "D4"],
    "320000",
    ["10:33", "22/12/2017"],
    1
  ],
  [
    ["SG-VL", "18:00", "21/2/2017"],
    "VH2S927",
    ["A1", "C2", "D4"],
    "320000",
    ["10:33", "22/12/2017"],
    2
  ],
  [
    ["SG-VL", "18:00", "21/2/2017"],
    "VH2S927",
    ["A1", "C2", "D4"],
    "320000",
    ["10:33", "22/12/2017"],
    3
  ],
  [
    ["SG-VL", "18:00", "21/2/2017"],
    "VH2S927",
    ["A1", "C2", "D4"],
    "320000",
    ["10:33", "22/12/2017"],
    1
  ],
  [
    ["SG-VL", "18:00", "21/2/2017"],
    "VH2S927",
    ["A1", "C2", "D4"],
    "320000",
    ["10:33", "22/12/2017"],
    2
  ],
  [
    ["SG-VL", "18:00", "21/2/2017"],
    "VH2S927",
    ["A1", "C2", "D4"],
    "320000",
    ["10:33", "22/12/2017"],
    2
  ],
  [
    ["SG-VL", "18:00", "21/2/2017"],
    "VH2S927",
    ["A1", "C2", "D4"],
    "320000",
    ["10:33", "22/12/2017"],
    1
  ],
  [
    ["SG-VL", "18:00", "21/2/2017"],
    "VH2S927",
    ["A1", "C2", "D4"],
    "320000",
    ["10:33", "22/12/2017"],
    3
  ],
  [
    ["SG-VL", "18:00", "21/2/2017"],
    "VH2S927",
    ["A1", "C2", "D4"],
    "320000",
    ["10:33", "22/12/2017"],
    1
  ],
  [
    ["SG-VL", "18:00", "21/2/2017"],
    "VH2S927",
    ["A1", "C2", "D4"],
    "320000",
    ["10:33", "22/12/2017"],
    1
  ],
  [
    ["SG-VL", "18:00", "21/2/2017"],
    "VH2S927",
    ["A1", "C2", "D4"],
    "320000",
    ["10:33", "22/12/2017"],
    1
  ],
  [
    ["SG-VL", "18:00", "21/2/2017"],
    "VH2S927",
    ["A1", "C2", "D4"],
    "320000",
    ["10:33", "22/12/2017"],
    1
  ],
  [
    ["SG-VL", "18:00", "21/2/2017"],
    "VH2S927",
    ["A1", "C2", "D4"],
    "320000",
    ["10:33", "22/12/2017"],
    1
  ],
  [
    ["SG-VL", "18:00", "21/2/2017"],
    "VH2S927",
    ["A1", "C2", "D4"],
    "320000",
    ["10:33", "22/12/2017"],
    1
  ],
  [
    ["SG-VL", "18:00", "21/2/2017"],
    "VH2S927",
    ["A1", "C2", "D4"],
    "320000",
    ["10:33", "22/12/2017"],
    1
  ]
];
class FlastListItem extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          console.warn("a");
        }}
      >
        <Grid
          style={{
            flex: 0,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            borderBottomColor: "#E1E1E1",
            borderBottomWidth: 1
          }}
        >
          <Col style={styles.colStyle}>
            <Text style={styles.textStyle}>{this.props.data[0][0]}</Text>
            <Text style={styles.textStyle}>{this.props.data[0][1]}</Text>
            <Text style={styles.textStyle}>{this.props.data[0][2]}</Text>
          </Col>
          <Col style={styles.colStyle}>
            <Text style={styles.textStyle}>{this.props.data[1]}</Text>
            <Text>{this.props.data[2]}</Text>
            <View style={{ flexDirection: "row" }}>
              {/* {this.renderTicketCode(this.props.data[2])} */}
              <Text>AA</Text>
            </View>
          </Col>
          <Col style={styles.colStyle}>
            <Text style={styles.textStyle}>{this.props.data[3]}</Text>
          </Col>
          <Col style={styles.colStyle}>
            <Text style={styles.textStyle}>{this.props.data[4][0]}</Text>
            <Text style={styles.textStyle}>{this.props.data[4][1]}</Text>
            <Text
              style={
                this.props.data[5] === 1
                  ? { color: "#2020FF" }
                  : this.props.data[5] === 2
                    ? { color: "#4DFF4D" }
                    : { color: "red" }
              }
            >
              {this.props.data[5] === 1
                ? "Đặt chổ"
                : this.props.data[4] === 2 ? "Thanh toán" : "Hủy"}
            </Text>
          </Col>
        </Grid>
      </TouchableOpacity>
    );
  }
}
class FareCreation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionList: [["0", [{ name: "Giá vé" }], "Chọn giá vé theo sơ đồ ghế"]],
      groupSeat: []
    };
  }
  componentWillMount() {
    let group_seat_templates = this.props.group_seat_templates.data;
    let id = this.props.id;
    // console.log(this.props);
    group_seat_templates.forEach(item => {
      if (+item.resource_id === +id) {
        let temp = [item.id, item.detail, item.name, item.resource_id];
        this.state.optionList.push(temp);
      }
    });
    this.setState({
      optionList: this.state.optionList
    });
    console.log("=>", this.state.optionList);
  }
  back = () => {
    Actions.pop();
  };
  selectGroupSeat = value => {
    let groupSeat = [];
    if (value[0] !== "0") {
      groupSeat = JSON.parse(value[1]);
    } else {
      groupSeat = value[1];
    }
    this.setState({
      groupSeat: groupSeat
    });
  };
  renderGruopSeat = () => {
    let { groupSeat } = this.state;
    console.log("groupSeat=>", groupSeat);
    return groupSeat.map((item, index) => {
      return (
        <Tab heading={item.name} style={styles.tabHeader} key={index}>
          <View>
            <Grid
              style={{
                height: 40,
                backgroundColor: "#D9D9D9",
                flex: 0
              }}
            >
              <Col style={{ alignItems: "center", justifyContent: "center" }}>
                <Text>Chặng</Text>
              </Col>
              <Col style={{ alignItems: "center", justifyContent: "center" }}>
                <Text>{item.name}</Text>
              </Col>
            </Grid>

            <FlatList
              data={listData}
              keyExtractor={(item, index) => index}
              renderItem={({ item, index }) => {
                return <FlastListItem data={item} key={index} />;
              }}
            />
          </View>
        </Tab>
        // <View key={item.name}>
        //   <Grid
        //     style={{
        //       height: 40,
        //       backgroundColor: "#D9D9D9",
        //       flex: 0
        //     }}
        //   >
        //     <Col style={{ alignItems: "center", justifyContent: "center" }}>
        //       <Text>Chặng</Text>
        //     </Col>
        //     <Col style={{ alignItems: "center", justifyContent: "center" }}>
        //       <Text>{item.name}</Text>
        //     </Col>
        //   </Grid>

        //   <FlatList
        //     data={listData}
        //     keyExtractor={(item, index) => index}
        //     renderItem={({ item, index }) => {
        //       return <FlastListItem data={item} key={index} />;
        //     }}
        //   />
        // </View>
      );
    });
  };
  render() {
    let { optionList, groupSeat } = this.state;
    return (
      <Container style={{ backgroundColor: "#FFFFFF" }}>
        <Header style={styles.headerStyle}>
          <Left style={{ flex: 1 }}>
            <Button transparent onPress={this.back}>
              <Icon name="arrow-back" style={styles.headerTextStyle} />
            </Button>
          </Left>
          <Body style={{ flex: 4 }}>
            <Title style={styles.headerTextStyle}>BƯỚC 3/3: TẠO GIÁ BÁN</Title>
          </Body>
        </Header>
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <View style={{ width: "96%" }}>
              <MyDropdown
                data={optionList}
                onDropdownSelect={this.selectGroupSeat}
                defaultValue={{}}
              />
            </View>
          </View>
          <View style={{ marginTop: 45 }} />
          <View style={{ flex: 10 }}>
            {/* <ScrollableTabView
              style={{ marginTop: 20 }}
              initialPage={0}
              renderTabBar={() => <ScrollableTabBar />}
            >
              {groupSeat.length > 0 ? this.renderGruopSeat() : null}
              <View tabLabel="Giá ăn">
                <Grid
                  style={{
                    height: 40,
                    backgroundColor: "#D9D9D9",
                    flex: 0
                  }}
                >
                  <Col
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Text>Chặng</Text>
                  </Col>
                  <Col
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Text>Giá ăn</Text>
                  </Col>
                </Grid>

                <FlatList
                  data={listData}
                  keyExtractor={(item, index) => index}
                  renderItem={({ item, index }) => {
                    return <FlastListItem data={item} key={index} />;
                  }}
                />
              </View>
            </ScrollableTabView> */}
            <Tabs initialPage={0} style={{ backgroundColor: "#EFEFEF" }}>
              {this.renderGruopSeat()}
              <Tab heading="Giá ăn" style={styles.tabHeader}>
                <View>
                  <Grid
                    style={{
                      height: 40,
                      backgroundColor: "#D9D9D9",
                      flex: 0
                    }}
                  >
                    <Col
                      style={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <Text>Chặng</Text>
                    </Col>
                    <Col
                      style={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <Text>Giá ăn</Text>
                    </Col>
                  </Grid>

                  <FlatList
                    data={listData}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => {
                      return <FlastListItem data={item} key={index} />;
                    }}
                  />
                </View>
              </Tab>
            </Tabs>
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
                borderRadius: 6
              }}
              onPress={this.changeSeatOnline}
            >
              <Text>Hoàn tất</Text>
            </Button>
          </View>
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
  return {
    group_seat_templates: state.loginReducers.group_seat_templates
  };
};
export default connect(mapStateToProps, null)(FareCreation);
