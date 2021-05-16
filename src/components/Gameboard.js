const Gameboard = () => {
  let board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  let shipsArray = [];
  let sunkCount = 0;

  const isOutOfBounds = (ship, x, y, direction) => {
    // Check if y + length of ship is greater than board.length - 1
    if (x + ship.length > board.length && direction === "vertical") {
      return true;
    } else if (y + ship.length > board.length && direction === "horizontal") {
      return true;
    } else return false;
  };

  const isBoardClear = (ship, x, y, direction) => {
    if (direction === "horizontal") {
      for (let i = 0; i < ship.length; i++) {
        if (board[x][y + i] !== 0) return false;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        if (x + i > 9 || board[x + i][y] !== 0) return false;
      }
    }
    return true;
  };

  const placeShip = (ship, x, y, direction) => {
    // Need to add function to check co-ordinates are inbounds/clear
    if (direction === "horizontal") {
      shipsArray.push(ship);
      for (let i = 0; i < ship.length; i++) {
        board[x][y + i] = { ship, i };
      }
    } else if (direction === "vertical") {
      shipsArray.push(ship);
      for (let i = 0; i < ship.length; i++) {
        board[x + i][y] = { ship, i };
      }
    } else return "You cannot place a ship here";
  };

  // Receive attack function that takes coordinates and determines if ship has been hit
  const receiveAttack = (x, y) => {
    if (
      typeof board[x][y] == "object" &&
      board[x][y].ship.hitArray[board[x][y].i] !== "hit"
    ) {
      board[x][y].ship.hit(board[x][y].i);
      if (board[x][y].ship.isSunk() === true) {
        sunkCount++;
      }
    } else if (
      (typeof board[x][y] == "object" &&
        board[x][y].ship.hitArray[board[x][y].i] === "hit") ||
      board[x][y] === "miss"
    ) {
      console.log("You've already fired here");
    } else {
      board[x][y] = "miss";
      console.log("miss");
    }
  };

  // Report whether or not all ships are sunk
  const checkForLoss = () => {
    if (sunkCount === shipsArray.length) return true;
    else return false;
  };

  return {
    board,
    placeShip,
    isOutOfBounds,
    isBoardClear,
    receiveAttack,
    shipsArray,
    checkForLoss,
  };
};

export default Gameboard;
