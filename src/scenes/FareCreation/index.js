import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  findNodeHandle,
  Alert
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
  Col,
  CheckBox,
  ScrollableTab
} from "native-base";
import MyDropdown from "../../components/myDropDown";
import { Actions } from "react-native-router-flux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Loading from "../../components/Loading";
import ScrollableTabView, {
  ScrollableTabBar
} from "react-native-scrollable-tab-view";
import { connect } from "react-redux";
import moment from "moment";
import _ from "lodash";
import { addTrip } from "./action";
// const optionList = [
//   ["0", "", "Chọn giá vé theo sơ đồ ghế"],
//   ["1", "", "Thứ trong tuần"]
// ];
class FlastListItem extends Component {
  constructor(props) {
    super(props);
    this._scrollToInput = this._scrollToInput.bind(this);
  }
  selectWay = data => {
    this.props.selectWay(data);
  };
  changeText = (text, data) => {
    this.props.changeText(text, data);
  };
  _scrollToInput(reactNode) {
    // console.warn(this.props.scroll);
    this.props.scroll.scrollToFocusedInput(reactNode);
  }
  render() {
    //console.warn("===item==>", this.props.data);
    return (
      <Grid
        style={{
          flex: 0,
          justifyContent: "center",
          backgroundColor: "#fff",
          borderBottomColor: "#E1E1E1",
          borderBottomWidth: 1,
          padding: 5
        }}
      >
        <Col
          style={{
            justifyContent: "center",
            width: "65%"
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ justifyContent: "center" }}>
              <CheckBox
                checked={this.props.data.checked}
                onPress={() => this.selectWay(this.props.data)}
              />
            </View>
            <Text style={[styles.textStyle, { marginLeft: 20 }]}>
              {this.props.data.stageName}
            </Text>
          </View>
        </Col>
        <Col
          style={{
            justifyContent: "center",
            width: "35%",
            alignItems: "center",
            flexDirection: "row"
          }}
        >
          <View style={{ width: "90%", marginLeft: 10 }}>
            <TextInput
              onFocus={event => {
                this._scrollToInput(findNodeHandle(event.target));
                // this.props.hideButton();
              }}
              placeholder="0"
              underlineColorAndroid="transparent"
              style={{
                textAlign: "right"
              }}
              keyboardType="numeric"
              value={this.props.data.inputValue}
              onChangeText={text => this.changeText(text, this.props.data)}
            />
          </View>
          <View style={{ width: "10%" }}>
            <Text>đ</Text>
          </View>
        </Col>
      </Grid>
    );
  }
}
class FareCreation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionList: [
        [
          "0",
          [{ name: "Giá vé" }, { name: "Giá ăn" }],
          "Chọn giá vé theo sơ đồ ghế"
        ]
      ],
      groupSeat: [{ name: "Giá vé" }, { name: "Giá ăn" }],
      listFromArea_toArea: [],
      listDataFromArea_toArea: [],
      page: 0,
      tabActive: null,
      idGroupSeat: 0
    };
  }
  formatData = groupSeat => {
    let { listFromArea_toArea } = this.state;
    let data = [];
    groupSeat.forEach((gr, indexGr) => {
      listFromArea_toArea.forEach((item, index) => {
        let temp = Object.assign({}, item, {
          id: `${indexGr}_${index}`,
          checked: false,
          groupSeatTemplates: gr.name,
          inputValue: "0",
          stopPoint: `${item.fromId}-${item.toId}`
        });
        data.push(temp);
      });
    });
    console.log("data=>", data);
    this.setState({
      listDataFromArea_toArea: data
    });
  };
  componentWillMount() {
    console.log("hi-->");
    let group_seat_templates = this.props.group_seat_templates.data;
    let { fromArea_toArea, routeId } = this.props;
    let fromA_toA = fromArea_toArea.filter(item => +item.id === +routeId);
    let id = this.props.id;
    // console.log("===>", this.props);
    // console.warn("group_seat_templates", fromA_toA[0].routes.length);
    group_seat_templates.forEach(item => {
      if (+item.resource_id === +id) {
        let temp = [item.id, item.detail, item.name, item.resource_id];
        this.state.optionList.push(temp);
      }
    });
    this.setState(
      {
        optionList: this.state.optionList,
        listFromArea_toArea: fromA_toA[0].routes,
        tabActive: this.state.groupSeat[0].name
      },
      () => {
        this.formatData(this.state.groupSeat);
      }
    );
    // console.log("optionList=>", fromA_toA[0].routes);
  }
  goMain = () => {
    Actions.main();
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoading) {
      // Alert.alert("Thêm chuyến thành công");
      Alert.alert(
        "",
        "Thêm chuyến thành công",
        [{ text: "OK", onPress: () => this.goMain() }],
        { cancelable: false }
      );
    }
  }
  back = () => {
    Actions.pop();
  };
  selectGroupSeat = id => {
    // console.log("id=>", id);
    let groupSeat = [];
    let groupSeatTmp = this.state.optionList.filter(item => +item[0] === +id);

    // console.log("groupSeat123=>", groupSeat);
    if (+id !== 0) {
      groupSeat = JSON.parse(groupSeatTmp[0][1]);
      console.log("groupSeat=>", groupSeat);
      groupSeat.push({ name: "Giá ăn" });
      this.setState(
        {
          groupSeat: groupSeat,
          page: 0,
          tabActive: groupSeat[0].name,
          idGroupSeat: id
        },
        () => {
          this.formatData(this.state.groupSeat);
        }
      );
    } else {
      // console.log("groupSeat12356=>", groupSeatTmp);
      groupSeat = groupSeatTmp[0][1];
      this.setState(
        {
          groupSeat: groupSeat,
          page: 0,
          tabActive: groupSeat[0].name,
          idGroupSeat: id
        },
        () => {
          this.formatData(this.state.groupSeat);
        }
      );
    }

    // console.log("groupSeat=>", groupSeat);
  };
  changeTab = (i, ref, from) => {
    this.setState({
      page: i,
      tabActive: ref.props.heading
    });
  };
  // indexChange = index => {
  //   console.warn("index=>", index);
  // };
  selectWay = data => {
    let index = this.state.listDataFromArea_toArea.findIndex(
      cb => cb.id === data.id
    );
    this.state.listDataFromArea_toArea[index].checked = !this.state
      .listDataFromArea_toArea[index].checked;
    this.setState({
      listDataFromArea_toArea: this.state.listDataFromArea_toArea
    });
  };
  changeText = (text, data) => {
    let index = this.state.listDataFromArea_toArea.findIndex(
      cb => cb.id === data.id
    );
    this.state.listDataFromArea_toArea[index].inputValue = text;
    this.setState({
      listDataFromArea_toArea: this.state.listDataFromArea_toArea
    });
  };
  buildInfo = (listSeat, coach) => {
    const lenght = listSeat.length;
    let result = `${coach}~${lenght}`;
    listSeat.forEach(item => {
      result += `~${item._label}|${item._coach}|${item._row}|${item._col}|${
        item._seatDiagramId
      }`;
    });
    return result;
  };
  // buildStopPoints = () => {
  //   let value = "";
  //   let fareInfo = "1";
  //   console.warn("--->", this.state.listDataFromArea_toArea);
  //   let { listDataFromArea_toArea } = this.state;
  //   let length = listDataFromArea_toArea.length;
  //   listDataFromArea_toArea.forEach((item, index) => {
  //     if (item.checked) {
  //       value += `${item.fromId}-${item.toId}|`;
  //       if (this.state.idGroupSeat === 0) {
  //         if (item.groupSeatTemplates === "Giá vé")
  //           fareInfo += `~${item.fromId}|${item.toId}|${item.inputValue}|đ||`;
  //       } else {

  //         let groupListWithStopPoint = _.groupBy(listDataFromArea_toArea, function(b) {
  //           return b.stopPoint;
  //         });
  //         groupListWithStopPoint.forEach((item,index)=> {

  //         })
  //       }
  //     }
  //   });
  //   // let result = value.slice(value.length - 1, 1);
  //   return {
  //     stop_points: value.slice(0, value.length - 1),
  //     fare_info: fareInfo
  //   };
  // };

  buildStopPoints = () => {
    let stop_points = "";
    let fareInfo = "1";
    let meal_info = "";
    let { listDataFromArea_toArea, idGroupSeat } = this.state;
    let groupListWithStopPoint = _.groupBy(listDataFromArea_toArea, function(
      b
    ) {
      return b.stopPoint;
    });
    if (idGroupSeat === 0) {
      console.warn("do");
      listDataFromArea_toArea.forEach(item => {
        if (item.groupSeatTemplates === "Giá vé") {
          fareInfo += `~${item.fromId}|${item.toId}|${item.inputValue}|đ||`;
          stop_points += `${item.stopPoint}|`;
        } else {
          meal_info += `1~${item.fromId}|${item.toId}|${item.inputValue}|đ||`;
        }
      });
      meal_info += "0|";
    } else {
      Object.keys(groupListWithStopPoint).forEach(function(key) {
        let minFare = groupListWithStopPoint[key].sort((a, b) => {
          if (+a.inputValue > +b.inputValue) return 1;
          if (+a.inputValue < +b.inputValue) return -1;
          return 0;
        });
        fareInfo += `~${minFare[0].fromId}|${minFare[0].toId}|${
          minFare[0].inputValue
        }|đ|`;
        let flag = true;
        groupListWithStopPoint[key].forEach(items => {
          if (items.groupSeatTemplates !== "Giá ăn") {
            fareInfo += `|${items.groupSeatTemplates}:${items.inputValue}`;
          } else {
            meal_info += `1~${items.fromId}|${items.toId}|${
              items.inputValue
            }|đ||`;
          }
          if (items.checked && flag) {
            stop_points += `${items.stopPoint}|`;
            flag = false;
          }
        });
      });
      meal_info += "0|";
    }

    return {
      stop_points: stop_points,
      fare_info: fareInfo,
      meal_info: meal_info
    };
  };

  changeSeatOnline = () => {
    let {
      listSeat,
      other_config,
      date_of_week_value,
      date_of_week
    } = this.props;
    let buildStopPoints = this.buildStopPoints();
    console.log("buildStopPoints==>", buildStopPoints);
    let config = {
      compId: other_config.company_id,
      date_of_week: date_of_week,
      date_of_week_value: date_of_week_value,
      from_date: moment(other_config.from_date, "YYYY-MM-DD").format(
        "DD-MM-YYYY"
      ),
      info: this.buildInfo(listSeat, this.props.coach),
      is_priority: this.props.is_priority,
      is_renew: other_config.is_renew,
      name: "",
      renew_value: other_config.renew_value,
      note: "",
      status: 1,
      stop_points: buildStopPoints.stop_points,
      time_limit: this.props.time_limit,
      times: this.props.listTime,
      to_date: moment(other_config.to_date, "YYYY-MM-DD").format("DD-MM-YYYY"),
      trip_id: other_config.trip_id,
      type: 2
    };
    let fare_configs = {
      apply_for: 0,
      date_of_week: date_of_week,
      date_of_week_value: date_of_week_value,
      end_date: other_config.to_date,
      fare_info: buildStopPoints.fare_info,
      is_priority: this.props.is_priority,
      is_renew: other_config.is_renew,
      meal_info: buildStopPoints.meal_info,
      name: "BMS Lite RN",
      renew_value: other_config.renew_value,
      start_date: other_config.from_date,
      status: 1,
      times: this.props.listTime,
      trip_id: other_config.trip_id
    };
    this.props.addTrip(config, other_config, fare_configs);
  };
  renderListArea = data => {
    let groupSeatActive = data.filter(
      item => item.groupSeatTemplates === this.state.tabActive
    );
    return groupSeatActive.map((item, index) => {
      return (
        <FlastListItem
          data={item}
          selectWay={this.selectWay}
          key={index}
          changeText={this.changeText}
          scroll={this.scroll}
          // hideButton={this.togleButton}
        />
      );
    });
  };
  renderGruopSeat = () => {
    let { groupSeat, tabActive } = this.state;
    return groupSeat.map((item, index) => {
      return (
        <Tab
          heading={item.name}
          key={index}
          tabStyle={{ backgroundColor: "#EFEFEF" }}
        >
          <View style={{ marginBottom: 40 }}>
            <Grid
              style={{
                height: 40,
                backgroundColor: "#D9D9D9",
                flex: 0
              }}
            >
              <Col
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: "65%"
                }}
              >
                <Text>Chặng</Text>
              </Col>
              <Col
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: "35%"
                }}
              >
                <Text>{item.name}</Text>
              </Col>
            </Grid>

            {/* <FlatList
              data={this.state.listDataFromArea_toArea}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => {
                return <FlastListItem data={item} selectWay={this.selectWay} />;
              }}
            /> */}
            <ScrollView>
              <KeyboardAwareScrollView
                ref={ref => {
                  this.scroll = ref;
                }}
              >
                <View>
                  {this.renderListArea(this.state.listDataFromArea_toArea)}
                </View>
              </KeyboardAwareScrollView>
            </ScrollView>
          </View>
        </Tab>
      );
    });
  };
  render() {
    let { optionList, groupSeat } = this.state;
    // console.warn("isLoading", this.props.isLoading);
    let { isLoading } = this.props;
    let animateLoading = isLoading ? <Loading color="#ffffff" /> : null;
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
          {animateLoading}
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
            <Tabs
              renderTabBar={() => <ScrollableTab />}
              style={{ backgroundColor: "#EFEFEF" }}
              initialPage={0}
              page={this.state.page}
              onChangeTab={({ i, ref, from }) => this.changeTab(i, ref, from)}
              // onIndexChange={index => this.indexChange(index)}
            >
              {this.renderGruopSeat()}
            </Tabs>
          </View>
          <View
            style={[
              {
                width: "100%",

                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                flex: 1
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
    group_seat_templates: state.loginReducers.group_seat_templates,
    fromArea_toArea: state.loginReducers.fromArea_toArea,
    routeId: state.changeRouteReducer.route_id,
    isLoading: state.addTripReducer.isLoading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addTrip: (config, other_config, fare_configs) => {
      dispatch(addTrip(config, other_config, fare_configs));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FareCreation);
