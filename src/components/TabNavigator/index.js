import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image } from "react-native";
import TabNavigator from "react-native-tab-navigator";
class TabNavigatorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: this.props.selectedTab
    };
  }
  render() {
    const { TabList } = this.props;
    const getComp = (component, props) => {
      const Comp = component;
      return <Comp {...props} />;
    };
    return (
      <TabNavigator>
        {TabList.map((item, index) => {
          return (
            <TabNavigator.Item
              title={item.title}
              renderIcon={() => <Image source={item.img} />}
              badgeText={item.badgeText ? item.badgeText : ""}
              onPress={() => this.setState({ selectedTab: item.tabName })}
              selected={this.state.selectedTab === item.tabName}
              key={index}
            >
              {getComp(item.component)}
            </TabNavigator.Item>
          );
        })}
      </TabNavigator>
    );
  }
}
TabNavigatorComponent.propTypes = {
  selectedTab: PropTypes.any,
  TabList: PropTypes.any
};
export default TabNavigatorComponent;
