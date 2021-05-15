import React, { useState } from "react";
import Gameboard from "./Gameboard";
import Player from "./Player";
import Ship from "./Ship";
import "../App.css";

function GameTilePlayer({ tile, rowIndex, columnIndex }) {
  //Take the gameboard tile and return the correct tile.
  if (typeof tile === "object") {
    return <div className="board-tile-boat"></div>;
  } else if (tile === "miss") {
    return <div className="board-tile-miss"></div>;
  } else if (tile === 0) {
    return <div className="board-tile"></div>;
  }
}

export default GameTilePlayer;
