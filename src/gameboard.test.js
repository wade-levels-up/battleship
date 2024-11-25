import Gameboard from './gameboard';

test('Gameboard has an array for nodes', () => {
  const gameboard1 = new Gameboard();
  expect(gameboard1.nodes).toBeTruthy();
});

test('Array of nodes has 100 items', () => {
  const gameboard1 = new Gameboard();
  expect(gameboard1.nodes.length).toBe(100);
});

test(`Each node on the gameboard has coordinates for it's vertex position`, () => {
  const gameboard1 = new Gameboard();
  const [nodes] = [gameboard1.nodes];
  nodes.forEach((element) => {
    expect(element.vertex).toBeTruthy();
  });
});

test(`Each nodes's vertex position is a combination of two numbers between 0-9`, () => {
  const gameboard1 = new Gameboard();
  const [nodes] = [gameboard1.nodes];
  const boardRange = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  nodes.forEach((element) => {
    expect(
      boardRange.includes(element.vertex[0]) &&
        boardRange.includes(element.vertex[1]),
    ).toBeTruthy();
  });
});

test(`Each node has unique vertex coordinates starting at [0,0] through to [9,9]`, () => {
  const gameboard1 = new Gameboard();
  // Test first node
  expect(gameboard1.nodes[0].vertex[0]).toBe(0);
  expect(gameboard1.nodes[0].vertex[0]).toBe(0);
  // Test middle node
  expect(gameboard1.nodes[55].vertex[0]).toBe(5);
  expect(gameboard1.nodes[55].vertex[0]).toBe(5);
  // Test last node
  expect(gameboard1.nodes[99].vertex[0]).toBe(9);
  expect(gameboard1.nodes[99].vertex[1]).toBe(9);
});

test('Each node has a data property with a value', () => {
  const gameboard1 = new Gameboard();
  const [nodes] = [gameboard1.nodes];
  nodes.forEach((node) => {
    expect(node.data).toBeTruthy();
  });
});

test('Nodes edges contain values', () => {
  const gameboard1 = new Gameboard();
  const [nodes] = [gameboard1.nodes];
  nodes.forEach((node) => {
    expect(node.edges.north).toBeTruthy();
    expect(node.edges.east).toBeTruthy();
    expect(node.edges.south).toBeTruthy();
    expect(node.edges.west).toBeTruthy();
  });
});

test('x and y coordinates for nodes correspond with x and y axis', () => {
  const gameboard1 = new Gameboard();
  const [nodes] = [gameboard1.nodes];
  expect(nodes[12].vertex[0]).toBe(2);
  expect(nodes[12].vertex[1]).toBe(1);
  expect(nodes[25].vertex[0]).toBe(5);
  expect(nodes[25].vertex[1]).toBe(2);
});

test(`Border nodes have null in one or more edges, otherwise it's not a border node and no edge should be null`, () => {
  const gameboard1 = new Gameboard();
  const [nodes] = [gameboard1.nodes];
  nodes.forEach((node) => {
    if (node.vertex[0] === 0) {
      // If node is on the left border, west edge should be null
      expect(node.edges.west).toEqual([null]);
    } else if (node.vertex[0] === 9) {
      // If node is on the right border, east edge should be null
      expect(node.edges.east).toEqual([null]);
    } else if (node.vertex[1] === 0) {
      // If node is on the bottom border, south edge should be null
      expect(node.edges.south).toEqual([null]);
    } else if (node.vertex[1] === 9) {
      // If node is on the top border, north edge should be null
      expect(node.edges.north).toEqual([null]);
    } else {
      // node isn't on a border, therefore no edge should be null
      expect(node.edges.north).not.toEqual([null]);
      expect(node.edges.east).not.toEqual([null]);
      expect(node.edges.south).not.toEqual([null]);
      expect(node.edges.west).not.toEqual([null]);
    }
  });
});

test(`If a node's edge isn't null, the edge must be either one of the vertex coordinates + 1 or - 1 depending on direction`, () => {
  const gameboard1 = new Gameboard();
  const [nodes] = [gameboard1.nodes];
  expect(nodes[11].edges.north[1]).toBe(nodes[11].vertex[1] + 1);
  expect(nodes[11].edges.east[0]).toBe(nodes[11].vertex[0] + 1);
  expect(nodes[11].edges.south[1]).toBe(nodes[11].vertex[1] - 1);
  expect(nodes[11].edges.west[0]).toBe(nodes[11].vertex[0] - 1);
});

test('Gameboard must be able to place ships at specific coordinates', () => {
  const gameboard1 = new Gameboard();
  // Destroyer Placement -----
  gameboard1.placeShip('destroyer', [0, 6], true);
  expect(gameboard1.nodes[60].data).toBe('destroyer');
  expect(gameboard1.nodes[70].data).toBe('destroyer');

  // Cruiser Placement -----
  gameboard1.placeShip('cruiser', [1, 3], false);
  expect(gameboard1.nodes[31].data).toBe('cruiser');
  expect(gameboard1.nodes[32].data).toBe('cruiser');
  expect(gameboard1.nodes[33].data).toBe('cruiser');

  // Submarine Placement -----
  gameboard1.placeShip('submarine', [9, 4], true);
  expect(gameboard1.nodes[49].data).toBe('submarine');
  expect(gameboard1.nodes[59].data).toBe('submarine');
  expect(gameboard1.nodes[69].data).toBe('submarine');

  // Battleship Placement -----

  gameboard1.placeShip('battleship', [0, 0], false);
  expect(gameboard1.nodes[0].data).toBe('battleship');
  expect(gameboard1.nodes[1].data).toBe('battleship');
  expect(gameboard1.nodes[2].data).toBe('battleship');
  expect(gameboard1.nodes[3].data).toBe('battleship');

  // Carrier Placement -----
  gameboard1.placeShip('carrier', [6, 4], true);
  expect(gameboard1.nodes[46].data).toBe('carrier');
  expect(gameboard1.nodes[56].data).toBe('carrier');
  expect(gameboard1.nodes[66].data).toBe('carrier');
  expect(gameboard1.nodes[76].data).toBe('carrier');
  expect(gameboard1.nodes[86].data).toBe('carrier');
});

