export default class Node {
  constructor(vertex, edges = [0, 0], isValid = true, data = 'water') {
    this.data = data;
    this.vertex = vertex;
    this.edges = this.createCompassEdgeObject(edges);
    this.isValid = isValid;
  }

  // eslint-disable-next-line class-methods-use-this
  createCompassEdgeObject(edgeArray) {
    const edgeObj = {};
    [edgeObj.north, edgeObj.east, edgeObj.south, edgeObj.west] = [...edgeArray];
    return edgeObj;
  }
}
