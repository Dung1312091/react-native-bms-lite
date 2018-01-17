import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { StyleSheet, View, Image } from "react-native";
import { Spinner } from "native-base";
import { Authentication } from "./Login/action";
// import { deleteToken } from "../utils/AsyncStorage";
// const ACCESS_TOKEN = "access_token";
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0B65B0",
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  logoCompany: {
    flex: 0.5,
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "center"
  }
});

class RunAppScene extends Component {
  componentWillMount() {
    let date = this.props.dayReducers;
    this.props.Authentication(date);
    // deleteToken(ACCESS_TOKEN);
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.loginReducers.isAuthentication) {
      Actions.login();
    } else {
      Actions.main();
    }
  }
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoCompany}>
          <Image
            style={{ width: 263, height: 59 }}
            source={require("../images/logo.png")}
          />
        </View>
        <Spinner color="red" />
      </View>
    );
  }
}
RunAppScene.propTypes = {
  dayReducers: PropTypes.any,
  loginReducers: PropTypes.any,
  Authentication: PropTypes.any
};
const mapStateToProps = state => {
  return {
    loginReducers: state.loginReducers,
    dayReducers: state.getDayReducers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    Authentication: date => {
      dispatch(Authentication(date));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RunAppScene);
