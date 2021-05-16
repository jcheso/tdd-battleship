import "./App.css";
import React, { useState, useEffect } from "react";
import Gameboard from "./components/Gameboard";
import Player from "./components/Player";
import Ship from "./components/Ship";
import GameTileComputer from "./components/GameTileComputer";
import GameTilePlayer from "./components/GameTilePlayer";
import _, { random } from "underscore";

var uniqid = require("uniqid");

function App() {
  const [computerBoard, setComputerBoard] = useState(Gameboard());
  const [playerBoard, setPlayerBoard] = useState(Gameboard());
  const [playerState, setPlayerState] = useState(Player("player", true));
  const [computerState, setComputerState] = useState(Player("computer", false));
  const [shipCount, setShipCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [direction, setDirection] = useState("horizontal");

  const computerShipList = [
    Ship("destroyer"),
    Ship("destroyer"),
    Ship("battleship"),
    Ship("carrier"),
    Ship("submarine"),
    Ship("submarine"),
    Ship("patrolBoat"),
  ];

  const playerShipList = [
    Ship("destroyer"),
    Ship("destroyer"),
    Ship("battleship"),
    Ship("carrier"),
    Ship("submarine"),
    Ship("submarine"),
    Ship("patrolBoat"),
  ];

  useEffect(() => {
    setComputerBoard((currentBoard) => {
      const tempBoard = _.clone(currentBoard);

      const randomDirection = () => {
        const number = Math.round(Math.random());
        return number === 1 ? "horizontal" : "vertical";
      };
      let computerShipCount = 0;
      while (computerShipCount < computerShipList.length) {
        const x = computerState.generateAttack().x;
        const y = computerState.generateAttack().y;
        const direction = randomDirection();
        const ship = computerShipList[computerShipCount];
        console.log(x, y, direction, ship);

        if (
          computerBoard.isBoardClear(ship, x, y, direction) &&
          !computerBoard.isOutOfBounds(ship, x, y, direction)
        ) {
          tempBoard.placeShip(ship, x, y, direction);
          computerShipCount++;
        }
      }

      return tempBoard;
    });
  }, []);

  const placeShip = (x, y) => {
    if (shipCount < playerShipList.length) {
      if (
        !playerBoard.isOutOfBounds(
          playerShipList[shipCount],
          x,
          y,
          direction
        ) &&
        playerBoard.isBoardClear(playerShipList[shipCount], x, y, direction)
      ) {
        setPlayerBoard((currentBoard) => {
          const tempBoard = _.clone(currentBoard);
          tempBoard.placeShip(playerShipList[shipCount], x, y, direction);
          return tempBoard;
        });
        setShipCount(shipCount + 1);
        console.log(shipCount);
      }
    } else {
      alert("All ships placed, start attacking the enemy");
    }
  };

  const gameLoop = (x, y) => {
    // Run the game until either side loses
    if (
      playerBoard.checkForLoss() === false &&
      computerBoard.checkForLoss() === false
    ) {
      // If it is the players turn, let the computerBoard receive an attack and set to false
      if (!loading) {
        setComputerBoard((currentBoard) => {
          const tempBoard = _.clone(currentBoard);
          tempBoard.receiveAttack(x, y);
          return tempBoard;
        });
        setLoading(true);
        setTimeout(() => {
          const computerAttack = computerState.generateAttack();
          setPlayerBoard((currentBoard) => {
            const tempBoard = _.clone(currentBoard);
            tempBoard.receiveAttack(computerAttack.x, computerAttack.y);
            return tempBoard;
          });
          setLoading(false);
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
            {["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map(
              (letter) => (
                <div className="board-tile-heading">{letter}</div>
              )
            )}
            {playerBoard.board.map((row, rowIndex) => (
              <>
                <div className="board-tile-heading">{rowIndex + 1}</div>
                {row.map((tile, columnIndex) => (
                  <GameTilePlayer
                    onClick={placeShip}
                    tile={tile}
                    rowIndex={rowIndex}
                    columnIndex={columnIndex}
                    key={uniqid()}
                  />
                ))}
              </>
            ))}
          </div>
          <button
            onClick={() =>
              setDirection((currentDirection) =>
                currentDirection === "vertical" ? "horizontal" : "vertical"
              )
            }
          >
            {direction}
          </button>
        </div>
        <div className="side">
          <div className="board-heading">
            <h3>Computer</h3>
          </div>
          <div className="board-container">
            {["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map(
              (letter) => (
                <div className="board-tile-heading">{letter}</div>
              )
            )}
            {computerBoard.board.map((row, rowIndex) => (
              <>
                <div className="board-tile-heading">{rowIndex + 1}</div>
                {row.map((tile, columnIndex) => (
                  <GameTileComputer
                    onClick={gameLoop}
                    tile={tile}
                    rowIndex={rowIndex}
                    columnIndex={columnIndex}
                    key={uniqid()}
                  />
                ))}
              </>
            ))}
          </div>
        </div>
      </div>
      <div className="footer">Made be Cheso7</div>
    </div>
  );
}

export default App;
