import React, { Component } from "react";
import Modal from "react-native-modalbox";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native";
class VxrActionSheet extends Component {
  constructor() {
    super();
    this.showAddModal = this.showAddModal.bind(this);
  }
  onClick = index => {
    this.props.onClick(index);
  };
  renderList(list) {
    // for (var i=0;i<6;i++) {
    //   list.push(<Text style={styles.text} key={i}>Elem {i}</Text>);
    // }
    return list.map((item, index) => {
      let myStyle = null;
      if (index !== list.length - 1) {
        myStyle = {
          borderBottomColor: "#DCDCDC",
          borderBottomWidth: 2
        };
      }
      return (
        <View key={index} style={[myStyle, { width: "100%" }]}>
          <TouchableOpacity
            // onPress={() => this.redire(index)}
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center"
            }}
            onPress={() => this.onClick(index)}
          >
            <Text style={[styles.text, { padding: 8 }]}>{item}</Text>
          </TouchableOpacity>
        </View>
      );
    });
  }
  showAddModal = () => {
    this.modal2.open();
  };
  hideAddModal = () => {
    this.modal2.close();
  };
  render() {
    let { height } = this.props;
    return (
      <Modal
        style={[
          styles.modal,
          {
            height: height,
            width: "90%",
            backgroundColor: "transparent"
          }
        ]}
        position={"bottom"}
        ref={ref => {
          this.modal2 = ref;
        }}
        swipeArea={20}
      >
        <ScrollView
          style={{
            width: "100%"
          }}
        >
          <View
            style={{
              width: "100%",
              backgroundColor: "#F3F4F4",
              borderRadius: 10
            }}
          >
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: "#DCDCDC",
                width: "100%",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{ color: "#404040" }}>Tác vụ</Text>
              <Text>{this.props.tripDate}</Text>
              <Text>{this.props.route}</Text>
            </View>
            <View style={{ width: "100%" }}>
              {this.renderList(this.props.listItem)}
            </View>
          </View>
          <View
            style={{
              backgroundColor: "#F3F4F4",
              marginTop: 22,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              height: 50
            }}
          >
            <TouchableOpacity onPress={this.hideAddModal}>
              <Text style={styles.text}>Bỏ qua</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 50,
    flex: 1
  },

  modal: {
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "#007DFD",
    fontSize: 16
  }
});
export default VxrActionSheet;
