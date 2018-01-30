import React, { Component } from "react";
import { View, Text } from "react-native";
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
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Header>
          <Left style={styles.headerLeft}>
            <Button transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={styles.headerBody}>
            <Title>FUTA BUSLINE</Title>
          </Body>
          <Right style={styles.headerRight}>
            <Button transparent>
              <Icon name="ios-more-outline" />
            </Button>
          </Right>
        </Header>
        <Content style={{ backgroundColor: "#fff" }}>
          <List>
            <ListItem avatar>
              <Left>
                <Icon name="ios-contact" style={styles.iconStyle} />
              </Left>
              <Body>
                <Text>Thông tin tài khoản</Text>
                <Text note style={styles.textNoteStyle}>
                  hungle.saoviet
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

export default More;
