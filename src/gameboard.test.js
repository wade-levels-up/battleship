import Gameboard from './gameboard';

test('Gameboard has an array for nodes', () => {
  const gameboard1 = new Gameboard();
  expect(gameboard1.nodes).toBeTruthy();
});

test('Array of nodes has 100 items', () => {
  const gameboard1 = new Gameboard();
  expect(gameboard1.nodes.length).toBe(100);
});
