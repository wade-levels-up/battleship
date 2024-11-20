import Player from './player';

test('Player can either be real or a computer', () => {
  const player1 = new Player('real');
  expect(player1.type).toBe('real');
});
