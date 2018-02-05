import React, { Component } from "react";
import moment from "moment";
import { Actions } from "react-native-router-flux";
import VxrActionSheet from "../../components/ActionSheet";
const list = [
  "Xuất bến",
  "Hủy chuyến",
  "Nhập chuyến",
  "Thay đổi giờ",
  "Thay đổi giá",
  "Thay đổi chỗ bán",
  "Thay đổi lịch bán vé"
];
class ActionSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tripDate: "",
      route: ""
    };
    this.showAddModal = this.showAddModal.bind(this);
  }
  onClick = index => {
    switch (index) {
      case 5:
        this.actionSheet.hideAddModal();
        Actions.seatDiagram({ trip: this.props.trip });
        break;

      default:
        break;
    }
  };
  showAddModal = () => {
    this.actionSheet.showAddModal();
  };
  buildTitleTrip = (time, date) => {
    let d = moment(date, "YYYY-MM-DD").format("DD/MM/YYYY");
    let str = `Chuyến ${time} - ${d}`;
    return str;
  };

  buildetitleRoute = route => {
    return route;
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.props.trip.time !== nextProps.trip.time ||
      this.props.trip.date !== nextProps.trip.date ||
      this.props.route.route_id !== nextProps.route.route_id
    ) {
      let route = nextProps.route.value[2];
      this.setState({
        tripDate: this.buildTitleTrip(nextProps.trip.time, nextProps.trip.date),
        route: this.buildetitleRoute(route)
      });
      return true;
    } else {
      return false;
    }
  }
  render() {
    const height = 410;
    return (
      <VxrActionSheet
        ref={ref => {
          this.actionSheet = ref;
        }}
        height={height}
        listItem={list}
        tripDate={this.state.tripDate}
        route={this.state.route}
        onClick={this.onClick}
      />
    );
  }
}
export default ActionSheet;
