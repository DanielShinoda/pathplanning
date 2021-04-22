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
    const { onVisualizeDPressed, onVisualizeAPressed, onClearGridPressed, onClearWallsPressed, onGenerateRandomMazePressed } = this.props;
    return (
      
      <Menu fixed="top" inverted style={{ backgroundColor: "maroon" }}>
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
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item>
            <Button
              color="black"
              onClick={() => onClearGridPressed()}
            >
              Clear Grid
            </Button>

            <Button
              color="black"
              onClick={() => onClearWallsPressed()}
            >
              Clear Walls
            </Button>

            <Button
              color="black"
              onClick={() => onGenerateRandomMazePressed()}
            >
              Random Maze
            </Button>

            <Button color="black" onClick={() => onVisualizeDPressed()}>
              Visualize Dijkstra
            </Button>
            <Button color="black" onClick={() => onVisualizeAPressed()}>
              Visualize A*
            </Button>
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}