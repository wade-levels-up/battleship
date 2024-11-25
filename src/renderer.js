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
        if (gridSquare.dataset.data === 'destroyer') {
          gridSquare.innerText = 'Destr';
        }
        if (gridSquare.dataset.data === 'cruiser') {
          gridSquare.innerText = 'Cruis';
        }
        if (gridSquare.dataset.data === 'submarine') {
          gridSquare.innerText = 'Sub';
        }
        if (gridSquare.dataset.data === 'battleship') {
          gridSquare.innerText = 'BShip';
        }
        if (gridSquare.dataset.data === 'carrier') {
          gridSquare.innerText = 'Carri';
        }
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

export function revealDOMGameboard(gameboardContainer) {
  const gameboardElement = gameboardContainer;
  gameboardElement.style.opacity = '100';
  gameboardElement.style.zIndex = 0;
}

export function hideDOMGameboard(gameboardContainer) {
  const gameboardElement = gameboardContainer;
  gameboardElement.style.opacity = '0';
  gameboardElement.style.zIndex = -1;
}
