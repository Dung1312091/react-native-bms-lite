// eslint-disable-line require
import React, { Component } from "react";
import PropTypes from "prop-types";
// import Spinner from "react-native-spinkit";
import Loading from "../../components/Loading";
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity
} from "react-native";
import { Container } from "native-base";
import { LoginAction } from "./action";
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0B65B0",
    flex: 1
  },
  logoCompany: {
    flex: 0.5,
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "center"
  },
  loginErr: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: '#BAD2E8',
    height: 46,
    marginBottom: 27
  },
  inputSearch: {
    height: 46,
    width: 281
  },
  SectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  inputLogin: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 3,
    width: 296,
    height: 46
  },
  ImageStyle: {
    padding: 10,
    margin: 16,
    marginLeft: 36,
    height: 15,
    width: 11,
    resizeMode: "stretch",
    alignItems: "center"
  },
  Login: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#F8BB10",
    borderRadius: 5,
    width: 296,
    height: 46
  },
  textLoginErr: {
    backgroundColor: "#BAD2E8"
  },
  isLoading: {
    flex: 1,
    // backgroundColor:'red',
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.3
  },
  opancityLoading: {
    display: "none"
  }
});
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animate: false,
      username: "",
      password: "",
      loginFail: false,
      isLoading: false
      // run: true
    };
  }
  Login = () => {
    var { username, password } = this.state;
    var date = this.props.isDate;
    this.props.onLogin({
      username,
      password,
      date
    });
    this.setState({
      animate: true,
      isLoading: true
    });
  };
  componentWillReceiveProps(nextProps) {
    if (!nextProps.responeLogin.isAuthentication) {
      this.setState({
        loginFail: true,
        isLoading: false
      });
    } else {
      this.setState({
        loginFail: false,
        isLoading: false
      });
    }
  }
  render() {
    let { username, password, loginFail, isLoading } = this.state;
    let loginErr = loginFail ? (
      <Text style={{ color: "red" }}>
        Tài khoản chỉ gồm các ký tự 0-9, aA-zZ
      </Text>
    ) : null;
    let animateLoading = isLoading ? <Loading color="#ffffff" /> : null;
    return (
      <Container>
        <View style={styles.container}>
          {animateLoading}
          <View style={styles.logoCompany}>
            <Image
              style={{ width: 263, height: 59 }}
              source={require("../../images/logo.png")}
            />
          </View>
          <View
            style={[
              styles.loginErr,
              loginFail ? { backgroundColor: "#BAD2E8" } : {}
            ]}
          >
            {loginErr}
          </View>
          <View>
            <View style={styles.SectionStyle}>
              <View style={styles.inputLogin}>
                <Image
                  source={require("../../images/user.png")}
                  style={styles.ImageStyle}
                />
                <TextInput
                  style={styles.inputSearch}
                  placeholder="Tài khoản"
                  underlineColorAndroid="transparent"
                  keyboardType="email-address"
                  name="username"
                  value={username}
                  onChangeText={text => this.setState({ username: text })}
                />
              </View>
            </View>
            <View style={styles.SectionStyle}>
              <View style={styles.inputLogin}>
                <Image
                  source={require("../../images/pass.png")}
                  style={styles.ImageStyle}
                />
                <TextInput
                  style={styles.inputSearch}
                  placeholder="Mật khẩu"
                  underlineColorAndroid="transparent"
                  secureTextEntry={true}
                  name="password"
                  value={password}
                  onChangeText={text => this.setState({ password: text })}
                />
              </View>
            </View>
            <View style={styles.SectionStyle}>
              <TouchableOpacity style={styles.Login} onPress={this.Login}>
                <Text>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
            {/* {loading} */}
          </View>
        </View>
      </Container>
    );
  }
}
Login.propTypes = {
  isDate: PropTypes.any,
  selectDay: PropTypes.any,
  onLogin: PropTypes.any,
  getTrips: PropTypes.any,
  responeLogin: PropTypes.any
};
const mapStateToProps = state => {
  return {
    responeLogin: state.loginReducers,
    isDate: state.getDayReducers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: account => {
      dispatch(LoginAction(account));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
