import Ship from './ship';

test('Test that ship registers hits', () => {
  const ship1 = new Ship(3);
  ship1.takeHit();
  expect(ship1.hits).toBe(1);
  ship1.takeHit();
  expect(ship1.hits).toBe(2);
  ship1.takeHit();
  expect(ship1.hits).toBe(3);
});

test('Test that ship is size specified as parameter', () => {
  const ship2 = new Ship(5);
  expect(ship2.size).toBe(5);
});
