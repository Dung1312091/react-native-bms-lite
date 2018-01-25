import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Col } from "native-base";
import _ from "lodash";
class Seat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: ""
    };
  }
  handleClick = selectedIndex => {
    let existColor = this.state.selectedIndex;
    this.setState({
      selectedIndex: existColor === selectedIndex ? "" : selectedIndex
    });
  };

  render() {
    let item = this.props.item;
    let flags = false;
    if (this.state.selectedIndex === item._label) {
      flags = true;
    }
    if (!_.isEmpty(item)) {
      return (
        <Col style={styles.colStyle}>
          <Button
            style={[styles.seatStyle]}
            onPress={() => this.handleClick(item._label)}
          >
            <View style={flags ? styles.selectedSeat : null} />
            <Text style={{ position: "absolute", top: 10, left: 8 }}>
              {item._label}
            </Text>
          </Button>
        </Col>
      );
    } else {
      return <Col style={styles.colStyle} />;
    }
  }
}
const styles = StyleSheet.create({
  colStyle: {
    height: 40,
    margin: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  seatStyle: {
    width: 42,
    height: 42,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    borderRadius: 5,
    alignContent: "flex-end"
  },
  selectedSeat: {
    width: 20,
    height: 20,
    flexDirection: "row",
    borderBottomWidth: 10,
    borderBottomColor: "blue",
    borderRightWidth: 10,
    borderRightColor: "blue",
    borderTopWidth: 10,
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderLeftWidth: 10,
    borderRadius: 5,
    position: "absolute",
    top: 22
  }
});
export default Seat;
