import "./App.css";
import React, { useState } from "react";
import Gameboard from "./components/Gameboard";
import Player from "./components/Player";
import Ship from "./components/Ship";
import GameTile from "./components/GameTile";
import GameTilePlayer from "./components/GameTilePlayer";

var uniqid = require("uniqid");

function App() {
  /* Create header, footer, use the boards as states, update state each time a move is made
     Use a for loop to render the divs for each state. Conditional rendering for ship.id and hit/miss?
     Logic of game -
     placeShips: create an array of ships each player can use, loop through to instantiate
     Call function to place each ship (maybe enter co ords for now). Change turn. Use state?
     Once all ships are placed start the Game function
     gameFunction: set turn, allow click on a co-ord - call receiveAttack, checkforWin,
      switch turn
      While loop until checkForWin returns true?
     */
  const playerBoard = Gameboard();
  const computerBoard = Gameboard();

  const player = Player("player");
  const computer = Player("computer");

  const computerDestroyer = Ship("destroyer");
  computerBoard.placeShip(computerDestroyer, 5, 3, "horizontal");

  const playerDestroyer = Ship("destroyer");
  playerBoard.placeShip(playerDestroyer, 2, 3, "horizontal");

  const playerBattleship = Ship("battleship");
  playerBoard.placeShip(playerBattleship, 1, 1, "vertical");

  const playerCarrier = Ship("carrier");
  playerBoard.placeShip(playerCarrier, 8, 3, "horizontal");

  const playerSubmarine = Ship("submarine");
  playerBoard.placeShip(playerSubmarine, 4, 6, "vertical");

  const playerPatrolBoat = Ship("patrolBoat");
  playerBoard.placeShip(playerPatrolBoat, 1, 8, "vertical");

  const [boardState, setBoardState] = useState([playerBoard, computerBoard]);
  const [playerState, setPlayerState] = useState([player, computer]);

  const getXY = (rowIndex, columnIndex) => [rowIndex, columnIndex];

  return (
    <div>
      <div className="header">
        <h1>BattleShips</h1>
      </div>
      <div className="row">
        <div className="side">
          <div className="board-heading">
            <h3>Player</h3>
          </div>
          <div className="board-container">
            {boardState[0].board.map((row, rowIndex) =>
              row.map((tile, columnIndex) => (
                <GameTilePlayer
                  tile={tile}
                  rowIndex={rowIndex}
                  columnIndex={columnIndex}
                  key={uniqid()}
                />
              ))
            )}
          </div>
        </div>
        <div className="side">
          <div className="board-heading">
            <h3>Computer</h3>
          </div>
          <div className="board-container">
            {boardState[1].board.map((row, rowIndex) =>
              row.map((tile, columnIndex) => (
                <GameTile
                  onClick={computerBoard.receiveAttack}
                  tile={tile}
                  rowIndex={rowIndex}
                  columnIndex={columnIndex}
                  key={uniqid()}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <div className="footer">Made be Cheso7</div>
    </div>
  );
}

export default App;
