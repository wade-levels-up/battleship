import Gameboard from './gameboard';

const gameboard1 = new Gameboard();
const [nodes] = [gameboard1.nodes];

test('Gameboard has an array for nodes', () => {
  expect(gameboard1.nodes).toBeTruthy();
});

test('Array of nodes has 100 items', () => {
  expect(gameboard1.nodes.length).toBe(100);
});

test(`Each node on the gameboard has coordinates for it's vertex position`, () => {
  nodes.forEach((element) => {
    expect(element.vertex).toBeTruthy();
  });
});

test(`Each nodes's vertex position is a combination of two numbers between 0-9`, () => {
  const boardRange = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  nodes.forEach((element) => {
    expect(
      boardRange.includes(element.vertex[0]) &&
        boardRange.includes(element.vertex[1]),
    ).toBeTruthy();
  });
});

test(`Each node has unique vertex coordinates starting at [0,0] through to [9,9]`, () => {
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
  nodes.forEach((node) => {
    expect(node.data).toBeTruthy();
  });
});

test('Nodes edges contain values', () => {
  nodes.forEach((node) => {
    expect(node.edges.north).toBeTruthy();
    expect(node.edges.east).toBeTruthy();
    expect(node.edges.south).toBeTruthy();
    expect(node.edges.west).toBeTruthy();
  });
});

test('x and y coordinates for nodes correspond with x and y axis', () => {
  expect(nodes[12].vertex[0]).toBe(2);
  expect(nodes[12].vertex[1]).toBe(1);
  expect(nodes[25].vertex[0]).toBe(5);
  expect(nodes[25].vertex[1]).toBe(2);
});

test(`Border nodes have null in one or more edges, otherwise it's not a border node and no edge should be null`, () => {
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
  expect(nodes[11].edges.north[1]).toBe(nodes[11].vertex[1] + 1);
  expect(nodes[11].edges.east[0]).toBe(nodes[11].vertex[0] + 1);
  expect(nodes[11].edges.south[1]).toBe(nodes[11].vertex[1] - 1);
  expect(nodes[11].edges.west[0]).toBe(nodes[11].vertex[0] - 1);
});

test('Gameboard must be able to place ships at specific coordinates', () => {
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

  gameboard1.placeShip('battleship', [2, 1], false);
  expect(gameboard1.nodes[12].data).toBe('battleship');
  expect(gameboard1.nodes[13].data).toBe('battleship');
  expect(gameboard1.nodes[14].data).toBe('battleship');
  expect(gameboard1.nodes[15].data).toBe('battleship');

  // Carrier Placement -----
  gameboard1.placeShip('carrier', [6, 4], true);
  expect(gameboard1.nodes[46].data).toBe('carrier');
  expect(gameboard1.nodes[56].data).toBe('carrier');
  expect(gameboard1.nodes[66].data).toBe('carrier');
  expect(gameboard1.nodes[76].data).toBe('carrier');
  expect(gameboard1.nodes[86].data).toBe('carrier');
});

test('If a ship is placed in a position where any part of it exceeds the board boundaries or crosses a ship, all nodes where it was tried to be placed remain as they were', () => {
  // Intentionally place a long Carrier ship at top right of board so it exceeds top boundary by two
  gameboard1.placeShip('carrier', [9, 7], true);
  expect(gameboard1.nodes[79].data).toBe('water');
  expect(gameboard1.nodes[89].data).toBe('water');
  expect(gameboard1.nodes[99].data).toBe('water');
  // Intentionally place a long Battleship at right side of board so it exceeds right boundary by one
  gameboard1.placeShip('battleship', [7, 1]);
  expect(gameboard1.nodes[17].data).toBe('water');
  expect(gameboard1.nodes[18].data).toBe('water');
  expect(gameboard1.nodes[19].data).toBe('water');
});

test('Test that ships cannot overlap other ships', () => {
  const gameboard2 = new Gameboard();
  // Intentionally create a Carrier and Battleship that intersect
  // The Carrier is placed first, then the Battleship. As the Battleship intersects the Carrier it's never placed.
  // So we expect the positions where it would've been placed to remain as they are
  gameboard2.placeShip('carrier', [3, 5]);
  expect(gameboard2.nodes[53].data).toBe('carrier');
  expect(gameboard2.nodes[57].data).toBe('carrier');
  gameboard1.placeShip('battleship', [4, 3], true);
  expect(gameboard2.nodes[34].data).toBe('water');
  expect(gameboard2.nodes[44].data).toBe('water');
  expect(gameboard2.nodes[54].data).toBe('carrier');
  expect(gameboard2.nodes[64].data).toBe('water');
});
