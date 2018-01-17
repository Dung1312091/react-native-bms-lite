import React, { Component } from "react";
import PropTypes from "prop-types";
import Dropdown from "../../components/Dropdown";
import { connect } from "react-redux";
import moment from "moment";
import { getConfigurationOverview } from "../../actions/configurationOverview";
import { changeRouteId } from "./action";
class DropdownTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      defaultIndex: null,
      defaultValue: null
    };
  }
  converDate = (date, day) => {
    let Date = moment(date).utc();
    let tomorrow = Date.add(day, "days");
    let tomorrowDate = moment(tomorrow).format("YYYY-MM-DD");
    return tomorrowDate;
  };
  selectRoute = (index, value) => {
    let user = this.props.loginReducers.user;
    let token = this.props.loginReducers.token;
    let fromDate = moment(this.props.dayReducers, "DD-MM-YYYY").format(
      "YYYY-MM-DD"
    );
    let toDate = this.converDate(fromDate, 3);
    let params = {
      access_token: token,
      company_id: user.data.CompId,
      route_id: value[0],
      from_date: fromDate,
      to_date: toDate,
      groups: "selling_configs,fare_configs,statistic"
    };
    this.props.changeRouteId(value[0]);
    this.props.getConfigurationOverview(params);
  };
  componentWillMount() {
    let get_trip = this.props.loginReducers.trip._bodyInit;
    let trip = JSON.parse(get_trip);
    this.setState({
      data: trip.data,
      defaultIndex: 1,
      defaultValue: trip.data[0]
    });
  }
  render() {
    const { data, defaultIndex, defaultValue } = this.state;
    return (
      <Dropdown
        data={data}
        defaultIndex={defaultIndex}
        defaultValue={defaultValue}
        onDropdownSelect={this.selectRoute}
      />
    );
  }
}
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
    changeRouteId: route_id => {
      dispatch(changeRouteId(route_id));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DropdownTrip);
