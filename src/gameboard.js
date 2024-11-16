export default class Gameboard {
  constructor() {
    this.nodes = this.initializeNodes();
  }

  // eslint-disable-next-line class-methods-use-this
  initializeNodes() {
    const nodeArr = [];
    for (let x = 0; x < 10; x += 1) {
      for (let y = 0; y < 10; y += 1) {
        nodeArr.push({ vertex: [0 + y, 0 + x] });
      }
    }
    return nodeArr;
  }
}
