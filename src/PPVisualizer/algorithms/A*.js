var Heap = require('heap');
var Heuristic = require('./Heuristic')

export function AStarSearch(startX, startY, finishX, finishY, grid, isDijkstra, Options, H) {
	var heuristic;
	if (H === "0") heuristic = Heuristic.manhattan;
	if (H === "1") heuristic = Heuristic.euclidian;
	if (H === "2") heuristic = Heuristic.chebyshev;
	const closed = [];
	const opened = [];
	let weight = 1;

	var openList = new Heap(function(nodeA, nodeB) {
		return nodeA.f - nodeB.f;
		}),
		startNode = grid[startX][startY],
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

		neighbors = getNeighbors(node, grid, Options);
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

	function getNeighbors(node, grid, Options) {
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
				s0 = 1;
			}
		}

		if (x < grid.length - 1) {
			if (grid[x + 1][y].isWall === false) {
				neighbors.push(grid[x + 1][y]);
				s1 = 1;
			}
		}

		if (y < grid[0].length - 1) {
			if (grid[x][y + 1].isWall === false) {
				neighbors.push(grid[x][y + 1]);
				s2 = 1;
			}
		}

		if (x > 0) {
			if (grid[x - 1][y].isWall === false) {
				neighbors.push(grid[x - 1][y]);
				s3 = 1;
			}
		}

		if (Options.Allowdiagonal === false) {
			return neighbors
		}

		if (Options.Allowdiagonal) {
			d0 = s3 && s0;
        	d1 = s0 && s1;
        	d2 = s1 && s2;
        	d3 = s2 && s3;
		}

		if ((Options.Allowdiagonal === true) && (Options.Cutcorners === true)) {
			d0 = s3 || s0;
        	d1 = s0 || s1;
        	d2 = s1 || s2;
        	d3 = s2 || s3;
		}

		if ((Options.Allowdiagonal === true) && 
			(Options.Cutcorners === true) && 
			(Options.Allowsqueeze === true)) {
			d0 = true;
        	d1 = true;
        	d2 = true;
        	d3 = true;
		}

		if ((Options.Allowdiagonal === true) && (Options.Allowsqueeze === true)) {
			d0 = true;
        	d1 = true;
        	d2 = true;
        	d3 = true;
		}
		
		if (d0 && x > 0 && y > 0 && (grid[x - 1][y - 1].isWall === false)) {
			neighbors.push(grid[x - 1][y - 1]);
		}

		if (d3 && x > 0 && (y < grid[0].length - 1) && (grid[x - 1][y + 1].isWall === false)) {
			neighbors.push(grid[x - 1][y + 1]);
		}

		if (d2 && (x < grid.length - 1) && (y < grid[0].length - 1) && (grid[x + 1][y + 1].isWall === false)) {
			neighbors.push(grid[x + 1][y + 1]);
		}

		if (d1 && (x < grid.length - 1) && y > 0 && (grid[x + 1][y - 1].isWall === false)) {
			neighbors.push(grid[x + 1][y - 1]);
		}

		return neighbors;
	}
