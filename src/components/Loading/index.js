import React, { Component } from "react";
import Spinner from "react-native-spinkit";
import { StyleSheet, View } from "react-native";
class Loading extends Component {
  render() {
    return (
      <View style={styles.overlay}>
        <Spinner isVisible={true} type="Circle" color={this.props.color} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    opacity: 0.7,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    height: "100%",
    zIndex: 100,
    alignItems: "center",
    justifyContent: "center"
  }
});
export default Loading;
