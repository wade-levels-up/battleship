import Node from './node';
import Ship from './ship';

export default class Gameboard {
  constructor() {
    this.nodes = this.initializeNodes();
    this.ships = [
      new Ship('destroyer', 2),
      new Ship('submarine', 3),
      new Ship('cruiser', 3),
      new Ship('battleship', 4),
      new Ship('carrier', 5),
    ];
  }

  // eslint-disable-next-line class-methods-use-this
  initializeNodes() {
    const nodeArr = [];
    for (let y = 0; y < 10; y += 1) {
      for (let x = 0; x < 10; x += 1) {
        // Create corner nodes - set invalid edges to [null]
        if (x === 0 && y === 0) {
          nodeArr.push(new Node([x, y], [[0, 0], [0, 0], [null], [null]]));
        } else if (x === 0 && y === 9) {
          nodeArr.push(new Node([x, y], [[null], [0, 0], [0, 0], [null]]));
        } else if (x === 9 && y === 0) {
          nodeArr.push(new Node([x, y], [[0, 0], [null], [null], [0, 0]]));
        } else if (x === 9 && y === 9) {
          nodeArr.push(new Node([x, y], [[null], [null], [0, 0], [0, 0]]));
        } else if (x === 0) {
          // Create border nodes - set invalid edges to [null]
          nodeArr.push(new Node([x, y], [[0, 0], [0, 0], [0, 0], [null]]));
        } else if (y === 0) {
          nodeArr.push(new Node([x, y], [[0, 0], [0, 0], [null], [0, 0]]));
        } else if (x === 9) {
          nodeArr.push(new Node([x, y], [[0, 0], [null], [0, 0], [0, 0]]));
        } else if (y === 9) {
          nodeArr.push(new Node([x, y], [[null], [0, 0], [0, 0], [0, 0]]));
        } else {
          // Create all other nodes
          nodeArr.push(
            new Node(
              [x, y],
              [
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
              ],
            ),
          );
        }
      }
    }
    this.setValidNodeEdges(nodeArr);
    return nodeArr;
  }

  // eslint-disable-next-line class-methods-use-this
  setValidNodeEdges(nodes) {
    nodes.forEach((node) => {
      const [edges] = [node.edges];
      const [vertex] = [node.vertex];
      if (edges.north[0] != null) edges.north = [vertex[0], vertex[1] + 1];
      if (edges.east[0] != null) edges.east = [vertex[0] + 1, vertex[1]];
      if (edges.south[0] != null) edges.south = [vertex[0], vertex[1] - 1];
      if (edges.west[0] != null) edges.west = [vertex[0] - 1, vertex[1]];
    });
  }

  placeShip(type, coOrds, isVertical = false) {
    const xMod = isVertical ? 0 : 1;
    const yMod = isVertical ? 1 : 0;
    const shipSizes = {
      destroyer: 2,
      submarine: 3,
      cruiser: 3,
      battleship: 4,
      carrier: 5,
    };

    const size = shipSizes[type];
    if (!size) {
      throw new Error('Error: Invalid ship type');
    }
    // Replace our nodes array with a new array that's had it's node data properties modified to match our ship type
    this.nodes = this.nodes.map((item) => {
      // Always runs, this is the root position where our ship orinates from
      if (item.vertex[0] === coOrds[0] && item.vertex[1] === coOrds[1]) {
        return { ...item, data: type };
      }
      // If our ship takes up two spaces or more modify nodes in relation to root node by modifiers
      if (size >= 2) {
        if (
          item.vertex[0] === coOrds[0] + xMod * 1 &&
          item.vertex[1] === coOrds[1] + yMod * 1
        ) {
          return { ...item, data: type };
        }
      }
      // If our ship takes up three spaces or more modify nodes in relation to root node by modifiers
      if (size >= 3) {
        if (
          item.vertex[0] === coOrds[0] + xMod * 2 &&
          item.vertex[1] === coOrds[1] + yMod * 2
        ) {
          return { ...item, data: type };
        }
      }
      // If our ship takes up four spaces or more modify nodes in relation to root node by modifiers
      if (size >= 4) {
        if (
          item.vertex[0] === coOrds[0] + xMod * 3 &&
          item.vertex[1] === coOrds[1] + yMod * 3
        ) {
          return { ...item, data: type };
        }
      }
      // Finally, If our ship takes up five spaces or more modify nodes in relation to root node by modifiers
      if (size >= 5) {
        if (
          item.vertex[0] === coOrds[0] + xMod * 4 &&
          item.vertex[1] === coOrds[1] + yMod * 4
        ) {
          return { ...item, data: type };
        }
      }

      return item;
    });
  }
}
