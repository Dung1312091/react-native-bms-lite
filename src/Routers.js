import React, { Component } from "react";
import { Scene, Router, Stack } from "react-native-router-flux";
import CardStackStyleInterpolator from "react-navigation/src/views/CardStack/CardStackStyleInterpolator";
import Main from "./scenes/Main";
import Login from "./scenes/Login";
import RunAppScene from "./scenes/RunAppScene";
import SeatDiagram from "./scenes/SeatDiagram/";
class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <Stack
          key="root"
          transitionConfig={() => ({
            screenInterpolator: CardStackStyleInterpolator.forHorizontal
          })}
        >
          <Scene
            key="runapp"
            component={RunAppScene}
            initial
            hideNavBar="true"
          />
          <Scene key="login" component={Login} hideNavBar="true" />
          <Scene key="main" hideNavBar="true" component={Main}>
            {/* <Scene key="MainScene" component={Main} /> */}
          </Scene>
          <Scene key="seatDiagram" component={SeatDiagram} hideNavBar="true" />
        </Stack>
      </Router>
    );
  }
}
export default RouterComponent;
