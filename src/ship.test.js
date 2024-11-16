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

test('Test that ship size can be set', () => {
  const ship2 = new Ship(5);
  expect(ship2.size).toBe(5);
});

test('Test that ships can be sunk', () => {
  const ship0 = new Ship(3);
  ship0.takeHit();
  ship0.takeHit();
  ship0.takeHit();
  expect(ship0.sunk).toBe(true);
});

test(`Test that ships aren't sunk if enough hits aren't taken`, () => {
  const ship1 = new Ship(3);
  expect(ship1.sunk).toBe(false);
});
