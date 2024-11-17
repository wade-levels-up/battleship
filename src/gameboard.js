export default class Gameboard {
  constructor() {
    this.nodes = this.initializeNodes();
  }

  // eslint-disable-next-line class-methods-use-this
  initializeNodes() {
    const nodeArr = [];
    for (let y = 0; y < 10; y += 1) {
      for (let x = 0; x < 10; x += 1) {
        // Handle corner nodes first
        if (x === 0 && y === 0) {
          nodeArr.push({
            data: 'water',
            vertex: [0 + x, 0 + y],
            edges: { north: [0, 0], east: [0, 0], south: [null], west: [null] },
          });
        } else if (x === 0 && y === 9) {
          nodeArr.push({
            data: 'water',
            vertex: [0 + x, 0 + y],
            edges: { north: [null], east: [0, 0], south: [0, 0], west: [null] },
          });
        } else if (x === 9 && y === 0) {
          nodeArr.push({
            data: 'water',
            vertex: [0 + x, 0 + y],
            edges: { north: [0, 0], east: [null], south: [null], west: [0, 0] },
          });
        } else if (x === 9 && y === 9) {
          nodeArr.push({
            data: 'water',
            vertex: [0 + x, 0 + y],
            edges: { north: [null], east: [null], south: [0, 0], west: [0, 0] },
          });
        } else if (x === 0) {
          // Then handle border nodes
          nodeArr.push({
            data: 'water',
            vertex: [0 + x, 0 + y],
            edges: { north: [0, 0], east: [0, 0], south: [0, 0], west: [null] },
          });
        } else if (y === 0) {
          nodeArr.push({
            data: 'water',
            vertex: [0 + x, 0 + y],
            edges: { north: [0, 0], east: [0, 0], south: [null], west: [0, 0] },
          });
        } else if (x === 9) {
          nodeArr.push({
            data: 'water',
            vertex: [0 + x, 0 + y],
            edges: { north: [0, 0], east: [null], south: [0, 0], west: [0, 0] },
          });
        } else if (y === 9) {
          nodeArr.push({
            data: 'water',
            vertex: [0 + x, 0 + y],
            edges: { north: [null], east: [0, 0], south: [0, 0], west: [0, 0] },
          });
        } else {
          // Then handle nodes not on the border
          nodeArr.push({
            data: 'water',
            vertex: [0 + x, 0 + y],
            edges: { north: [0, 0], east: [0, 0], south: [0, 0], west: [0, 0] },
          });
        }
      }
    }
    return nodeArr;
  }
}
