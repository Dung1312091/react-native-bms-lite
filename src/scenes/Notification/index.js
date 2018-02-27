import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Text,
  Right,
  Body,
  Left,
  Picker,
  Form,
  Item as FormItem
} from "native-base";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
const Item = Picker.Item;
class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected2: ["1", "2", "5"]
    };
  }
  onValueChange2(value) {
    console.log("v=>", value);
    this.setState({
      selected2: value
    });
  }
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Placeholder Picker</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Picker
              mode="dropdown"
              placeholder="Select One"
              selectedValue={this.state.selected2}
              onValueChange={this.onValueChange2.bind(this)}
            >
              <Item label="Wallet" value={["1", "2", "3"]} />
              <Item label="ATM Card" value={["1", "2", "4"]} />
              <Item label="Debit Card" value={["1", "2", "5"]} />
              <Item label="Credit Card" value={["1", "2", "6"]} />
              <Item label="Net Banking" value={["1", "2", "7"]} />
            </Picker>
          </Form>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  textInput: {
    color: "white",
    flex: 1,
    // fontFamily: "Andale Mono",
    fontSize: 16,
    height: 50
  },
  clearfix: {
    margin: 10
  },
  viewContainer: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: "#02032090"
  },
  textInputWrapper: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 5,
    paddingRight: 5
  },
  roundedTextInputWrapper: {},
  rLogo: {
    alignSelf: "center",
    width: 40
  },
  traceLogo: {
    alignSelf: "center",
    width: 216,
    height: 80
  },
  button: {
    marginLeft: 10,
    marginRight: 10
  },
  textView: {
    alignSelf: "center",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 13,
    color: "#ffffffe0"
  }
});
export default Notification;
