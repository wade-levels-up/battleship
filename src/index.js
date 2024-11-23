import './style.css';
import Player from './player';
import { renderGridPlayer, renderGridComputer } from './renderer';

let player1;
let player2;

let tries = 1;
let activeView = 'Enemy Waters';

const body = document.querySelector('body');
const commentary = document.querySelector('.commentary');
const screen = document.querySelector('.screenMode');
const playerGrid = document.querySelector('.player-grid');
const computerGrid = document.querySelector('.computer-grid');
const switchView = document.querySelector('.changeView');
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

switchView.addEventListener('click', () => {
  if (activeView === 'Enemy Waters') {
    activeView = 'Your Fleet';
    revealDOMGameboard(playerGrid);
    hideDOMGameboard(computerGrid);
    screen.innerText = 'View: Your Fleet';
    commentary.innerText = `Switch view to choose attack`;
  } else {
    activeView = 'Enemy Waters';
    revealDOMGameboard(computerGrid);
    hideDOMGameboard(playerGrid);
    screen.innerText = 'View: Enemy Waters';
    commentary.innerText = 'Choose a position to attack';
  }
});

function setupNewGame() {
  player1 = new Player('real', true);
  player2 = new Player('computer', false);

  commentary.innerText = 'Choose a position to attack';
  screen.innerText = 'View: Enemy Waters';
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

  // Clear DOM elements then render gameboard nodes
  playerGrid.innerHTML = '';
  computerGrid.innerHTML = '';
  renderGridPlayer(player1.gameboard.nodes, playerGrid);
  renderGridComputer(player2.gameboard.nodes, computerGrid);
}

function playRound() {
  // If it's the computer's turn..
  if (player2.myTurn) {
    tries += 1;
    let attackCoOrds = player1.getAttackCoOrds();
    try {
      // Try a random attack coordinate on the players board
      player1.gameboard.receiveAttack(attackCoOrds);
      // Animate shake on hit
      player1.gameboard.nodes.forEach((node) => {
        if (
          node.vertex[0] === attackCoOrds[0] &&
          node.vertex[1] === attackCoOrds[1]
        ) {
          player1.lastAttackedPosition = node;
          if (node.data === 'hit') {
            player1.resultOfLastMove = 'hit';
            player1.attackMode = 'destroy';
            body.style.animation = 'horizontal-shaking 0.20s';
            navigator.vibrate(200);
            setTimeout(() => {
              body.style.animation = 'none';
            }, 400);
          } else {
            player1.resultOfLastMove = 'miss';
            player1.attackMode = 'random';
          }
        }
      });
      // Clear the player's grid and re-render it
      playerGrid.innerHTML = '';
      renderGridPlayer(player1.gameboard.nodes, playerGrid);

      // Set a delay that hides the players grid, reveals the computers grid and updates the commentary + view
      if (player1.gameboard.gameOver) {
        commentary.innerText = `You Lose!`;
        return;
      }
      setTimeout(() => {
        hideDOMGameboard(playerGrid);
        revealDOMGameboard(computerGrid);
        commentary.innerText = 'Choose a position to attack';
        screen.innerText = 'View: Enemy Waters';
      }, 600);

      // Switch the player's turn and check if the game is over
      player2.myTurn = false;
      player1.myTurn = true;
    } catch (error) {
      // If the receiveAttack function throws an error because the attack is invalid, re-run the playRound function and set new random coordinates
      attackCoOrds = player2.getAttackCoOrds();
      playRound();
    }
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
      // Animate shake on hit
      player2.gameboard.nodes.forEach((node) => {
        if (
          node.vertex[0] === +e.target.dataset.vertex[0] &&
          node.vertex[1] === +e.target.dataset.vertex[2]
        ) {
          if (node.data === 'hit') {
            body.style.animation = 'horizontal-shaking 0.20s';
            navigator.vibrate(200);
            setTimeout(() => {
              body.style.animation = 'none';
            }, 400);
          }
        }
      });
      computerGrid.innerHTML = '';
      renderGridComputer(player2.gameboard.nodes, computerGrid, player2);
      if (player2.gameboard.gameOver) {
        commentary.innerText = `You Win!`;
        return;
      }
      setTimeout(() => {
        hideDOMGameboard(computerGrid);
        revealDOMGameboard(playerGrid);
        screen.innerText = 'View: Your Fleet';
      }, 500);

      setTimeout(() => {
        playRound();
      }, 1000);
    }
  } catch (error) {
    alert('Invalid position, try again');
    tries += 1;
  }
});

setupNewGame();
