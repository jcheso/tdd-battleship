import React, { useState } from "react";

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
        if (board[x + i][y] !== 0) return false;
      }
    }
    return true;
  };

  const placeShip = (ship, x, y, direction) => {
    // Need to add function to check co-ordinates are inbounds/clear
    if (
      direction === "horizontal" &&
      !isOutOfBounds(ship, x, y, direction) &&
      isBoardClear(ship, x, y, direction)
    ) {
      shipsArray.push(ship);
      for (let i = 0; i < ship.length; i++) {
        board[x][y + i] = { ship, i };
      }
    } else if (
      direction === "vertical" &&
      !isOutOfBounds(ship, x, y, direction) &&
      isBoardClear(ship, x, y, direction)
    ) {
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
      console.log("hit");
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
    let sunkCount = 0;
    shipsArray.forEach((ship, index) => {
      if (ship.isSunk() === true) sunkCount++;
    });
    if (sunkCount === shipsArray.length) return true;
    else return false;
  };

  return {
    board,
    placeShip,
    isOutOfBounds,
    receiveAttack,
    shipsArray,
    checkForLoss,
  };
};

export default  Gameboard