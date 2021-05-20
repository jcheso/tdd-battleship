const Player = (playerName, turn) => {
  // Track if last shot was a HIT, if so -
  // Take last co-ord from attack array and check each position adjacent
  // Then proceed with random atk after

  const name = playerName;
  let attackArray = [];

  const generateCoordinates = () => {
    const x = Math.round(Math.random() * 9);
    const y = Math.round(Math.random() * 9);
    return { x, y };
  };

  const generateAttack = () => {
    let attackCoordinates = generateCoordinates();
    let x = attackCoordinates.x;
    let y = attackCoordinates.y;

    while (repeatedAttack(`${x}${y}`) === true) {
      console.log("Repeated attack, generating new coordinates");
      attackCoordinates = generateCoordinates();
      x = attackCoordinates.x;
      y = attackCoordinates.y;
    }
    attackArray.push(`${x}${y}`);
    return { x, y };
  };

  const repeatedAttack = (coords) => {
    if (attackArray.includes(coords)) return true;
  };

  return {
    name,
    turn,
    generateAttack,
    attackArray,
    repeatedAttack,
  };
};

module.exports = Player;
