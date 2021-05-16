const Player = (playerName) => {
  const name = playerName;
  const turn = false;

  const generateAttack = () => {
    const x = Math.round(Math.random() * 9);
    const y = Math.round(Math.random() * 9);
    return { x, y };
  };

  return { name, turn, generateAttack };
};

module.exports = Player;
