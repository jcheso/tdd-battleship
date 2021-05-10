const Gameboard = require("./Gameboard");
const Ship = require("./Ship");

test("Ship is placed at location horizontally", () => {
  const playerBoard = Gameboard();
  const newShip = Ship("destroyer");
  playerBoard.placeShip(newShip, 5, 2, "horizontal");
  expect(playerBoard.board[5][3]).toHaveProperty("ship");
});

test("Ship is placed at location vertically", () => {
  const playerBoard = Gameboard();
  const newShip = Ship("destroyer");
  playerBoard.placeShip(newShip, 5, 2, "vertical");
  expect(playerBoard.board[6][2]).toHaveProperty("ship");
});

test("Ship does not place out of bounds horizontally", () => {
  const playerBoard = Gameboard();
  const newShip = Ship("destroyer");
  expect(playerBoard.placeShip(newShip, 5, 9, "horizontal")).toBe(
    "You cannot place a ship here"
  );
});

test("Ship does not place out of bounds vertically", () => {
  const playerBoard = Gameboard();
  const newShip = Ship("destroyer");
  expect(playerBoard.placeShip(newShip, 9, 5, "vertical")).toBe(
    "You cannot place a ship here"
  );
});

test("Cannot place ship over another ship vertical", () => {
  const playerBoard = Gameboard();
  const newShip = Ship("destroyer");
  playerBoard.placeShip(newShip, 5, 5, "vertical");
  expect(playerBoard.placeShip(newShip, 6, 5, "vertical")).toBe(
    "You cannot place a ship here"
  );
});

test("Cannot place ship over another ship horizontal", () => {
  const playerBoard = Gameboard();
  const newShip = Ship("destroyer");
  playerBoard.placeShip(newShip, 5, 4, "horizontal");
  expect(playerBoard.placeShip(newShip, 5, 6, "horizontal")).toBe(
    "You cannot place a ship here"
  );
});

test("Ship receives an attack", () => {
  const playerBoard = Gameboard();
  const newShip = Ship("destroyer");
  playerBoard.placeShip(newShip, 5, 6, "horizontal");
  expect(playerBoard.receiveAttack(5, 7)).toBe("Hit");
});

test("Ship misses an attack", () => {
  const playerBoard = Gameboard();
  const newShip = Ship("destroyer");
  playerBoard.placeShip(newShip, 5, 6, "horizontal");
  expect(playerBoard.receiveAttack(6, 9)).toBe("Miss");
});

test("Ship receives an attack in the same location", () => {
  const playerBoard = Gameboard();
  const newShip = Ship("destroyer");
  playerBoard.placeShip(newShip, 5, 6, "horizontal");
  playerBoard.receiveAttack(5, 7);
  expect(playerBoard.receiveAttack(5, 7)).toBe("You've already hit here");
});
