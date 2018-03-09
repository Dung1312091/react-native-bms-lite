import React, { Component } from "react";
import { Scene, Router, Stack } from "react-native-router-flux";
import CardStackStyleInterpolator from "react-navigation/src/views/CardStack/CardStackStyleInterpolator";
import Main from "./scenes/Main";
import Login from "./scenes/Login";
import RunAppScene from "./scenes/RunAppScene";
import SeatDiagram from "./scenes/SeatDiagram/";
import AddTrip from "./scenes/AddTrip";
import AddNewTrip from "./scenes/AddNewTrip";
import AddNewTripStepTow from "./scenes/AddNewTripStepTow";
import FareCreation from "./scenes/FareCreation";
import Account from "./scenes/Account";
import CancelTrip from "./scenes/CancelTrip";
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
          <Scene key="addTrip" component={AddTrip} hideNavBar="true" />
          <Scene key="addNewTrip" component={AddNewTrip} hideNavBar="true" />
          <Scene
            key="addNewTripStepTow"
            component={AddNewTripStepTow}
            hideNavBar="true"
            // initial
          />
          <Scene
            key="fareCreation"
            component={FareCreation}
            hideNavBar="true"
            // initial
          />
          <Scene
            key="account"
            component={Account}
            hideNavBar="true"
            // initial
          />
          <Scene
            key="cancelTrip"
            component={CancelTrip}
            hideNavBar="true"
            // initial
          />
        </Stack>
      </Router>
    );
  }
}
export default RouterComponent;
