import "../App.css";

function GameTilePlayer({ onClick, tile, rowIndex, columnIndex }) {
  //Take the gameboard tile and return the correct tile.
  if (typeof tile === "object" && tile.ship.hitArray[tile.i] !== "hit") {
    return <div className="board-tile-boat"></div>;
  } else if (tile === "miss") {
    return <div className="board-tile-miss"></div>;
  } else if (typeof tile === "object" && tile.ship.hitArray[tile.i] === "hit") {
    return <div className="board-tile-hit"></div>;
  } else if (tile === 0) {
    return (
      <div
        onClick={() => onClick(rowIndex, columnIndex)}
        className="board-tile"
      ></div>
    );
  }
}

export default GameTilePlayer;
