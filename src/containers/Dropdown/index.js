import React, { Component } from "react";
import MyDropDown from "../../components/myDropDown";
class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  render() {
    let { data } = this.state;
    return <MyDropDown data={data} onDropdownSelect={this.selectRoute} />;
  }
}
export default DropDown;
