import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { calculateWinner } from "./helper";

/**
 * Functional component Square
 */
function Square({ value, onClick }) {
  return (
    <button
      className="square"
      onClick={onClick}
    >
      {value}
    </button>
  );
}

/**
 * Functional component Game
 */
function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const nextSymbol = isXNext ? "X" : "O";
  const winner = calculateWinner(squares);

  function getStatus() {
    if (winner) {
      return "Winner: " + winner;
    }
    
    if (isBoardFull(squares)) {
      return "Draw!";
    }

    return "Next player: " + nextSymbol;
  }

  function renderSquare(i) {
    return <Square
      value={squares[i]}
      onClick={() => {
        if (squares[i] != null || winner != null) {
          return;
        }
        const nextSquares = squares.slice();
        nextSquares[i] = nextSymbol;
        setSquares(nextSquares);
        setIsXNext(!isXNext);
      }}
    />;
  }

  function renderRestartButton() {
    return (
      <Restart
        onClick={() => {
          setSquares(Array(9).fill(null));
          setIsXNext(true);
        }}
      />
    );
  }

  return (
    <div className="game">
      <div className="game-board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div className="game-info">
        {getStatus()}
        <div className="restart-button">
          {renderRestartButton()}
        </div>
      </div>
      
    </div>
  );
}

/**
 * Check if board is full
 * @param {Array} squares 
 * @returns {boolean}
 */
function isBoardFull(squares) {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] == null) {
      return false;
    }
  }
  return true;
}

/**
 *Restart the game: set all square to null 
 */
function Restart({ onClick }) {

  return (
    <button className="restart" onClick={onClick}>
      Play again
    </button>
  );
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
