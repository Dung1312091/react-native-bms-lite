import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import ActionSheet from "../../containers/ActionSheetSeat";
import {
  Container,
  Body,
  Title,
  Left,
  Right,
  Button,
  Icon,
  Header,
  Grid,
  Col
} from "native-base";
import { connect } from "react-redux";
import DateRangePicker from "../../components/DateRangePicker";
import SeatOverview from "../../containers/SeatOverview";
import Loading from "../../components/Loading";
import DropdownTrip from "../../containers/DropdownTrip";
import { Actions } from "react-native-router-flux";
//import MyDropDown from "../../components/myDropDown/index";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  headerLeft: {
    flex: 1
  },
  headerBody: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  headerRight: {
    flex: 1
  }
});
class TicketScheduleScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: {},
      route: {},
      isTrip: false
    };
  }
  onpenActionSheet = (trip, isTrip) => {
    this.setState({
      trip: trip,
      route: this.props.changeRouteReducers,
      isTrip: isTrip
    });
    this.actionSheetReducer.showAddModal();
  };
  onAddTrip = () => {
    let get_trip = this.props.loginReducers.trip._bodyInit;
    let user = this.props.loginReducers.user;
    let route = this.props.changeRouteReducers;
    let data = JSON.parse(get_trip);
    let trip = data.data.filter(item => {
      return item[1] === 1;
    });
    Actions.addNewTrip({
      trip: trip,
      route: route,
      user: user
    });
  };
  render() {
    return (
      <Container>
        <Header>
          <Left style={styles.headerLeft}>
            <Button transparent onPress={this.onAddTrip}>
              <Icon name="md-add" />
            </Button>
          </Left>
          <Body style={styles.headerBody}>
            <Title>Lịch bán vé</Title>
          </Body>
          <Right style={styles.headerRight}>
            <Button transparent>
              <Icon name="ios-more-outline" />
            </Button>
          </Right>
        </Header>
        <Grid
          style={{
            height: 55,
            flex: 0,
            padding: "1%",
            backgroundColor: "#fff"
          }}
        >
          <Col style={{ margin: "1%", flex: 1 }}>
            <DropdownTrip />
          </Col>
          <Col
            style={{
              margin: "1%",
              flex: 1,
              height: 42
            }}
          >
            <DateRangePicker />
          </Col>
        </Grid>
        {/* <View style={{ height: 15 }} /> */}
        {this.props.configurationOverviewReducers.isLoading ? (
          <Loading color="#ffffff" />
        ) : null}
        <SeatOverview openModel={this.onpenActionSheet} />
        <ActionSheet
          ref={ref => {
            this.actionSheetReducer = ref;
          }}
          trip={this.state.trip}
          route={this.state.route}
          isTrip={this.state.isTrip}
          user={this.props.loginReducers.user}
        />
      </Container>
    );
  }
}
SeatOverview.propTypes = {
  loginReducers: PropTypes.any
};
const mapStateToProps = state => {
  return {
    loginReducers: state.loginReducers,
    changeRouteReducers: state.changeRouteReducer,
    configurationOverviewReducers: state.getConfigurationOverview
  };
};
export default connect(mapStateToProps, null)(TicketScheduleScene);
