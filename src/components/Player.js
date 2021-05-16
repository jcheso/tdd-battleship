const Player = (playerName, turn) => {
  const name = playerName;

  const generateAttack = () => {
    const x = Math.round(Math.random() * 9);
    const y = Math.round(Math.random() * 9);
    return { x, y };
  };

  return { name, turn, generateAttack };
};

module.exports = Player;
