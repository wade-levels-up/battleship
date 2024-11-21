import './style.css';
import Player from './player';
import renderGrid from './renderer';

const player1 = new Player('real');

player1.gameboard.placeShip('carrier', [0, 5], true);
player1.gameboard.placeShip('destroyer', [1, 3]);
player1.gameboard.placeShip('submarine', [2, 5]);
player1.gameboard.placeShip('cruiser', [7, 5], true);
player1.gameboard.placeShip('battleship', [0, 0]);
console.table(player1.gameboard.nodes);
renderGrid(player1.gameboard.nodes);
