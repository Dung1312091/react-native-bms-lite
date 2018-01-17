import React, { Component } from "react";
import { Scene, Router, Stack } from "react-native-router-flux";
import Main from "./scenes/Main";
import Login from "./scenes/Login";
import RunAppScene from "./scenes/RunAppScene";
class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <Stack key="root" hideNavBar="true">
          <Scene key="runapp" component={RunAppScene} initial />
          <Scene key="login" component={Login} />
          <Scene key="main" hideNavBar="true" component={Main}>
            {/* <Scene key="MainScene" component={Main} /> */}
          </Scene>
        </Stack>
      </Router>
    );
  }
}
export default RouterComponent;
