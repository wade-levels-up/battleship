import createDOMElement from '../modules/createDOMEl';

export function renderGridPlayer(nodes, parent) {
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
        'data-vertex',
        `${nodes[index].vertex}`,
      );
      if (gridSquare.dataset.data !== 'water') {
        gridSquare.classList.add('occupied');
      }
      if (gridSquare.dataset.data === 'hit') {
        gridSquare.classList.add('hit');
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
        `${nodes[index].data}
        ${nodes[index].vertex}`,
        'class',
        'gridSquare',
        'data-node',
        `${nodes[index]}`,
        'data-data',
        `${nodes[index].data}`,
        'data-vertex',
        `${nodes[index].vertex}`,
      );
      if (gridSquare.dataset.data === 'hit') {
        gridSquare.classList.add('hit');
      }
      parent.appendChild(gridSquare);
    }
  }
}
