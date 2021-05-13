import React, { useState } from "react";
import Gameboard from "./Gameboard";
import Player from "./Player";
import Ship from "./Ship";
import "../App.css";

function GameTile({ tile, index }) {
  //Take the gameboard tile and return the correct tile.

  if (typeof tile === "object") {
    return (
      <div className="board-tile-boat" key={index}>
        {tile.ship.id}
      </div>
    );
  } else {
    return (
      <div className="board-tile" key={index}>
        {tile}
      </div>
    );
  }
}

export default GameTile;
