import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import {
  Container,
  Header,
  Left,
  Right,
  Grid,
  Col,
  Body,
  Title
} from "native-base";
// import { Dropdown } from 'react-native-material-dropdown';
import MyDropdown from "../../components/myDropDown";
import DatePicker from "../../components/DatePicker";
const listData = [
  ["1", "VH2S927", "320000", ["320000", "10"], "320000"],
  ["2", "VH2S927", "500000", ["500000", "20"], "500000"],
  ["3", "VH2S927", "300000", ["300000", "15"], "300000"],
  ["4", "VH2S927", "320000", ["320000", "10"], "320000"],
  ["5", "VH2S927", "320000", ["320000", "10"], "320000"],
  ["6", "VH2S927", "320000", ["320000", "10"], "320000"],
  ["7", "VH2S927", "320000", ["320000", "10"]],
  ["8", "VH2S927", "320000", ["320000", "10"], "320000"],
  ["9", "VH2S927", "320000", ["320000", "10"], "320000"],
  ["10", "VH2S927", "320000", ["320000", "10"]]
];
class Report extends Component {
  constructor() {
    super();
    this.state = {};
  }
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  renderHeader = () => {
    const arrHeader = ["STT", "Mã vé", "Tiền vé", "Chiết khấu", "Vexere thu"];
    return arrHeader.map((item, index) => {
      return (
        <Col style={styles.colStyle} key={index}>
          <Text>{item}</Text>
        </Col>
      );
    });
  };
  renderTicketCode = code => {
    return code.map((item, index) => {
      return (
        <Text style={styles.textStyle} key={index}>
          {item}
          {index !== code.length - 1 ? ", " : null}
        </Text>
      );
    });
  };
  renderContent = data => {
    let id = Math.random();
    return (
      <Grid
        style={{
          flex: 0,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          borderBottomColor: "#E1E1E1",
          borderBottomWidth: 1
        }}
        key={id}
      >
        <Col style={styles.colStyle}>
          <Text style={styles.textStyle}>{data.item[0]}</Text>
        </Col>
        <Col style={styles.colStyle}>
          <Text style={styles.textStyle}>{data.item[1]}</Text>
        </Col>
        <Col style={styles.colStyle}>
          <Text style={styles.textStyle}>{data.item[2]}</Text>
        </Col>
        <Col style={styles.colStyle}>
          <Text style={styles.textStyle}>{data.item[3][0]}</Text>
          <Text style={styles.textStyle}>({data.item[3][1]}%)</Text>
        </Col>
        <Col style={styles.colStyle}>
          <Text style={styles.textStyle}>
            {data.item[4] ? `(${data.item[4]})` : ""}
          </Text>
        </Col>
      </Grid>
    );
  };
  render() {
    const routeList = [
      ["0", "", "Sài Gòn - Nha Trang"],

      ["1", "", "Sài Gòn - Đà Lạt"],

      ["2", "", "Sài Gòn - Vũng Tàu"]
    ];

    return (
      <Container style={{ backgroundColor: "#fff" }}>
        <Header style={{ alignItems: "center" }}>
          <Body style={styles.headerBody}>
            <Title>Đối Soát</Title>
          </Body>
        </Header>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <View style={{ width: "90%" }}>
            <MyDropdown
              data={routeList}
              onDropdownSelect={() => {
                return null;
              }}
            />
          </View>
        </View>
        <View style={{ marginTop: 35 }} />
        <Grid style={{ padding: "1%", flex: 0 }}>
          <Col style={{ margin: "1%", flex: 1 }}>
            <DatePicker text="Từ ngày" />
          </Col>
          <Col style={{ margin: "1%", flex: 1 }}>
            <DatePicker text="Đến ngày" />
          </Col>
        </Grid>
        <View style={{ flex: 1, marginTop: 30 }}>
          <Grid
            style={{
              flex: 0,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#E4E4E4"
            }}
          >
            {this.renderHeader()}
          </Grid>
          <FlatList
            data={listData}
            renderItem={item => this.renderContent(item)}
            keyExtractor={(item, index) => index}
          />
        </View>
        <Grid
          style={{
            flex: 0,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#E4E4E4",
            height: 46
          }}
        >
          <Col style={styles.colStyle}>
            <Text style={styles.textStyle} />
          </Col>
          <Col style={styles.colStyle}>
            <Text style={styles.textStyle}>TỔNG</Text>
          </Col>
          <Col style={styles.colStyle}>
            <Text style={styles.textStyle} />
          </Col>
          <Col style={styles.colStyle}>
            <Text style={styles.textStyle}>15250000d</Text>
          </Col>
          <Col style={styles.colStyle}>
            <Text style={styles.textStyle}>(17230000)</Text>
          </Col>
        </Grid>
        <Grid
          style={{
            flex: 0,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FEDBDC",
            height: 40
          }}
        >
          <Col style={styles.colStyle}>
            <Text style={styles.textStyle}>THANH TOÁN CHO VEXERE</Text>
          </Col>
          <Col style={styles.colStyle}>
            <Text style={styles.textStyle}>(1980000d)</Text>
          </Col>
        </Grid>
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
  searchStyle: {
    backgroundColor: "#fff"
  },
  searchTextStyle: {
    height: 32,
    flex: 1
  },
  searchIconStyle: {},
  colStyle: {
    alignItems: "center"
  },
  textStyle: {
    fontSize: 13
  },
  headerBody: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
};

export default Report;
