import Gameboard from './gameboard';

export default class Player {
  constructor(type, turn = false) {
    this.type = type;
    this.gameboard = new Gameboard();
    this.myTurn = turn;
    this.attackMode = 'random';
    this.lastHitPosition = null;
    this.lastAttackedPosition = null;
    this.resultOfLastMove = 'miss';
    this.movesMade = 0;
  }

  incrementMoves() {
    this.movesMade += 1;
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

  huntWeakenedShip() {
    let target;
    const coOrds = [];
    this.gameboard.ships.forEach((ship) => {
      if (!ship.sunk && ship.hits >= 2) {
        target = ship.data;
      }
    });
    this.gameboard.nodes.forEach((node) => {
      if (node.data === target) {
        coOrds.push(node.vertex[0]);
        coOrds.push(node.vertex[1]);
      }
    });
    return coOrds;
  }

  aShipHasBeenHitTwice() {
    let result = false;
    this.gameboard.ships.forEach((ship) => {
      if (ship.hits >= 2 && !ship.sunk) {
        result = true;
      }
    });
    return result;
  }

  getCoordsOfARandomShip() {
    const coords = [];
    this.gameboard.nodes.forEach((node) => {
      if (
        node.data !== 'water' &&
        node.data !== 'hit' &&
        node.data !== 'miss'
      ) {
        coords.push([node.vertex[0], node.vertex[1]]);
      }
    });
    const randInt = Math.floor(Math.random() * coords.length);
    return coords[randInt];
  }

  // eslint-disable-next-line class-methods-use-this
  getAttackCoOrds() {
    let attackX = null;
    let attackY = null;
    if (this.aShipHasBeenHitTwice()) {
      const trueShotCoOrds = this.huntWeakenedShip();
      [attackX, attackY] = [trueShotCoOrds[0], trueShotCoOrds[1]];
      return [attackX, attackY];
    }

    if (this.lastAttackedPosition) {
      if (this.lastAttackedPosition.data === 'miss') {
        this.resultOfLastMove = 'miss';
      }
    }

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
      // Otherwise attack North
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
      // Otherwise attack West
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
      // Otherwise attack South
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
    }

    if (
      this.attackMode === 'destroy' &&
      this.resultOfLastMove === 'miss' &&
      this.lastHitPosition
    ) {
      if (
        this.lastHitPosition.edges.east &&
        this.validateNodePosition([
          this.lastHitPosition.edges.south[0],
          this.lastHitPosition.edges.south[1],
        ])
      ) {
        [attackX] = [this.lastHitPosition.edges.south[0]];
        [attackY] = [this.lastHitPosition.edges.south[1]];
        return [attackX, attackY];
      }
      // Otherwise attack West
      if (
        this.lastHitPosition.edges.west &&
        this.validateNodePosition([
          this.lastHitPosition.edges.west[0],
          this.lastHitPosition.edges.west[1],
        ])
      ) {
        [attackX] = [this.lastHitPosition.edges.west[0]];
        [attackY] = [this.lastHitPosition.edges.west[1]];
        return [attackX, attackY];
      }
      // Otherwise attack North
      if (
        this.lastHitPosition.edges.north &&
        this.validateNodePosition([
          this.lastHitPosition.edges.north[0],
          this.lastHitPosition.edges.north[1],
        ])
      ) {
        [attackX] = [this.lastHitPosition.edges.north[0]];
        [attackY] = [this.lastHitPosition.edges.north[1]];
        return [attackX, attackY];
      }
      // Otherwise attack South
      if (
        this.lastHitPosition.edges.east &&
        this.validateNodePosition([
          this.lastHitPosition.edges.east[0],
          this.lastHitPosition.edges.east[1],
        ])
      ) {
        [attackX] = [this.lastHitPosition.edges.east[0]];
        [attackY] = [this.lastHitPosition.edges.east[1]];
        return [attackX, attackY];
      }
    }

    if (this.movesMade > 20) {
      const randInt = Math.floor(Math.random() * 2 + 1);
      if (randInt === 1) {
        const coOrds = this.getCoordsOfARandomShip();
        [attackX, attackY] = [coOrds[0], coOrds[1]];
        return [attackX, attackY];
      }
    }

    attackX = Math.floor(Math.random() * 10);
    attackY = Math.floor(Math.random() * 10);

    return [attackX, attackY];
  }
}
