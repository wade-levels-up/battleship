import Ship from './ship';

test('Ship registers hits', () => {
  const ship1 = new Ship(3);
  ship1.takeHit();
  expect(ship1.hits).toBe(1);
  ship1.takeHit();
  expect(ship1.hits).toBe(2);
  ship1.takeHit();
  expect(ship1.hits).toBe(3);
});

test('Ship size can be set', () => {
  const ship2 = new Ship(5);
  expect(ship2.size).toBe(5);
});

test('Ships can be sunk', () => {
  const ship0 = new Ship(3);
  ship0.takeHit();
  ship0.takeHit();
  ship0.takeHit();
  expect(ship0.sunk).toBe(true);
});

test(`Ships aren't sunk if enough hits aren't taken`, () => {
  const ship1 = new Ship(3);
  expect(ship1.sunk).toBe(false);
});
