import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, TouchableHighlight } from "react-native";
import { Icon } from "native-base";
// import { connect } from "react-redux";
import ModalDropdown from "react-native-modal-dropdown";
class Dropdown extends Component {
  constructor(props) {
    super(props);
    const { defaultIndex, defaultValue } = this.props;

    if (defaultIndex && defaultValue) {
      this.state = {
        selectedItem: { id: defaultIndex, value: defaultValue }
      };
    } else {
      this.state = {
        selectedItem: { id: -1, value: "Tùy chọn..." }
      };
    }
  }
  // componentWillReceiveProps(nextProps) {
  //   const { defaultIndex, defaultValue } = nextProps;
  //   console.warn("defaultValue", defaultValue);
  //   this.setState({
  //     selectedItem: { id: defaultIndex, value: defaultValue }
  //   });
  // }
  onDropdownSelect(index, value) {
    this.setState({
      selectedItem: { id: index, value: value }
    });
    this.props.onDropdownSelect(index, value);
  }

  renderRow(rowData, rowID, highlighted) {
    console.warn(rowData);
    return (
      <TouchableHighlight>
        <View
          style={[
            styles.dropdownRowStyle,
            highlighted ? styles.highlightItemStyle : {}
          ]}
        >
          {/* <Text style={styles.textStyle}>{rowData[2]}</Text> */}
          <Text style={styles.textStyle}>{rowData[2]}</Text>
        </View>
      </TouchableHighlight>
    );
  }
  // componentWillMount() {
  //   let get_trip = this.props.loginReducers.trip._bodyInit;
  //   let trip = JSON.parse(get_trip);
  //   this.setState({
  //     selectedItem: { id: 1, value: trip.data[0] },
  //     data: trip.data
  //   });
  // }
  render() {
    const { data } = this.props;
    return (
      <ModalDropdown
        style={styles.containerStyle}
        dropdownStyle={styles.dropdownStyle}
        dropdownTextStyle={styles.dropdownTextStyle}
        options={data}
        animated={false}
        renderRow={(rowData, rowID, highlighted) =>
          this.renderRow(rowData, rowID, highlighted)
        }
        onSelect={(idx, value) => this.onDropdownSelect(idx, value)}
      >
        <Text style={styles.textStyle}>{this.state.selectedItem.value[2]}</Text>
        <Icon name="md-arrow-dropdown" style={styles.iconStyle} />
      </ModalDropdown>
    );
  }
}

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#cfced2",
    padding: 10,
    backgroundColor: "#fff"
  },
  blockStyle: {
    flex: 1
  },
  iconStyle: {
    position: "absolute",
    right: 0,
    top: 0,
    color: "#666",
    fontSize: 22
  },
  textStyle: {
    marginRight: 20
  },
  dropdownStyle: {
    height: 250,
    marginTop: 10
  },
  dropdownRowStyle: {
    padding: 10
  },
  dropdownTextStyle: {
    fontSize: 14
  },
  highlightItemStyle: {
    backgroundColor: "#ccc"
  }
};
Dropdown.propTypes = {
  loginReducers: PropTypes.any,
  dayReducers: PropTypes.any,
  changeRouteId: PropTypes.any,
  getConfigurationOverview: PropTypes.any
};
// const mapStateToProps = state => {
//   return {
//     loginReducers: state.loginReducers,
//     dayReducers: state.getDayReducers
//   };
// };
// const mapDispatchToProps = dispatch => {
//   return {
//     getConfigurationOverview: params => {
//       dispatch(getConfigurationOverview(params));
//     },
//     changeRouteId: route_id => {
//       dispatch(changeRouteId(route_id));
//     }
//   };
// };
export default Dropdown;
