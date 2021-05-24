import React, { Component } from "react";
import {
  Container,
  Dropdown,
  Image,
  Menu,
  Button,
} from "semantic-ui-react";
import './navbar.css'
import './PPVisualizer.jsx'


export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { onVisualizeDPressed, onVisualizeAPressed, onClearGridPressed,
       onGenerateRandomMazePressed } = this.props;

    return (
      
      <Menu fixed="top" inverted style={{ backgroundColor: "#121212" }}>
        <Container>
          <Menu.Item as="a" header>
            <Image
              size="mini"
              src={require("../pp_icon.png")}
              style={{ marginRight: "1.5em" }}
            />
            Path Planning Visualizer
          </Menu.Item>
          <Menu.Item>
            <Button color="blue"
              onClick={() => onClearGridPressed()}>
              Clear grid
            </Button>
            <Button
              color="blue"
              onClick={() => onGenerateRandomMazePressed()}>
              Random Maze
            </Button>

            <Button color="blue" onClick={() => onVisualizeDPressed()}>
              Visualize Dijkstra
            </Button>
            <Button color="blue" onClick={() => onVisualizeAPressed()}>
              Visualize A*
            </Button>
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}
