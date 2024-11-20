import './style.css';
import Player from './player';
import renderGrid from './renderer';

const player1 = new Player('real');

renderGrid(player1.gameboard.nodes);
