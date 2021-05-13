const Player = require("./Player");

test("Player returns player name", () => {
    const player = Player("User");
    expect(player.name).toBe("User");
  });
  