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
// import Dropdown from "../../components/Dropdown";
import DropdownTrip from "../../containers/DropdownTrip";
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
      route: {}
    };
  }
  onpenActionSheet = trip => {
    this.setState({
      trip: trip,
      route: this.props.changeRouteReducers
    });
    this.actionSheetReducer.showAddModal();
  };
  render() {
    return (
      <Container>
        <Header>
          <Left style={styles.headerLeft}>
            <Button transparent>
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
        <Grid style={{ height: 50, flex: 0, padding: "1%" }}>
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
        <View style={{ marginTop: 5 }} />
        <SeatOverview openModel={this.onpenActionSheet} />
        <ActionSheet
          ref={ref => {
            this.actionSheetReducer = ref;
          }}
          trip={this.state.trip}
          route={this.state.route}
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
    changeRouteReducers: state.changeRouteReducer
  };
};
export default connect(mapStateToProps, null)(TicketScheduleScene);
