import React, {Component} from 'react';
import Node from './Node/Node'
import {dijkstra, getShortestPath} from './algorithms/dijkstra'
import NavigationBar from "./navbar.jsx";
import './PPVisualizer.css';
import {AStarSearch} from './algorithms/A*'

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;


export default class PPVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      isMousePressed: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }

  HandleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, isMousePressed: true});
  }

  HandleMouseEnter(row, col) {
    if (!this.state.isMousePressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, isMousePressed: true});
  }

  HandleMouseUp(row, col) {
    this.setState({isMousePressed: false});
  }

  clearPath() {
    this.setState({ grid: [] });
    const grid = getInitialGrid();
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (((grid[i][j].row != START_NODE_ROW) || (grid[i][j].col != START_NODE_COL)) && (
          (grid[i][j].row != FINISH_NODE_ROW) || (grid[i][j].col != FINISH_NODE_COL)
        )) document.getElementById(`node-${grid[i][j].row}-${grid[i][j].col}`).className = 'node';
      }
    }
    this.setState({ grid });
  }

  animate(visitedNodesInOrder, shortestPath) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(shortestPath);
        }, 5 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (((node.row != START_NODE_ROW) || (node.col != START_NODE_COL)) && (
          (node.row != FINISH_NODE_ROW) || (node.col != FINISH_NODE_COL)
        )) document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
      }, 5 * i);
    }
  }

  animateShortestPath(shortestPath) {
    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        const node = shortestPath[i];
        if (((node.row != START_NODE_ROW) || (node.col != START_NODE_COL)) && (
          (node.row != FINISH_NODE_ROW) || (node.col != FINISH_NODE_COL)
        )) document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
      }, 50 * i);
    }
  }

  visualizeDijkstra() {
    /*
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesOrdered = dijkstra(grid, startNode, finishNode, 0);
    const shortestPath = getShortestPath(finishNode);
    this.animate(visitedNodesOrdered, shortestPath);
    */
    const {grid} = this.state;
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesOrdered = AStarSearch(START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL, grid, 1);
    const shortestPath = getShortestPath(finishNode);
    this.animate(visitedNodesOrdered, shortestPath);
  }

  visualizeA() {
    const {grid} = this.state;
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesOrdered = AStarSearch(START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL, grid, 0);
    const shortestPath = getShortestPath(finishNode);
    this.animate(visitedNodesOrdered, shortestPath);
  }

  render() {
    const {grid, isMousePressed} = this.state;
    return (
      <div>
        <NavigationBar
          onVisualizeDPressed={() => this.visualizeDijkstra()}
          onClearPathPressed={() => this.clearPath()}
          onVisualizeAPressed={() => this.visualizeA()}
        />

        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isStart, isFinish, isWall} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isStart={isStart}
                      isFinish={isFinish}
                      isWall={isWall}
                      isMousePressed={isMousePressed}
                      onMouseDown={(row, col) => this.HandleMouseDown(row, col)}
                      onMouseEnter={(row, col) => this.HandleMouseEnter(row, col)}
                      onMouseUp={(row, col) => this.HandleMouseUp(row, col)}
                      row={row} 
                      ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const curRow = [];
    for (let col = 0; col < 50; col++) {
      curRow.push(createNode(col, row));
    }
    grid.push(curRow);
  }
  return grid;
}

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    g: Infinity,
    h: 0,
    f: 0,
    isVisited: false,
    opened: false,
    closed: false,
    isWall: false,
    parent: null,
  };
}

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
}