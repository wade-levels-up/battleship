import Gameboard from './gameboard';

export default class Player {
  constructor(type, turn = false) {
    this.type = type;
    this.gameboard = new Gameboard();
    this.myTurn = turn;
    this.attackMode = 'random';
    this.lastAttackedPosition = null;
    this.resultOfLastMove = 'miss';
  }

  switchTurn() {
    if (this.myTurn === false) {
      this.myTurn = true;
    } else {
      this.myTurn = false;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  validateNodePosition(coords) {
    let nodeToValidate = null;
    this.gameboard.nodes.forEach((node) => {
      if (node.vertex[0] === coords[0] && node.vertex[1] === coords[1]) {
        nodeToValidate = node;
      }
    });
    if (nodeToValidate) {
      if (nodeToValidate.data !== 'hit' && nodeToValidate.data !== 'miss') {
        return true;
      }
    }
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  getAttackCoOrds() {
    let attackX = null;
    let attackY = null;

    if (this.attackMode === 'destroy' && this.resultOfLastMove === 'hit') {
      // If an edge exists to the east, that's the next attack coordinate
      if (
        this.lastAttackedPosition.edges.east &&
        this.validateNodePosition([
          this.lastAttackedPosition.edges.east[0],
          this.lastAttackedPosition.edges.east[1],
        ])
      ) {
        [attackX] = [this.lastAttackedPosition.edges.east[0]];
        [attackY] = [this.lastAttackedPosition.edges.east[1]];
        return [attackX, attackY];
      }
      // West
      if (
        this.lastAttackedPosition.edges.west &&
        this.validateNodePosition([
          this.lastAttackedPosition.edges.west[0],
          this.lastAttackedPosition.edges.west[1],
        ])
      ) {
        [attackX] = [this.lastAttackedPosition.edges.west[0]];
        [attackY] = [this.lastAttackedPosition.edges.west[1]];
        return [attackX, attackY];
      }
      // North
      if (
        this.lastAttackedPosition.edges.north &&
        this.validateNodePosition([
          this.lastAttackedPosition.edges.north[0],
          this.lastAttackedPosition.edges.north[1],
        ])
      ) {
        [attackX] = [this.lastAttackedPosition.edges.north[0]];
        [attackY] = [this.lastAttackedPosition.edges.north[1]];
        return [attackX, attackY];
      }
      // South
      if (
        this.lastAttackedPosition.edges.south &&
        this.validateNodePosition([
          this.lastAttackedPosition.edges.south[0],
          this.lastAttackedPosition.edges.south[1],
        ])
      ) {
        [attackX] = [this.lastAttackedPosition.edges.south[0]];
        [attackY] = [this.lastAttackedPosition.edges.south[1]];
        return [attackX, attackY];
      }
      this.resultOfLastMove = 'miss';
      this.attackMode = 'random';
    }

    attackX = Math.floor(Math.random() * 10);
    attackY = Math.floor(Math.random() * 10);

    return [attackX, attackY];
  }
}
