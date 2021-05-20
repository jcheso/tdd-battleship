const Ship = (shipClass) => {
  let length = 0;
  let id = shipClass;
  switch (shipClass) {
    case "carrier":
      length = 5;
      break;
    case "battleship":
      length = 4;
      break;
    case "destroyer":
      length = 3;
      break;
    case "submarine":
      length = 3;
      break;
    case "patrol boat":
      length = 2;
      break;
    default:
      break;
  }

  let hitArray = new Array(length);
  const hit = (hitLocation) => {
    if (hitArray[hitLocation] !== "hit") {
      hitArray[hitLocation] = "hit";
    } else {
      return "This location has already been hit";
    }
  };

  const isSunk = () => {
    const countHitArray = hitArray.filter((location) => {
      return location === "hit";
    });
    if (countHitArray.length === length) {
      return true;
    }
  };
  return { id, length, isSunk, hit, hitArray };
};

module.exports = Ship;
