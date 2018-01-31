import React, { Component } from "react";
import { View, Text, TouchableNativeFeedback, FlatList } from "react-native";
import { Container, Header, Item, Grid, Col } from "native-base";

// import { Dropdown } from 'react-native-material-dropdown';

import { VxrInput } from "../../components/Input";
import MyDropdown from "../../components/myDropDown";
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
class FlastListItem extends Component {
  render() {
    return (
      <TouchableNativeFeedback
        onPress={() => {
          console.warn("a");
        }}
      >
        <Grid
          style={{
            flex: 0,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            borderBottomColor: "#E1E1E1",
            borderBottomWidth: 1
          }}
        >
          <Col style={styles.colStyle}>
            <Text style={styles.textStyle}>{this.props.data[0][0]}</Text>
            <Text style={styles.textStyle}>{this.props.data[0][1]}</Text>
            <Text style={styles.textStyle}>{this.props.data[0][2]}</Text>
          </Col>
          <Col style={styles.colStyle}>
            <Text style={styles.textStyle}>{this.props.data[1]}</Text>
            <Text>{this.props.data[2]}</Text>
            <View style={{ flexDirection: "row" }}>
              {/* {this.renderTicketCode(this.props.data[2])} */}
              <Text>AA</Text>
            </View>
          </Col>
          <Col style={styles.colStyle}>
            <Text style={styles.textStyle}>{this.props.data[3]}</Text>
          </Col>
          <Col style={styles.colStyle}>
            <Text style={styles.textStyle}>{this.props.data[4][0]}</Text>
            <Text style={styles.textStyle}>{this.props.data[4][1]}</Text>
            <Text
              style={
                this.props.data[5] === 1
                  ? { color: "#2020FF" }
                  : this.props.data[5] === 2
                    ? { color: "#4DFF4D" }
                    : { color: "red" }
              }
            >
              {this.props.data[5] === 1
                ? "Đặt chổ"
                : this.props.data[4] === 2 ? "Thanh toán" : "Hủy"}
            </Text>
          </Col>
        </Grid>
      </TouchableNativeFeedback>
    );
  }
}
class TicketManagement extends Component {
  // componentWillReceiveProps(nextProps) {
  //   console.warn(this.props);
  //   console.warn('qwqwq',nextProps);
  // }
  shouldComponentUpdate(nextProps, nextState) {
    return false;
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
            <MyDropdown data={routeList} onDropdownSelect={()=> {return null}} />
          </Col>
          <Col style={{ margin: "1%", flex: 1 }}>
            <MyDropdown data={filterList} onDropdownSelect={()=> {return null}} />
          </Col>
        </Grid>
        <View style={{ marginTop: 30 }} />
        <Grid style={{ padding: "1%", flex: 0 }}>
          <Col style={{ margin: "1%", flex: 1 }}>
            <DatePicker text="Từ ngày" />
          </Col>
          <Col style={{ margin: "1%", flex: 1,  }}>
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
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => {
              return <FlastListItem data={item} key={index} />;
            }}
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
    fontSize: 13
  }
};

export default TicketManagement;
