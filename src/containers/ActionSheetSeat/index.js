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
const listAddTrip = ["Thêm chuyến"];
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
    const { isTrip, trip, user, route } = this.props;
    switch (index) {
      case 0:
        if (!isTrip) {
          this.actionSheet.hideAddModal();
          Actions.addNewTrip({
            trip: trip,
            addTrip: true,
            route: route,
            user: user
          });
        }
        break;
      case 1:
        this.actionSheet.hideAddModal();
        Actions.cancelTrip({
          trip: trip,
          route: route
        });
        break;
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
    let height = this.props.isTrip ? 410 : 180;
    return (
      <VxrActionSheet
        ref={ref => {
          this.actionSheet = ref;
        }}
        height={height}
        listItem={this.props.isTrip ? list : listAddTrip}
        tripDate={this.state.tripDate}
        route={this.state.route}
        onClick={this.onClick}
        isTrip={this.props.isTrip}
      />
    );
  }
}
export default ActionSheet;
