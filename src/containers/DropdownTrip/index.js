import React, { Component } from "react";
import PropTypes from "prop-types";
import Dropdown from "../../components/Dropdown";
import MyDropDown from "../../components/myDropDown";
import { connect } from "react-redux";
import moment from "moment";
import { getConfigurationOverview } from "../../actions/configurationOverview";
import { changeRouteId } from "./action";

class DropdownTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentWillMount() {
    let get_trip = this.props.loginReducers.trip._bodyInit;
    let data = JSON.parse(get_trip);
    let trip = data.data.filter(item => {
      return item[1] === 1;
    });
    this.setState({
      data: trip
    });
    this.props.changeRouteId(trip[0][0], trip[0]);
  }
  converDate = (date, day) => {
    let Date = moment(date).utc();
    let tomorrow = Date.add(day, "days");
    let tomorrowDate = moment(tomorrow).format("YYYY-MM-DD");
    return tomorrowDate;
  };
  selectRoute = id => {
    let route = this.state.data.filter(item => item[0] === id);
    // console.log("route=>", route);
    let user = this.props.loginReducers.user;
    let token = this.props.loginReducers.token;
    let fromDate = moment(this.props.dayReducers, "DD-MM-YYYY").format(
      "YYYY-MM-DD"
    );
    let toDate = this.converDate(fromDate, 3);
    let params = {
      access_token: token,
      company_id: user.data.CompId,
      route_id: id,
      from_date: fromDate,
      to_date: toDate,
      groups: "selling_configs,fare_configs,statistic"
    };
    this.props.changeRouteId(id, route[0]);
    this.props.getConfigurationOverview(params);
  };
  render() {
    let { data } = this.state;
    return (
      <MyDropDown
        data={data}
        onDropdownSelect={this.selectRoute.bind(this)}
        defaultValue={{}}
      />
    );
  }
}

//   selectRoute = (index, value) => {
//     let user = this.props.loginReducers.user;
//     let token = this.props.loginReducers.token;
//     let fromDate = moment(this.props.dayReducers, "DD-MM-YYYY").format(
//       "YYYY-MM-DD"
//     );
//     let toDate = this.converDate(fromDate, 3);
//     let params = {
//       access_token: token,
//       company_id: user.data.CompId,
//       route_id: value[0],
//       from_date: fromDate,
//       to_date: toDate,
//       groups: "selling_configs,fare_configs,statistic"
//     };
//     // try {
//     //   AsyncStorage.setItem(ROUTE, JSON.stringify(value)).then(() => {
//     //     this.props.changeRouteId(value[0], value);
//     //     this.props.getConfigurationOverview(params);
//     //   });
//     // } catch (error) {
//     //   // Error saving data
//     // }
//     console.log("value=>", value);
//     this.props.changeRouteId(value[0], value);
//     this.props.getConfigurationOverview(params);
//   };
//   // isItemInArray = (array, item) => {
//   //   for (var i = 0; i < array.length; i++) {
//   //     // This if statement depends on the format of your array
//   //     if (array[i][0] == item[0] && array[i][1] == item[1]) {
//   //       return i; // Found it
//   //     }
//   //   }
//   //   return -1; // Not found
//   // };
//   componentWillMount() {
//     let get_trip = this.props.loginReducers.trip._bodyInit;
//     let data = JSON.parse(get_trip);
//     let trip = data.data.filter(item => {
//       return item[1] === 1;
//     });
//     console.log("=>", trip);
//     this.setState({
//       data: trip,
//       defaultIndex: 1,
//       defaultValue: trip[0]
//     });
//     this.props.changeRouteId(trip[0][0], trip[0]);
//     // try {
//     //   AsyncStorage.getItem(ROUTE).then(value => {
//     //     if (value) {
//     //       let data = JSON.parse(value);
//     //       let index = this.isItemInArray(trip.data, data);
//     //       this.setState({
//     //         data: trip.data,
//     //         defaultIndex: +index + 1,
//     //         defaultValue: data
//     //       });
//     //       this.props.changeRouteId(index, data);
//     //     } else {
//     //       this.setState({
//     //         data: trip.data,
//     //         defaultIndex: 1,
//     //         defaultValue: trip.data[0]
//     //       });
//     //       this.props.changeRouteId(1, trip.data[0]);
//     //     }
//     //   });
//     // } catch (error) {
//     //   // Error saving data
//     // }
//     // // console.warn(trip.data[0]);
//   }
//   render() {
//     const { data, defaultIndex, defaultValue } = this.state;
//     return (
//       <Dropdown
//         data={data}
//         defaultIndex={defaultIndex}
//         defaultValue={defaultValue}
//         onDropdownSelect={this.selectRoute}
//       />
//     );
//   }
// }
DropdownTrip.propTypes = {
  loginReducers: PropTypes.any,
  changeRouteId: PropTypes.any,
  getConfigurationOverview: PropTypes.any,
  dayReducers: PropTypes.any
};
const mapStateToProps = state => {
  return {
    loginReducers: state.loginReducers,
    dayReducers: state.getDayReducers
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getConfigurationOverview: params => {
      dispatch(getConfigurationOverview(params));
    },
    changeRouteId: (route_id, value) => {
      dispatch(changeRouteId(route_id, value));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DropdownTrip);
