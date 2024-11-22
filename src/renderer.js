import createDOMElement from '../modules/createDOMEl';

export function renderGridPlayer(nodes, parent) {
  for (let i = 9; i >= 0; i -= 1) {
    for (let j = 0; j < 10; j += 1) {
      let index = `${i}${j}`;
      index = parseInt(index, 10);
      const gridSquare = createDOMElement(
        'div',
        ``,
        'class',
        'gridSquare',
        'data-node',
        `${nodes[index]}`,
        'data-data',
        `${nodes[index].data}`,
        'data-vertex',
        `${nodes[index].vertex}`,
      );
      gridSquare.style.filter = 'none';

      if (gridSquare.dataset.data !== 'water') {
        gridSquare.innerText = gridSquare.dataset.data;
        gridSquare.style.filter = 'hue-rotate(200deg)';
      }
      if (gridSquare.dataset.data === 'hit') {
        gridSquare.style.filter = 'hue-rotate(140deg)';
        gridSquare.innerText = 'HIT';
      }

      if (gridSquare.dataset.data === 'miss') {
        gridSquare.style.filter = 'grayscale()';
        gridSquare.style.opacity = '50%';
        gridSquare.innerText = 'MISS';
      }

      if (
        gridSquare.dataset.data === 'destroyer' ||
        gridSquare.dataset.data === 'cruiser' ||
        gridSquare.dataset.data === 'submarine' ||
        gridSquare.dataset.data === 'battleship' ||
        gridSquare.dataset.data === 'carrier'
      ) {
        gridSquare.innerText = gridSquare.dataset.data;
      }

      parent.appendChild(gridSquare);
    }
  }
}

export function renderGridComputer(nodes, parent) {
  for (let i = 9; i >= 0; i -= 1) {
    for (let j = 0; j < 10; j += 1) {
      let index = `${i}${j}`;
      index = parseInt(index, 10);
      const gridSquare = createDOMElement(
        'div',
        ``,
        'class',
        'gridSquare',
        'data-node',
        `${nodes[index]}`,
        'data-data',
        `${nodes[index].data}`,
        'data-vertex',
        `${nodes[index].vertex}`,
      );

      gridSquare.style.filter = 'none';

      if (gridSquare.dataset.data === 'hit') {
        gridSquare.style.filter = 'hue-rotate(140deg)';
        gridSquare.innerText = 'HIT';
      }

      if (gridSquare.dataset.data === 'miss') {
        gridSquare.style.filter = 'grayscale()';
        gridSquare.style.opacity = '50%';
        gridSquare.innerText = 'MISS';
      }

      parent.appendChild(gridSquare);
    }
  }
}
