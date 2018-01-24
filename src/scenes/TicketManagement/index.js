import React from "react";
import PropTypes from "prop-types";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import _ from "lodash";
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
  Col
} from "native-base";
class TicketManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  setUpAllDataToRender = routeData => {
    let result = [];
    let floor_1 = [];
    let floor_2 = [];
    let rowFloor_1 = 0;
    let rowFloor_2 = 0;
    let colFloor_1 = 0;
    let colFloor_2 = 0;
    let listRoute = routeData;
    let seatDiagram = listRoute[6].split("~");
    let infor = seatDiagram[1].split("|");
    let coach = infor[1]; //so tang
    let startIndex = 6;
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
    for (let i = startIndex; i < seatDiagram.length; i++) {
      let item = seatDiagram[i].split("|");
      const itemCoach = +item[5];
      const itemRow = +item[6];
      const itemCol = +item[7];
      tmpSeats.push({
        _label: item[4] || "",
        _coach: itemCoach,
        _row: itemRow,
        _col: itemCol
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
          if (items.length > 0) {
            result[c - 1][a - 1][b - 1] = {
              _label: items[0]._label,
              _coach: c,
              _row: a,
              _col: b
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
    let data = this.setUpAllDataToRender(this.props.changeRouteReducers.value);
    this.setState({
      data: data
    });
    console.log("floor_1=>", data);
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.changeRouteReducers.value !==
      nextProps.changeRouteReducers.value
    ) {
      let data = this.setUpAllDataToRender(nextProps.changeRouteReducers.value);
      this.setState({
        data: data
      });
    }
  }
  renderSeat = seatNumber => {
    return seatNumber.map((item, index) => {
      if (_.isEmpty(item)) {
        return (
          <Col
            key={index}
            style={{
              height: 40,
              margin: 10,
              // borderBottomWidth: 1,
              // borderColor: "#d9d8dc",
              justifyContent: "center",
              alignItems: "center"
            }}
          />
        );
      } else {
        return (
          <Col
            key={index}
            style={{
              height: 40,
              margin: 10,
              // borderBottomWidth: 1,
              // borderColor: "#d9d8dc",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              style={{
                width: 42,
                height: 42,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "red",
                borderRadius: 5
              }}
            >
              <Text>{item._label}</Text>
            </TouchableOpacity>
          </Col>
        );
      }
    });
  };
  renderSeatMap = arr => {
    return arr.map((item, index) => {
      // console.log("item=>", item);
      return (
        <Grid key={index} style={{ flex: 1, backgroundColor: "#EFEFEF" }}>
          {this.renderSeat(item)}
        </Grid>
      );
    });
  };
  render() {
    // console.log("==>", this.state.data.get("route"));
    let { data } = this.state;
    return (
      <Container style={{ backgroundColor: "#EFEFEF" }}>
        <Header style={styles.headerStyle}>
          <Left>
            <Button transparent>
              <Icon name="arrow-back" style={styles.headerTextStyle} />
            </Button>
          </Left>
          <Body>
            <Title style={styles.headerTextStyle}>
              CHUYẾN 14:30 12/12/2017
            </Title>
          </Body>
        </Header>

        <View style={{ alignItems: "center" }}>
          <Text>THAY ĐỔI CHỖ BÁN ONLINE</Text>
        </View>
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
  }
});
TicketManagement.propTypes = {
  changeRouteReducers: PropTypes.any
};
const mapStateToProps = state => {
  return {
    changeRouteReducers: state.changeRouteReducer
  };
};
// const mapDispatchToProps = dispatch => {
//   return {
//     getConfigurationOverview: params => {
//       dispatch(getConfigurationOverview(params));
//     }
//   };

export default connect(mapStateToProps, null)(TicketManagement);
