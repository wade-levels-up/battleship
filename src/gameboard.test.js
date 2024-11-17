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
