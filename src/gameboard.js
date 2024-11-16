export default class Gameboard {
  constructor() {
    this.nodes = this.initializeNodes();
  }

  // eslint-disable-next-line class-methods-use-this
  initializeNodes() {
    const nodeArr = [];
    for (let i = 0; i < 100; i += 1) nodeArr.push([]);
    return nodeArr;
  }
}
