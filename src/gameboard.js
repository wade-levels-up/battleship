import Node from './node';

export default class Gameboard {
  constructor() {
    this.nodes = this.initializeNodes();
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
}
