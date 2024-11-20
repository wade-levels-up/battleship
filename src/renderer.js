import createDOMElement from '../modules/createDOMEl';

const playerGrid = document.querySelector('.player-grid');

playerGrid.addEventListener('click', (e) => {
  const target = e.target;
  target.style.backgroundColor = 'red';
});

export default function renderGrid(nodes) {
  for (let i = 9; i >= 0; i -= 1) {
    for (let j = 0; j < 10; j += 1) {
      const index = `${i}${j}`;
      const gridSquare = createDOMElement(
        'div',
        ``,
        'class',
        'gridSquare',
        'data-node',
        `${index}`,
      );
      playerGrid.appendChild(gridSquare);
    }
  }
}
