import React from 'react';
import styles from './Board.module.css';
import Square from '../square/Square';

const Board = ({ squares, onClick, xIsNext }) => {
  return (
    <div>
      {xIsNext && <h2>Hello</h2>}
      <div>{xIsNext ? 'X Turn' : 'O Turn'}</div>
      <div className={styles.board}>
        {squares.map((square, i) => (
          <Square key={i} value={square} onClick={() => onClick(i)} />
        ))}
      </div>
    </div>
  );
};

export default Board;
