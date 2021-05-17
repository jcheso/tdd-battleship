const Player = (playerName, turn) => {
  const name = playerName;
  let attackArray = [];

  // Need to fiX
  const generateAttack = () => {
    const x = Math.round(Math.random() * 9);
    const y = Math.round(Math.random() * 9);
    if (!attackArray.includes({ x, y })) {
      attackArray.push({ x, y });
      return { x, y };
    } else generateAttack();
  };

  return { name, turn, generateAttack, attackArray };
};

module.exports = Player;
