import './style.css';
import Player from './player';
import { renderGridPlayer, renderGridComputer } from './renderer';

let player1;
let player2;

let tries = 100;

const commentary = document.querySelector('.commentary');
const screen = document.querySelector('.screenMode');
const playerGrid = document.querySelector('.player-grid');
const computerGrid = document.querySelector('.computer-grid');
playerGrid.setAttribute('data-player', 'player');
computerGrid.setAttribute('data-player', 'computer');

function revealDOMGameboard(gameboardContainer) {
  const gameboardElement = gameboardContainer;
  gameboardElement.style.opacity = '100';
  gameboardElement.style.zIndex = 0;
}

function hideDOMGameboard(gameboardContainer) {
  const gameboardElement = gameboardContainer;
  gameboardElement.style.opacity = '0';
  gameboardElement.style.zIndex = -1;
}

function setupNewGame() {
  commentary.innerText = 'Choose a position to attack';
  screen.innerText = 'View: Enemy Waters';

  player1 = new Player('real', true);
  player2 = new Player('computer', false);

  playerGrid.innerHTML = '';
  computerGrid.innerHTML = '';
  revealDOMGameboard(computerGrid);
  hideDOMGameboard(playerGrid);

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

  renderGridPlayer(player1.gameboard.nodes, playerGrid);
  renderGridComputer(player2.gameboard.nodes, computerGrid);
}

function playRound() {
  if (player2.myTurn) {
    tries += 1;
    let randomAttackCoOrds = player2.getRandAttackCoOrds();
    try {
      player1.gameboard.receiveAttack(randomAttackCoOrds);
      playerGrid.innerText = '';
      renderGridPlayer(player1.gameboard.nodes, playerGrid);
      setTimeout(() => {
        hideDOMGameboard(playerGrid);
        revealDOMGameboard(computerGrid);
        commentary.innerText = 'Choose a position to attack';
        screen.innerText = 'View: Enemy Waters';
      }, 1000);
      player2.myTurn = false;
      player1.myTurn = true;
      if (player1.gameboard.gameOver) {
        alert('You lose!');
        setupNewGame();
      }
    } catch (error) {
      randomAttackCoOrds = player2.getRandAttackCoOrds();
      playRound();
    }
    playRound();
  }
}

// Add event listener to computer's grid for clicking / attacking
computerGrid.addEventListener('click', (e) => {
  try {
    if (tries) {
      tries -= 1;
      commentary.innerText = '';
      player1.myTurn = false;
      player2.myTurn = true;
      player2.gameboard.receiveAttack([
        +e.target.dataset.vertex[0],
        +e.target.dataset.vertex[2],
      ]);
      computerGrid.innerHTML = '';
      renderGridComputer(player2.gameboard.nodes, computerGrid, player2);
      setTimeout(() => {
        hideDOMGameboard(computerGrid);
        revealDOMGameboard(playerGrid);
        screen.innerText = 'View: Your Fleet';
      }, 500);

      if (player2.gameboard.gameOver) {
        alert('You win!');
        setupNewGame();
      }

      setTimeout(() => {
        playRound();
      }, 1500);
    }
  } catch (error) {
    alert('Invalid position, try again');
    tries += 1;
  }
});

setupNewGame();
