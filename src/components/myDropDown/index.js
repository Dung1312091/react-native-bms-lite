import React, { Component } from "react";
import { Platform, View } from "react-native";
import {
  Container,
  Content,
  Picker,
  Form,
  Item as FormItem
} from "native-base";
const Item = Picker.Item;
class MyDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected1: ""
    };
  }
  onValueChange(value) {
    this.props.onDropdownSelect(value);
    this.setState({
      selected1: value
    });
  }
  renderItem = data => {
    return data.map((item, index) => {
      return <Item label={item[2]} value={item} key={index} />;
    });
  };
  render() {
    return (
      <Container>
        <View style={{ height: 45 }}>
          <Content>
            <Form
              style={{
                borderWidth: 1,
                borderColor: "#d9d8dc",
                borderRadius: 2
              }}
            >
              <Picker
                mode="dropdown"
                style={{
                  height: 40,
                  borderWidth: 2,
                  borderColor: "red",
                  borderRadius: 2
                }}
                selectedValue={this.state.selected1}
                onValueChange={this.onValueChange.bind(this)}
              >
                {this.renderItem(this.props.data)}
              </Picker>
            </Form>
          </Content>
        </View>
      </Container>
    );
  }
}
export default MyDropDown;
