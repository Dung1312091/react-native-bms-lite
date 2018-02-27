import React, { Component } from "react";
import { Text, View } from "react-native";
import { CheckBox } from "native-base";
// import { connect } from "react-redux";
class VXRCheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true
    };
  }
  render() {
    let { lable } = this.props;
    let { checked } = this.state;
    return (
      <View style={{ flexDirection: "row" }}>
        <CheckBox checked={this.props.checked} />
        <Text style={{ marginLeft: 12 }}>{lable}</Text>
      </View>
    );
  }
}

export default VXRCheckBox;
