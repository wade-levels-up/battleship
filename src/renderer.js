import createDOMElement from '../modules/createDOMEl';

const playerGrid = document.querySelector('.player-grid');

playerGrid.addEventListener('click', (e) => {
  const [target] = [e.target];
  target.style.filter = 'blur(2px)';
});

export default function renderGrid(nodes) {
  for (let i = 9; i >= 0; i -= 1) {
    for (let j = 0; j < 10; j += 1) {
      let index = `${i}${j}`;
      index = parseInt(index, 10);
      const gridSquare = createDOMElement(
        'div',
        `${nodes[index].data}
        ${nodes[index].vertex}`,
        'class',
        'gridSquare',
        'data-node',
        `${nodes[index]}`,
        'data-data',
        `${nodes[index].data}`,
      );
      if (gridSquare.dataset.data !== 'water') {
        gridSquare.classList.add('occupied');
      }
      playerGrid.appendChild(gridSquare);
    }
  }
}