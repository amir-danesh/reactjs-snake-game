import { snakeDefaultPosition } from "../constants/constants";
import { Coordinate, Stat } from "../types/types";
import { getRandomPosition } from "../utils/getRandomPosition";

export const moveSnake = (
  snake: Coordinate[],
  direction: Coordinate,
  apple: Coordinate,
  setApple: (pos: Coordinate) => void,
  setSnake: (snake: Coordinate[]) => void,
  gameLoopRef: React.MutableRefObject<number | undefined>,
  setIsGamePlaying: React.Dispatch<React.SetStateAction<boolean>>,
  username: string,
  gameSpeed: number,
  updateStats: ({ name, score, speed }: Stat) => void,
) => {
  const handleGameOver = () => {
    clearInterval(gameLoopRef.current);
    setSnake([snakeDefaultPosition]);
    updateStats({
      name: username,
      score: snake.length,
      speed: gameSpeed,
    });
    setIsGamePlaying(false);
    alert("Game Over");
  };

  const newHead = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y,
  };

  // Check collision with walls
  if (newHead.x < 0 || newHead.x >= 25 || newHead.y < 0 || newHead.y >= 18) {
    handleGameOver();
    return;
  }

  // Check collision with self
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === newHead.x && snake[i].y === newHead.y) {
      handleGameOver();
      return;
    }
  }

  let newSnake = [newHead, ...snake];

  // Check collision with apple
  if (newHead.x === apple.x && newHead.y === apple.y) {
    setApple(getRandomPosition(snake));
  } else {
    newSnake.pop();
  }

  setSnake(newSnake);
};
