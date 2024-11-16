export default class Ship {
  constructor(size) {
    this.size = size;
    this.hits = 0;
  }

  takeHit() {
    this.hits += 1;
  }
}
