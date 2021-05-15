import React, { useState } from "react";
import Gameboard from "./Gameboard";
import Player from "./Player";
import Ship from "./Ship";
import "../App.css";

function GameTile({ onClick, tile, rowIndex, columnIndex }) {
  //Take the gameboard tile and return the correct tile.
  if (typeof tile === "object" && tile.ship.hitArray[tile.i] !== "hit") {
    return (
      <div
        className="board-tile-boat"
        onClick={() => onClick(rowIndex, columnIndex)}
      ></div>
    );
  } else if (tile === "miss") {
    return <div className="board-tile-miss"></div>;
  } else if (typeof tile === "object" && tile.ship.hitArray[tile.i] === "hit") {
    return <div className="board-tile-hit"></div>;
  } else if (tile === 0) {
    return (
      <div
        className="board-tile"
        onClick={() => onClick(rowIndex, columnIndex)}
      ></div>
    );
  }
}

export default GameTile;
