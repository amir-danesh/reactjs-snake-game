import { Coordinate } from '../types/types';
import { getRandomPosition } from '../utils/getRandomPosition';

export const moveSnake = (
  snake: Coordinate[],
  direction: Coordinate,
  apple: Coordinate,
  setApple: (pos: Coordinate) => void,
  setSnake: (snake: Coordinate[]) => void,
  gameLoopRef: React.MutableRefObject<number | undefined>
) => {
  const newHead = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y,
  };

  // Check collision with walls
  if (
    newHead.x < 0 ||
    newHead.x >= 25 ||
    newHead.y < 0 ||
    newHead.y >= 18
  ) {
    clearInterval(gameLoopRef.current);
    alert('Game Over');
    return;
  }

  // Check collision with self
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === newHead.x && snake[i].y === newHead.y) {
      clearInterval(gameLoopRef.current);
      alert('Game Over');
      return;
    }
  }

  let newSnake = [newHead, ...snake];

  // Check collision with apple
  if (newHead.x === apple.x && newHead.y === apple.y) {
    setApple(getRandomPosition());
  } else {
    newSnake.pop();
  }

  setSnake(newSnake);
};
