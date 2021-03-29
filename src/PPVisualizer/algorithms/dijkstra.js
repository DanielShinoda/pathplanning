// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function dijkstra(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
      sortNodesByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();
      // If we encounter a wall, we skip it.
      if (closestNode.isWall) continue;
      // If the closest node is at a distance of infinity,
      // we must be trapped and should therefore stop.
      if (closestNode.distance === Infinity) return visitedNodesInOrder;
      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);
      if (closestNode === finishNode) return visitedNodesInOrder;
      updateUnvisitedNeighbors(closestNode, grid);
    }
  }
  
  function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  }
  
  function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      /*
      if ((node.row - neighbor.row !== 0) || (node.col - neighbor.col != 0)) {
        neighbor.distance = node.distance + 1.4;
      } else {
        neighbor.distance = node.distance + 1;
      }*/
      neighbor.distance = node.distance + 1;
      neighbor.prevNode = node;
    }
    return unvisitedNeighbors;
  }
  
  function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    //if (row > 0 && col > 0) neighbors.push(grid[row - 1][col - 1]);
    //if (row > 0 && col < (grid[0].length - 1)) neighbors.push(grid[row - 1][col + 1]);
    //if ((row < grid.length - 1) && col > 0) neighbors.push(grid[row + 1][col - 1]);
    //if ((row < grid.length - 1) && (col < grid[0].length - 1)) neighbors.push(grid[row + 1][col + 1]);
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    /*
    for (let h = -1; h < 2; h++) {
      for (let v = -1; v < 2; v++) {
        if ((h != 0) || (v != 0)) {
          if (cellIsCorrect(row + h, col + v, grid)) {
            neighbors.push(grid[row + h][col + v]);
          }
        }
      }
    }*/
    return neighbors.filter(neighbor => !neighbor.isVisited);
  }

  function cellIsCorrect(row, col, grid) {
    return ((row < grid.length - 1) && (row >= 0) && (col < grid[0].length - 1) && (col > 0));
  }
  
  function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  }
  
  // Backtracks from the finishNode to find the shortest path.
  // Only works when called *after* the dijkstra method above.
  export function getShortestPath(finishNode) {
    const shortestPath = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      shortestPath.unshift(currentNode);
      currentNode = currentNode.prevNode;
    }
    return shortestPath;
  }