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

test(`Each Nodes's vertex position is a combination of numbers between 0-9`, () => {
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