test('If a ship is placed in a position where any part of it exceeds the board boundaries or crosses a ship, all nodes where it was tried to be placed remain as they were', () => {
  const gameboard1 = new Gameboard();
  // Intentionally place a long Carrier ship at top right of board so it exceeds top boundary by two
  expect(() => gameboard1.placeShip('carrier', [9, 7], true)).toThrow(Error);
  // Intentionally place a long Battleship at right side of board so it exceeds right boundary by one
  expect(() => gameboard1.placeShip('battleship', [7, 1])).toThrow(Error);
  expect(() => gameboard1.placeShip('cruiser', [9, 0])).toThrow(Error);
});

test('Test that ships cannot overlap other ships', () => {
  const gameboard2 = new Gameboard();
  // Intentionally create a Carrier and Battleship that intersect
  gameboard2.placeShip('carrier', [3, 5]);
  expect(() => gameboard2.placeShip('battleship', [4, 3], true)).toThrow(Error);
});

test('Gameboard tracks positions that have been attacked and will not allow attacked positions to be attacked again', () => {
  const gameboard1 = new Gameboard();
  gameboard1.receiveAttack([5, 5]);
  expect(gameboard1.nodes[55].data).toBe('miss');
  expect(() => gameboard1.receiveAttack([5, 5])).toThrow(Error);
  gameboard1.receiveAttack([8, 5]);
  expect(gameboard1.nodes[58].data).toBe('miss');
  expect(() => gameboard1.receiveAttack([5, 5])).toThrow(Error);
});

test('Gameboard throws an error when position being attacked is out of bounds', () => {
  const gameboard1 = new Gameboard();
  expect(() => gameboard1.receiveAttack([10, 15])).toThrow(Error);
});

test('Gameboard tracks hits and misses', () => {
  const gameboard1 = new Gameboard();
  gameboard1.placeShip('battleship', [1, 3], true);
  gameboard1.receiveAttack([1, 3]);
  expect(gameboard1.nodes[31].data).toBe('hit');
  gameboard1.receiveAttack([1, 4]);
  expect(gameboard1.nodes[41].data).toBe('hit');
  gameboard1.receiveAttack([2, 3]);
  expect(gameboard1.nodes[32].data).toBe('miss');
});

test('Gameboard keeps track of when a ship is hit', () => {
  const gameboard1 = new Gameboard();
  gameboard1.placeShip('battleship', [1, 3], true);
  gameboard1.receiveAttack([1, 3]);
  expect(gameboard1.ships[3].hits).toBe(1);
  gameboard1.receiveAttack([1, 4]);
  expect(gameboard1.ships[3].hits).toBe(2);
  // expect(() => gameboard1.receiveAttack([1, 4])).toThrow(Error);
  expect(gameboard1.nodes[41].data).toBe('hit');
  expect(gameboard1.ships[3].hits).toBe(2);
});

test('Gameboard tracks when a ship is sunk', () => {
  const gameboard1 = new Gameboard();
  gameboard1.placeShip('battleship', [1, 3], true);
  gameboard1.receiveAttack([1, 3]);
  gameboard1.receiveAttack([1, 4]);
  gameboard1.receiveAttack([1, 5]);
  gameboard1.receiveAttack([1, 6]);
  expect(gameboard1.ships[3].sunk).toBe(true);
});

test('Gameboard knows when game is over and all ships are sunk', () => {
  const gameboard1 = new Gameboard();

  // Check gameover is false
  expect(gameboard1.gameOver).toBe(false);

  // Place the ships
  gameboard1.placeShip('destroyer', [0, 6], true);
  gameboard1.placeShip('cruiser', [9, 4], true);
  gameboard1.placeShip('submarine', [2, 1]);
  gameboard1.placeShip('battleship', [6, 4], true);
  gameboard1.placeShip('carrier', [1, 3]);

  // Sink the destroyer
  gameboard1.receiveAttack([0, 6]);
  gameboard1.receiveAttack([0, 7]);

  // Sink the cruiser
  gameboard1.receiveAttack([9, 4]);
  gameboard1.receiveAttack([9, 5]);
  gameboard1.receiveAttack([9, 6]);

  // Sink the submarine
  gameboard1.receiveAttack([2, 1]);
  gameboard1.receiveAttack([3, 1]);
  gameboard1.receiveAttack([4, 1]);

  // Sink the battleship
  gameboard1.receiveAttack([6, 4]);
  gameboard1.receiveAttack([6, 5]);
  gameboard1.receiveAttack([6, 6]);
  gameboard1.receiveAttack([6, 7]);

  // Sink the carrier
  gameboard1.receiveAttack([1, 3]);
  gameboard1.receiveAttack([2, 3]);
  gameboard1.receiveAttack([3, 3]);
  gameboard1.receiveAttack([4, 3]);
  gameboard1.receiveAttack([5, 3]);

  // Check all ships are sunk
  expect(gameboard1.ships[0].sunk).toBe(true);
  expect(gameboard1.ships[1].sunk).toBe(true);
  expect(gameboard1.ships[2].sunk).toBe(true);
  expect(gameboard1.ships[3].sunk).toBe(true);
  expect(gameboard1.ships[4].sunk).toBe(true);

  // Check gameover is true
  expect(gameboard1.gameOver).toBe(true);
});
