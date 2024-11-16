import Ship from './ship';

test('Test that ship registers hits', () => {
  const ship1 = new Ship(3);
  ship1.takeHit();
  expect(ship1.hits).toBe(1);
  ship1.takeHit();
  expect(ship1.hits).toBe(2);
});
