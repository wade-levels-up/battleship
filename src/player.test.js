import Player from './player';

test('Player can either be real or a computer', () => {
  const player1 = new Player('real');
  const player2 = new Player('computer');

  expect(player1.type).toBe('real');
  expect(player2.type).toBe('computer');
});

test('Players contain their own gameboard', () => {
  const player1 = new Player();
  expect(player1.gameboard).toBeTruthy();
});
