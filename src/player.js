import Gameboard from './gameboard';

export default class Player {
  constructor(type, turn = false) {
    this.type = type;
    this.gameboard = new Gameboard();
    this.myTurn = turn;
  }

  switchTurn() {
    if (this.myTurn === false) {
      this.myTurn = true;
    } else {
      this.myTurn = false;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getRandAttackCoOrds() {
    const attackX = Math.floor(Math.random() * 10);
    const attackY = Math.floor(Math.random() * 10);
    return [attackX, attackY];
  }
}
