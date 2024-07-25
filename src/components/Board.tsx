import React from 'react';
import { Coordinate } from '../types/types';
import { BOARD_HEIGHT, BOARD_WIDTH, SQUARE_SIZE } from '../constants/constants';

interface BoardProps {
  snake: Coordinate[];
  apple: Coordinate;
}

const Board: React.FC<BoardProps> = ({ snake, apple }) => {
  return (
    <div className="game-board">
      {Array.from({ length: BOARD_HEIGHT }).map((_, rowIndex) => (
        <div className="row" key={rowIndex}>
          {Array.from({ length: BOARD_WIDTH }).map((_, colIndex) => {
            const isSnake = snake.some(
              (segment) => segment.x === colIndex && segment.y === rowIndex
            );
            const isApple = apple.x === colIndex && apple.y === rowIndex;
            return (
              <div
                className={`square ${isSnake ? 'snake' : ''} ${
                  isApple ? 'apple' : ''
                }`}
                key={colIndex}
                style={{
                  width: SQUARE_SIZE,
                  height: SQUARE_SIZE,
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;
