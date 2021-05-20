import "./App.css";
import React, { useState, useEffect } from "react";
import Gameboard from "./components/Gameboard";
import Player from "./components/Player";
import Ship from "./components/Ship";
import GameTileComputer from "./components/GameTileComputer";
import GameTilePlayer from "./components/GameTilePlayer";
import _, { random } from "underscore";
import gitLogo from "./assets/GitHub-Mark-Light-32px.png";

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
    Ship("patrol boat"),
  ];

  const playerShipList = [
    Ship("destroyer"),
    Ship("destroyer"),
    Ship("battleship"),
    Ship("carrier"),
    Ship("submarine"),
    Ship("submarine"),
    Ship("patrol boat"),
  ];
  const [message, setMessage] = useState("Place your destroyer");

  const generateCoordinates = () => {
    const x = Math.round(Math.random() * 9);
    const y = Math.round(Math.random() * 9);
    return { x, y };
  };

  useEffect(() => {
    setComputerBoard((currentBoard) => {
      const tempBoard = _.clone(currentBoard);

      const randomDirection = () => {
        const number = Math.round(Math.random());
        return number === 1 ? "horizontal" : "vertical";
      };
      let computerShipCount = 0;
      while (computerShipCount < computerShipList.length) {
        const x = generateCoordinates().x;
        const y = generateCoordinates().y;
        const direction = randomDirection();
        const ship = computerShipList[computerShipCount];

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
        if (shipCount + 1 < playerShipList.length) {
          setMessage(`Place your ${playerShipList[shipCount + 1].id}`);
        }
        if (shipCount === playerShipList.length - 1) {
          setMessage("All ships placed, attack the enemy!");
        }
      }
    }
  };

  const gameLoop = (x, y) => {
    // Run the game until either side loses
    if (
      playerBoard.checkForLoss() === false &&
      computerBoard.checkForLoss() === false &&
      shipCount === playerShipList.length
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
    if (playerBoard.checkForLoss() === true) {
      setMessage("You lost!");
    } else if (computerBoard.checkForLoss() === true) {
      setMessage("You won!");
    }
  };

  return (
    <div>
      <div className="header">
        <h1>Battleships</h1>
      </div>
      <div className="row">
        <div className="message-board">
          <div>{message}</div>
        </div>
      </div>
      <div className="row">
        <div className="side">
          <div className="board-heading">
            <h3>Player Board</h3>
          </div>
          <div className="board-container">
            {["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map(
              (letter) => (
                <div key={uniqid()} className="board-tile-heading">
                  {letter}
                </div>
              )
            )}
            {playerBoard.board.map((row, rowIndex) => (
              <>
                <div key={uniqid()} className="board-tile-heading">
                  {rowIndex + 1}
                </div>
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
          <div className="button-wrapper">
            <button
              className="button"
              onClick={() =>
                setDirection((currentDirection) =>
                  currentDirection === "vertical" ? "horizontal" : "vertical"
                )
              }
            >
              Ship orientation: {direction}
            </button>
          </div>
        </div>
        <div className="side">
          <div className="board-heading">
            <h3>Computer Board</h3>
          </div>
          <div className="board-container">
            {["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map(
              (letter) => (
                <div key={uniqid()} className="board-tile-heading">
                  {letter}
                </div>
              )
            )}
            {computerBoard.board.map((row, rowIndex) => (
              <>
                <div key={uniqid()} className="board-tile-heading">
                  {rowIndex + 1}
                </div>
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
      <div>
        <a className="footer" href="https://github.com/Cheso7">
          <div className="footer-item">Made by Cheso7</div>
          <div className="footer-item">
            <img src={gitLogo} alt="GitHub Logo"></img>
          </div>
        </a>
      </div>
    </div>
  );
}

export default App;
