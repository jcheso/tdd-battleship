const Player = (playerName) => {
  const name = playerName;
  let turn = false;
  return { name, turn };
};

module.exports = Player;
