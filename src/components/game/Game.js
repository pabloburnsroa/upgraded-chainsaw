import { React, useState } from 'react';
import Board from '../board/Board';
import { History } from './History';
import { Score } from '../score/Score';
import { calculateWinner } from '../game/Helpers';

const Game = () => {
  const [boardHistory, setBoardHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const [started, setIsStarted] = useState(false);
  const [ended, setIsEnded] = useState(false);
  const winner = calculateWinner(boardHistory[stepNumber]);

  const handleClick = (i) => {
    // Get board
    const boardSnapshot = boardHistory.slice(0, stepNumber + 1);
    // Get the current state
    const current = boardSnapshot[stepNumber];
    // Create a copy of a the current board state
    const boardCopy = [...current];
    // Check if move was winning move or square already occupied
    if (winner || boardCopy[i]) return;
    // Insert 'X' or 'O' in the square that was clicked
    boardCopy[i] = xIsNext ? 'X' : 'O';
    // Update board
    setBoardHistory([...boardSnapshot, boardCopy]);
    // Set stepNumber
    setStepNumber(boardSnapshot.length);
    // Update turn
    setXisNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const renderMoves = () =>
    boardHistory.map((_step, move) => {
      const destination = move ? `Go to move #${move}` : 'Go to start';
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      );
    });

  return (
    <>
      <Score />
      <Board
        squares={boardHistory[stepNumber]}
        onClick={handleClick}
        xIsNext={xIsNext}
      />
      <div>{renderMoves()}</div>
    </>
  );
};

export default Game;
