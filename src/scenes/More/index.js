import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
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

class More extends Component {
  constructor() {
    super();
    this.state = {
      userName: ""
    };
  }
  componentWillMount() {
    this.setState({
      userName: this.props.userInfo.Username
    });
  }
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  acCountInfo = () => {
    Actions.account({ userName: this.state.userName });
  };
  render() {
    let { userInfo } = this.props;
    return (
      <Container>
        <Header style={{ alignItems: "center" }}>
          <Body style={styles.headerBody}>
            <Title>FUTA BUS LITE</Title>
          </Body>
        </Header>
        <Content style={{ backgroundColor: "#fff" }}>
          <List>
            <TouchableOpacity>
              <ListItem avatar button onPress={this.acCountInfo}>
                <Left>
                  <Icon name="ios-contact" style={styles.iconStyle} />
                </Left>
                <Body>
                  <Text>Thông tin tài khoản</Text>
                  <Text note style={styles.textNoteStyle}>
                    {this.state.userName}
                  </Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            </TouchableOpacity>
            <ListItem avatar>
              <Left>
                <Icon name="ios-cog" style={styles.iconStyle} />
              </Left>
              <Body>
                <Text>Cài đặt thanh toán tại nhà xe</Text>
                <Text note style={styles.textNoteStyle}>
                  Thay đổi các điều kiện thanh toán tại nhà xe
                </Text>
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
                <Text>Thông tin nhà xe</Text>
                <Text note style={styles.textNoteStyle}>
                  Cấu hình ...
                </Text>
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
                <Text>Quản lý tuyến đường</Text>
                <Text note style={styles.textNoteStyle}>
                  Cấu hình ...
                </Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Icon name="ios-bus-outline" style={styles.iconStyle} />
              </Left>
              <Body>
                <Text>Quản lý loại xe (Sơ đồ ghế)</Text>
                <Text note style={styles.textNoteStyle}>
                  Cấu hình ...
                </Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Icon name="ios-apps" style={styles.iconStyle} />
              </Left>
              <Body>
                <Text>Quản lý nhóm ghế</Text>
                <Text note style={styles.textNoteStyle}>
                  Cấu hình ...
                </Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Icon name="ios-pricetags-outline" style={styles.iconStyle} />
              </Left>
              <Body>
                <Text>Chương trình giảm giá</Text>
                <Text note style={styles.textNoteStyle}>
                  Cấu hình ...
                </Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Icon
                  name="ios-color-filter-outline"
                  style={styles.iconStyle}
                />
              </Left>
              <Body>
                <Text>Quản lý chi nhánh, đại lý</Text>
                <Text note style={styles.textNoteStyle}>
                  Cấu hình ...
                </Text>
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
const mapStateToProps = state => {
  return {
    userInfo: state.loginReducers.user.data
  };
};
export default connect(mapStateToProps, null)(More);
