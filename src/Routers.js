import React, { Component } from "react";
import { Scene, Router, Stack } from "react-native-router-flux";
import Main from "./scenes/Main";
import Login from "./scenes/Login";
import RunAppScene from "./scenes/RunAppScene";
import TripDetail from './scenes//TripDetail/';
class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <Stack key="root" >
          <Scene key="runapp" component={RunAppScene} initial hideNavBar="true"/>
          <Scene key="login" component={Login} hideNavBar="true"/>
          <Scene key="main" hideNavBar="true" component={Main}>
            {/* <Scene key="MainScene" component={Main} /> */}
          </Scene>
           <Scene key="tripdetail" component={TripDetail} hideNavBar="true"/>
        </Stack>
      </Router>
    );
  }
}
export default RouterComponent;
