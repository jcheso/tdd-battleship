const Player = require("./Player");

test("Player returns player name", () => {
  const player = Player("User");
  expect(player.name).toBe("User");
});

test("Computer does not attack same spot twice", () => {
  const player = Player("Computer");
  expect(player.repeatedAttack("22")).toBe(true);
});
