import React, { Component } from "react";
import listTabar from "../constants/listTabar";
import TabNavigator from "../components/TabNavigator/index";
class Main extends Component {
  render() {
    return <TabNavigator TabList={listTabar} selectedTab="ticketSchedule" />;
  }
}
export default Main;
