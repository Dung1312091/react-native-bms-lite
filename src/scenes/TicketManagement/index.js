import React, { Component } from "react";
import { View, Text, TouchableHighlight, FlatList } from "react-native";
import { Container, Header, Item, Grid, Col } from "native-base";
// import { Dropdown } from 'react-native-material-dropdown';

import { VxrInput } from "../../components/Input";
import Dropdown from "../../components/Dropdown";
import DatePicker from "../../components/DatePicker";
const listData = [
  [
    ["SG-VL", "18:00", "21/2/2017"],
    "VH2S927",
    ["A1", "C2", "D4"],
    "320000",
    ["10:33", "22/12/2017"],
    1
  ],
  [
    ["SG-VL", "18:00", "21/2/2017"],
    "VH2S927",
    ["A1", "C2", "D4"],
    "320000",
    ["10:33", "22/12/2017"],
    2
  ],
  [
    ["SG-VL", "18:00", "21/2/2017"],
    "VH2S927",
    ["A1", "C2", "D4"],
    "320000",
    ["10:33", "22/12/2017"],
    3
  ],
  [
    ["SG-VL", "18:00", "21/2/2017"],
    "VH2S927",
    ["A1", "C2", "D4"],
    "320000",
    ["10:33", "22/12/2017"],
    1
  ],
  [
    ["SG-VL", "18:00", "21/2/2017"],
    "VH2S927",
    ["A1", "C2", "D4"],
    "320000",
    ["10:33", "22/12/2017"],
    2
  ],
  [
    ["SG-VL", "18:00", "21/2/2017"],
    "VH2S927",
    ["A1", "C2", "D4"],
    "320000",
    ["10:33", "22/12/2017"],
    2
  ],
  [
    ["SG-VL", "18:00", "21/2/2017"],
    "VH2S927",
    ["A1", "C2", "D4"],
    "320000",
    ["10:33", "22/12/2017"],
    1
  ],
  [
    ["SG-VL", "18:00", "21/2/2017"],
    "VH2S927",
    ["A1", "C2", "D4"],
    "320000",
    ["10:33", "22/12/2017"],
    3
  ],
  [
    ["SG-VL", "18:00", "21/2/2017"],
    "VH2S927",
    ["A1", "C2", "D4"],
    "320000",
    ["10:33", "22/12/2017"],
    1
  ],
  [
    ["SG-VL", "18:00", "21/2/2017"],
    "VH2S927",
    ["A1", "C2", "D4"],
    "320000",
    ["10:33", "22/12/2017"],
    1
  ],
  [
    ["SG-VL", "18:00", "21/2/2017"],
    "VH2S927",
    ["A1", "C2", "D4"],
    "320000",
    ["10:33", "22/12/2017"],
    1
  ],
  [
    ["SG-VL", "18:00", "21/2/2017"],
    "VH2S927",
    ["A1", "C2", "D4"],
    "320000",
    ["10:33", "22/12/2017"],
    1
  ],
  [
    ["SG-VL", "18:00", "21/2/2017"],
    "VH2S927",
    ["A1", "C2", "D4"],
    "320000",
    ["10:33", "22/12/2017"],
    1
  ],
  [
    ["SG-VL", "18:00", "21/2/2017"],
    "VH2S927",
    ["A1", "C2", "D4"],
    "320000",
    ["10:33", "22/12/2017"],
    1
  ],
  [
    ["SG-VL", "18:00", "21/2/2017"],
    "VH2S927",
    ["A1", "C2", "D4"],
    "320000",
    ["10:33", "22/12/2017"],
    1
  ]
];
class TicketManagement extends Component {
  constructor() {
    super();
    this.state = {};
  }
  renderHeader = () => {
    const arrHeader = ["CHUYẾN", "Mã vé", "Tiền vé", "Ngày đặt"];
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
          <Text style={styles.textStyle}>{data.item[0][0]}</Text>
          <Text style={styles.textStyle}>{data.item[0][1]}</Text>
          <Text style={styles.textStyle}>{data.item[0][2]}</Text>
        </Col>
        <Col style={styles.colStyle}>
          <Text style={styles.textStyle}>{data.item[1]}</Text>
          {/* <Text>{data.item[2]}</Text> */}
          <View style={{ flexDirection: "row" }}>
            {this.renderTicketCode(data.item[2])}
          </View>
        </Col>
        <Col style={styles.colStyle}>
          <Text style={styles.textStyle}>{data.item[3]}</Text>
        </Col>
        <Col style={styles.colStyle}>
          <Text style={styles.textStyle}>{data.item[4][0]}</Text>
          <Text style={styles.textStyle}>{data.item[4][1]}</Text>
          <Text
            style={
              data.item[5] === 1
                ? { color: "#2020FF" }
                : data.item[5] === 2 ? { color: "#4DFF4D" } : { color: "red" }
            }
          >
            {data.item[5] === 1
              ? "Đặt chổ"
              : data.item[4] === 2 ? "Thanh toán" : "Hủy"}
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

    const filterList = [
      ["0", "", "Tất cả các chuyến"],

      ["1", "", "Sài Gòn - Đà Lạt"],

      ["2", "", "Sài Gòn - Vũng Tàu"]
    ];
    return (
      <Container style={{ backgroundColor: "#fff" }}>
        <Header searchBar style={styles.headerStyle}>
          <Item style={styles.searchStyle}>
            <VxrInput
              iconName="ios-search"
              placeholder="Tìm kiếm SDT, Mã vé, Tên khách"
              style={[styles.searchTextStyle, { marginTop: 5 }]}
            />
          </Item>
        </Header>
        <Grid style={{ padding: "1%", flex: 0 }}>
          <Col style={{ margin: "1%", flex: 1 }}>
            <Dropdown
              data={routeList}
              defaultIndex={1}
              defaultValue={routeList[0]}
            />
          </Col>
          <Col style={{ margin: "1%", flex: 1 }}>
            <Dropdown
              data={filterList}
              defaultIndex={1}
              defaultValue={filterList[0]}
            />
          </Col>
        </Grid>
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
              height: 60,
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
          />
        </View>
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
    fontSize: 13,
  }
};

export default TicketManagement;
