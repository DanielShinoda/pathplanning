var Heap = require('heap');
var Heuristic = require('./Heuristic')

export function AStarSearch(startX, startY, finishX, finishY, grid, isDijkstra) {
	const heuristic = Heuristic.manhattan;
	const closed = [];
	const opened = [];
	let weight = 1;

	var openList = new Heap(function(nodeA, nodeB) {
		return nodeA.f - nodeB.f;
		}),
		startNode = grid[startX][startY],
		finishNode = grid[finishX][finishY],
		abs = Math.abs, SQRT2 = Math.SQRT2,
		node, neighbors, x, y, ng;
	startNode.g = 0;
	startNode.f = 0;
	openList.push(startNode);
	startNode.opened = true;
	while (!openList.empty()) {
		node = openList.pop();
		node.closed = true;
		if (node.col === finishY && node.row === finishX) {
			const new_closed = [];
			for (let i = 0; i < closed.length; ++i) {
				if (closed[i].closed === true) {
					new_closed.push(closed[i]);
				} else {
					opened.push(closed[i]);
				}
			}
			return [new_closed, opened];
		}

		neighbors = getNeighbors(node, grid);
		for (let i = 0, l = neighbors.length; i < l; ++i) {
			
			const neighbor = neighbors[i];
			neighbor.isVisited = true;
			if (neighbor.closed) continue;

			x = neighbor.row;
			y = neighbor.col;
			ng = node.g + ((x - node.row === 0 || y - node.col === 0) ? 1 : SQRT2);

			if (!neighbor.opened || ng < neighbor.g) {
				closed.push(neighbor);
				neighbor.isVisited = true;
				neighbor.g = ng;
				if (isDijkstra === 0) neighbor.h = neighbor.h || weight * heuristic(abs(x - finishX), abs(y - finishY));
				neighbor.f = neighbor.g + neighbor.h;
				neighbor.parent = node;
				if (!neighbor.opened) {
					openList.push(neighbor);
					neighbor.opened = true;
				} else { 
					openList.updateItem(neighbor);
				}
			}
		}
	}
	return [closed,[]];
}

	function getNeighbors(node, grid) {
		let x = node.row,
			y = node.col, 
			neighbors = [],
			s0 = false, d0 = false,
        	s1 = false, d1 = false,
        	s2 = false, d2 = false,
        	s3 = false, d3 = false;
		
		if (y > 0) {
			if (grid[x][y - 1].isWall === false) {
				neighbors.push(grid[x][y - 1]);
				s0 = true;
			}
		}

		if (x < grid.length - 1) {
			if (grid[x + 1][y].isWall === false) {
				neighbors.push(grid[x + 1][y]);
				s1 = true;
			}
		}

		if (y < grid[0].length - 1) {
			if (grid[x][y + 1].isWall === false) {
				neighbors.push(grid[x][y + 1]);
				s2 = true;
			}
		}

		if (x > 0) {
			if (grid[x - 1][y].isWall === false) {
				neighbors.push(grid[x - 1][y]);
				s0 = true;
			}
		}

		if (x > 0 && y > 0) {
			if (grid[x - 1][y - 1].isWall === false) neighbors.push(grid[x - 1][y - 1]);
		}

		if (x > 0 && (y < grid[0].length - 1)) {
			if (grid[x - 1][y + 1].isWall === false) neighbors.push(grid[x - 1][y + 1]);
		}

		if ((x < grid.length - 1) && (y < grid[0].length - 1)) {
			if (grid[x + 1][y + 1].isWall === false) neighbors.push(grid[x + 1][y + 1]);
		}

		if ((x < grid.length - 1) && y > 0) {
			if (grid[x + 1][y - 1].isWall === false) neighbors.push(grid[x + 1][y - 1]);
		}

		return neighbors;
	}

	function backtrace(node) {
		var Path = [node];
		while (node.parent) {
			node = node.parent;
			Path.push(node);
		}
		return Path.reverse();
	}
