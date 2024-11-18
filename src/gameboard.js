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
    this.shipSizes = {
      destroyer: 2,
      submarine: 3,
      cruiser: 3,
      battleship: 4,
      carrier: 5,
    };
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
    // Find the size of our ship
    const size = this.shipSizes[type];
    if (!size) {
      throw new Error('Error: Invalid ship type');
    }

    // Collect future coordinates
    const positions = [[coOrds[0], coOrds[1]]];
    const xMod = isVertical ? 0 : 1;
    const yMod = isVertical ? 1 : 0;
    for (let i = 1; i < size; i += 1) {
      if (isVertical) {
        positions.push([coOrds[0], coOrds[1] + i]);
      } else {
        positions.push([coOrds[0] + i, coOrds[1]]);
      }
    }

    // Check that all potential future positionsq exist and are 'water'/valid spots
    let validPosition = true;
    for (let a = 0; a < size; a += 1) {
      if (this.nodes[`${positions[0 + a][1]}${positions[0 + a][0]}`]) {
        if (
          this.nodes[`${positions[0 + a][1]}${positions[0 + a][0]}`].data !==
          'water'
        ) {
          validPosition = false;
        }
      } else {
        validPosition = false;
      }
    }

    // if so, map all future coordinates to type of ship
    if (validPosition) {
      this.nodes = this.nodes.map((item) => {
        for (let m = 0; m < size; m += 1) {
          if (
            item.vertex[0] === coOrds[0] + xMod * m &&
            item.vertex[1] === coOrds[1] + yMod * m
          ) {
            return { ...item, data: type };
          }
        }
        return item;
      });
    }
  }
}
