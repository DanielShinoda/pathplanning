import React, { Component } from "react";
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Button,
  Segment
} from "semantic-ui-react";

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { fixed } = this.state;
    const { onVisiualizePressed, onClearPathPressed } = this.props;
    return (
      <Menu fixed="bot" inverted style={{ backgroundColor: "#061830" }}>
        <Container>
          <Menu.Item as="a" header>
            <Image
              size="mini"
              src={require("../pp_icon.png")}
              style={{ marginRight: "1.5em" }}
            />
            Path Planning Visualizer
          </Menu.Item>

          <Dropdown item simple text="Options">
            <Dropdown.Menu>
              <Dropdown.Item>Allow diagonal</Dropdown.Item>
              <Dropdown.Item>Allow squeeze</Dropdown.Item>
              <Dropdown.Item>Cutcorners</Dropdown.Item>
              <Dropdown.Item>Breakingties</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item position="right">
            <Button
              color="black"
              onClick={() => onClearPathPressed()}
            >
              Clear Path
            </Button>

            <Button color="black" onClick={() => onVisiualizePressed()}>
              Visualize Algorithm
            </Button>
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}