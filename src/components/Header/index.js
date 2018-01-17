import React, { Component } from "react";
import { Header, Left, Right, Button, Icon, Title, Body } from "native-base";
class HeaderComponent extends Component {
  render() {
    return (
      <Header>
        <Left>
          <Button transparent>
            <Icon name="md-add" />
          </Button>
        </Left>
        <Body>
          <Title>Lịch bán vé</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name="ios-more-outline" />
          </Button>
        </Right>
      </Header>
    );
  }
}
export default HeaderComponent;
