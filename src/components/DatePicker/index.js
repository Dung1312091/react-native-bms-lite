import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Icon } from "native-base";
import DateTimePicker from "react-native-modal-datetime-picker";
class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false
    };
  }
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this._hideDateTimePicker();
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <TouchableOpacity onPress={this._showDateTimePicker}>
          <Text>Show DatePicker</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={this._showDateTimePicker}
          style={[styles.dateGroupItemContainer, styles.blockStyle]}
        >
          <Text>{this.props.text}</Text>
          <Icon
            name="md-calendar"
            style={[styles.dateGroupItem, styles.iconStyle]}
          />
          <Text style={styles.dateGroupItem}>30-01-2017</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
      </View>
    );
  }
}
const styles = {
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  date: {
    marginTop: 10
  },
  focused: {
    color: "blue"
  },
  footer: {
    backgroundColor: "#fff",
    alignSelf: "stretch",
    padding: 20
  },
  iconStyle: {
    fontSize: 22
  },
  blockStyle: {
    flex: 1
  },
  containerStyle: {
    flexDirection: "row",
    alignSelf: "stretch",
    backgroundColor: "#fff"
  },
  dateGroupItemContainer: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  dateGroupItem: {
    marginLeft: 5,
    marginRight: 5,
    color: "#1365af",
    fontSize: 13,
    fontWeight: "500",
    paddingTop: 10,
    paddingBottom: 10
  }
};
export default DatePicker;
