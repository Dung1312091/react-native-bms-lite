import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
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
  }
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
        <Grid style={{ padding: "1%", flex: 0 }}>
          <Col style={{ margin: "1%", flex: 1 }}>
            <DropdownTrip />
          </Col>
          <Col style={{ margin: "1%", flex: 1 }}>
            <DateRangePicker />
          </Col>
        </Grid>
        <SeatOverview />
      </Container>
    );
  }
}
SeatOverview.propTypes = {
  loginReducers: PropTypes.any
};
const mapStateToProps = state => {
  return {
    loginReducers: state.loginReducers
  };
};
export default connect(mapStateToProps, null)(TicketScheduleScene);
