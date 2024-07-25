import React, { useEffect, useState, useRef, useCallback } from 'react';
import Board from './components/Board';
import { moveSnake } from './components/Snake';
import { Coordinate } from './types/types';
import './App.css';
import { BOARD_HEIGHT, BOARD_WIDTH } from './constants/constants';
import { getRandomPosition } from './utils/getRandomPosition';

const App: React.FC = () => {
  const [snake, setSnake] = useState<Coordinate[]>([{ x: Math.floor(BOARD_WIDTH / 2), y: Math.floor(BOARD_HEIGHT / 2) }]);
  const [apple, setApple] = useState<Coordinate>(getRandomPosition());
  const [direction, setDirection] = useState<Coordinate>({ x: 1, y: 0 });
  const [fps, setFps] = useState(5);

  const gameLoopRef = useRef<number>();

  const moveSnakeCallback = useCallback(() => {
    moveSnake(snake, direction, apple, setApple, setSnake, gameLoopRef);
  }, [snake, direction, apple]);

  useEffect(() => {
    gameLoopRef.current = window.setInterval(moveSnakeCallback, 1000 / fps);
    return () => clearInterval(gameLoopRef.current);
  }, [moveSnakeCallback, fps]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  return (
    <div className="game-container">
      <Board snake={snake} apple={apple} />
    </div>
  );
};

export default App;
