const Ship = require("./Ship");

test("Ship function returns correct length of carrier", () => {
  expect(Ship("carrier").length).toBe(5);
});

test("Ship function returns correct length of battleship", () => {
  expect(Ship("battleship").length).toBe(4);
});

test("Ship function returns correct length of destroyer", () => {
  expect(Ship("destroyer").length).toBe(3);
});

test("Ship function returns correct length of submarine", () => {
  expect(Ship("submarine").length).toBe(3);
});

test("Ship function returns correct length of patrolBoat", () => {
  expect(Ship("patrolBoat").length).toBe(2);
});

test("Ship function marks location as hit", () => {
  let destroyer = Ship("destroyer");
  destroyer.hit(4);
  expect(destroyer.hitArray[4]).toBe("hit");
});

test("Ship function does not hit the same location twice", () => {
  let destroyer = Ship("destroyer");
  destroyer.hit(4);
  expect(destroyer.hit(4)).toBe("This location has already been hit");
});

test("Ship function returns when the ship is sunk", () => {
  let patrolBoat = Ship("patrolBoat");
  patrolBoat.hit(0);
  patrolBoat.hit(1);
  expect(patrolBoat.isSunk()).toBe(true);
});
