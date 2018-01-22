import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import {
  Container,
  Body,
  Title,
  Left,
  Button,
  Icon,
  Header,
  Content,
  Tabs,
  Tab,
  Grid,
  Col
} from "native-base";
class TripDetail extends React.Component {
  renderSeat = seatNumber => {
    return seatNumber.map((item, index) => {
      return (
        <Col
          key={index}
          style={{
            height: 40,
            margin: 10,
            borderBottomWidth: 1,
            borderColor: "#d9d8dc",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            style={{
              width: 42,
              height: 42,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "red",
              borderRadius: 5
            }}
          >
            <Text>aaaaa</Text>
          </TouchableOpacity>
        </Col>
      );
    });
  };
  renderSeatMap = arr => {
    return arr.map((item, index) => {
      return (
        <Grid key={index} style={{ flex: 1, backgroundColor: "#EFEFEF" }}>
          {this.renderSeat(["1", "2", "3", "4", "5"])}
        </Grid>
      );
    });
  };
  render() {
    return (
      <Container style={{ backgroundColor: "#EFEFEF" }}>
        <Header style={styles.headerStyle}>
          <Left>
            <Button transparent>
              <Icon name="arrow-back" style={styles.headerTextStyle} />
            </Button>
          </Left>
          <Body>
            <Title style={styles.headerTextStyle}>
              CHUYẾN 14:30 12/12/2017
            </Title>
          </Body>
        </Header>

        <View style={{ alignItems: "center" }}>
          <Text>THAY ĐỔI CHỖ BÁN ONLINE</Text>
        </View>
        <Tabs initialPage={0} style={{ backgroundColor: "#EFEFEF" }}>
          <Tab heading="Tầng 1" style={styles.tabHeader}>
            <Content
              style={{
                marginLeft: 50,
                marginRight: 50,
                backgroundColor: "#EFEFEF"
              }}
            >
              {this.renderSeatMap([
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "6",
                "7",
                "8"
              ])}
            </Content>
          </Tab>
          <Tab heading="Tầng 2" style={styles.tabHeader}>
            <Content style={{ marginLeft: 50, marginRight: 50 }}>
              {this.renderSeatMap(["1", "2", "3", "4", "5", "6"])}
            </Content>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
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
  },
  tabHeader: {
    height: 50,
    backgroundColor: "#EFEFEF"
  }
});
export default TripDetail;
