import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Col } from "native-base";
import _ from "lodash";
class Seat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: "",
      selected: false
    };
  }
  handleClick = item => {
    if (item._isPaymentStatus === null) {
      this.setState({ selected: !this.state.selected }, () => {
        if (this.state.selected) {
          this.props.selectSeat(item, true);
        } else {
          this.props.unSelectSeat(item);
        }
      });
    }
  };
  componentWillMount() {
    if (this.props.item._isOnline) {
      this.setState({
        selected: true
      });
      this.props.selectSeat(this.props.item, false);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState !== this.state) {
      return true;
    }
    return false;
  }
  render() {
    let item = this.props.item;
    if (!_.isEmpty(item)) {
      return (
        <Col style={styles.colStyle}>
          <Button
            style={[
              styles.seatStyle,
              item._isPaymentStatus === 1
                ? { backgroundColor: "#FAACD2" }
                : item._isPaymentStatus === 2
                  ? {
                      backgroundColor: "#FAF87C"
                    }
                  : null
            ]}
            onPress={() => this.handleClick(item)}
          >
            <View style={this.state.selected ? styles.selectedSeat : null} />
            <Text>{item._label}</Text>
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
    margin: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  seatStyle: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 5
    // alignContent: "flex-end"
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
    top: 22,
    left: 22
  }
});
export default Seat;
