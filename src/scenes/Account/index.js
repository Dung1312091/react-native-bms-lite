import React, { Component } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Actions } from "react-native-router-flux";
import {
  Container,
  Header,
  Title,
  Body,
  Content,
  Left,
  Right,
  Icon,
  List,
  ListItem,
  Button
} from "native-base";
import { deleteToken } from "../../utils/AsyncStorage";
const ACCESS_TOKEN = "access_token";
class Account extends Component {
  constructor() {
    super();
    this.state = {};
  }
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  logOut = () => {
    deleteToken(ACCESS_TOKEN);
    Actions.login();
  };
  back = () => {
    Actions.pop();
  };
  handleLogOut = () => {
    Alert.alert(
      "Đăng xuất",
      "Bạn có muốn đăng xuất không?",
      [
        { text: "Bỏ qua", onPress: () => {} },
        { text: "Đồng ý", onPress: () => this.logOut() }
      ],
      { cancelable: false }
    );
  };
  render() {
    return (
      <Container>
        <Header style={styles.headerStyle}>
          <Left style={{ flex: 1 }}>
            <Button transparent onPress={this.back}>
              <Icon name="arrow-back" style={styles.headerTextStyle} />
            </Button>
          </Left>
          <Body style={{ flex: 4 }}>
            <Title style={styles.headerTextStyle}>TÀI KHOẢN</Title>
          </Body>
        </Header>
        <Content style={{ backgroundColor: "#fff" }}>
          <List>
            <ListItem avatar button onPress={this.handleLogOut}>
              <Left>
                <Icon name="ios-contact" style={styles.iconStyle} />
              </Left>
              <Body>
                <Text>Đăng xuất</Text>
                <Text note style={styles.textNoteStyle}>
                  {this.props.userName}
                </Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Icon name="ios-cog" style={styles.iconStyle} />
              </Left>
              <Body>
                <Text>Đổi mật khẩu</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Icon
                  name="ios-information-circle-outline"
                  style={styles.iconStyle}
                />
              </Left>
              <Body>
                <Text>Quản lý quyền</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Icon name="md-git-branch" style={styles.iconStyle} />
              </Left>
              <Body>
                <Text>Quản lý tài khoản</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
const styles = {
  blockStyle: {
    flex: 1
  },
  headerStyle: {
    backgroundColor: "#1365af"
  },
  headerTextStyle: {
    color: "#fff"
  },
  labelStyle: {
    color: "#919191",
    marginRight: 5
  },
  tabHeader: {
    backgroundColor: "#fff",
    height: 50
  },
  textNoteStyle: {
    fontSize: 12,
    color: "#919191"
  },
  iconStyle: {
    fontSize: 32,
    width: 32,
    color: "#919191"
  },
  headerLeft: {
    flex: 1
  },
  headerBody: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  headerRight: {
    flex: 1
  }
};

export default Account;
