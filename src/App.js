import "./App.css";
import React, { useState } from "react";
import Gameboard from "./components/Gameboard";
import Player from "./components/Player";
import Ship from "./components/Ship";
import GameTileComputer from "./components/GameTileComputer";
import GameTilePlayer from "./components/GameTilePlayer";

var uniqid = require("uniqid");

function App() {
  const playerBoard = Gameboard();
  const computerBoard = Gameboard();

  const player = Player("player");
  const computer = Player("computer");
  // Let player make first move
  player.turn = true;

  const computerDestroyer = Ship("destroyer");
  computerBoard.placeShip(computerDestroyer, 2, 3, "horizontal");

  const playerDestroyer = Ship("destroyer");
  playerBoard.placeShip(playerDestroyer, 2, 3, "horizontal");

  const playerBattleship = Ship("battleship");
  playerBoard.placeShip(playerBattleship, 1, 1, "vertical");

  const computerBattleship = Ship("battleship");
  computerBoard.placeShip(computerBattleship, 1, 1, "vertical");

  const playerCarrier = Ship("carrier");
  playerBoard.placeShip(playerCarrier, 8, 3, "horizontal");

  const computerCarrier = Ship("carrier");
  computerBoard.placeShip(computerCarrier, 8, 3, "horizontal");

  const playerSubmarine = Ship("submarine");
  playerBoard.placeShip(playerSubmarine, 4, 6, "vertical");

  const computerSubmarine = Ship("submarine");
  computerBoard.placeShip(computerSubmarine, 4, 6, "vertical");

  const playerPatrolBoat = Ship("patrolBoat");
  playerBoard.placeShip(playerPatrolBoat, 1, 8, "vertical");

  const computerPatrolBoat = Ship("patrolBoat");
  computerBoard.placeShip(computerPatrolBoat, 1, 8, "vertical");

  const [boardState, setBoardState] = useState({ playerBoard, computerBoard });
  const [playerState, setPlayerState] = useState({ player, computer });
  const [testState, setTestState] = useState(player);

  const gameLoop = (x, y) => {
    console.log("Player has lost:" + playerBoard.checkForLoss());
    console.log("Computer has lost:" + computerBoard.checkForLoss());
    // Run the game until either side loses
    if (
      playerBoard.checkForLoss() === false &&
      computerBoard.checkForLoss() === false
    ) {
      // If it is the players turn, let the computerBoard receive an attack and set to false
      if (playerState.player.turn === true) {
        computerBoard.receiveAttack(x, y);
        setPlayerState((currentPlayerState) => {
          const tempState = currentPlayerState;
          tempState.player.turn = false;
          tempState.computer.turn = true;
          return tempState;
        });
        setTimeout(() => {
          if (playerState.computer.turn === true) {
            const computerAttack = computer.generateAttack();
            playerBoard.receiveAttack(computerAttack.x, computerAttack.y);
            setPlayerState((currentPlayerState) => {
              const tempState = currentPlayerState;
              tempState.player.turn = true;
              tempState.computer.turn = false;
              return tempState;
            });
          }
        }, 500);
      }
    }
    // Need to fix this
    if (playerBoard.checkForLoss() === true) {
      alert("You lost!");
    } else if (computerBoard.checkForLoss() === true) {
      alert("You won!");
    }
  };

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
            {boardState.playerBoard.board.map((row, rowIndex) =>
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
            {boardState.computerBoard.board.map((row, rowIndex) =>
              row.map((tile, columnIndex) => (
                <GameTileComputer
                  onClick={gameLoop}
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
