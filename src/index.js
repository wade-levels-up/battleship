import './style.css';
import Player from './player';
import { renderGridPlayer, renderGridComputer } from './renderer';

const player1 = new Player('real', true);
const player2 = new Player('computer', false);

const playerGrid = document.querySelector('.player-grid');
const computerGrid = document.querySelector('.computer-grid');
playerGrid.setAttribute('data-player', 'player');
computerGrid.setAttribute('data-player', 'computer');

function playRound() {
  if (player2.myTurn) {
    const randomAttackCoOrds = player2.getRandAttackCoOrds();
    player1.gameboard.receiveAttack(randomAttackCoOrds);
    playerGrid.innerHTML = '';
    renderGridPlayer(player1.gameboard.nodes, playerGrid);
    player2.myTurn = false;
    player1.myTurn = true;
    playRound();
  }
}

// Add event listener to computer's grid for clicking / attacking
computerGrid.addEventListener('click', (e) => {
  player1.myTurn = false;
  player2.myTurn = true;
  player2.gameboard.receiveAttack([
    +e.target.dataset.vertex[0],
    +e.target.dataset.vertex[2],
  ]);
  console.log([+e.target.dataset.vertex[0], +e.target.dataset.vertex[2]]);
  computerGrid.innerHTML = '';
  renderGridComputer(player2.gameboard.nodes, computerGrid, player2);
  playRound();
});

// Setup some default positions for player ships
player1.gameboard.placeShip('carrier', [0, 5], true);
player1.gameboard.placeShip('destroyer', [1, 3]);
player1.gameboard.placeShip('submarine', [2, 5]);
player1.gameboard.placeShip('cruiser', [7, 5], true);
player1.gameboard.placeShip('battleship', [0, 0]);

// Setup some default positions for computer ships
player2.gameboard.placeShip('carrier', [1, 5], true);
player2.gameboard.placeShip('destroyer', [7, 3]);
player2.gameboard.placeShip('submarine', [3, 5]);
player2.gameboard.placeShip('cruiser', [7, 5], true);
player2.gameboard.placeShip('battleship', [0, 3]);

// Initialize each board by rendering their nodes
renderGridPlayer(player1.gameboard.nodes, playerGrid);
renderGridComputer(player2.gameboard.nodes, computerGrid);
