import React, { useEffect, useState, useRef, useCallback } from "react";
import Board from "./components/Board";
import { moveSnake } from "./components/Snake";
import { Coordinate } from "./types/types";
import "./App.css";
import {
  snakeDefaultPosition,
} from "./constants/constants";
import { getRandomPosition } from "./utils/getRandomPosition";
import Settings from "./components/Settings";
import ScoreBoard from "./components/ScoreBoard";
import { useScoreBoard } from "./hooks/useScoreBoard";

const App: React.FC = () => {
  const [snake, setSnake] = useState<Coordinate[]>([snakeDefaultPosition]);
  const [apple, setApple] = useState<Coordinate>(getRandomPosition());
  const [direction, setDirection] = useState<Coordinate>({ x: 1, y: 0 });
  const [fps, setFps] = useState<number>(8);
  const [username, setUsername] = useState<string>(
    `user${Math.floor(Math.random() * 9999)}`,
  );
  const [isGamePlaying, setIsGamePlaying] = useState<boolean>(false);

  const { stats, updateStats } = useScoreBoard();

  const gameLoopRef = useRef<number>();

  const moveSnakeCallback = useCallback(() => {
    moveSnake(
      snake,
      direction,
      apple,
      setApple,
      setSnake,
      gameLoopRef,
      setIsGamePlaying,
      username,
      fps,
      updateStats,
    );
  }, [snake, direction, apple, username, fps, updateStats]);

  useEffect(() => {
    if (isGamePlaying) {
      gameLoopRef.current = window.setInterval(moveSnakeCallback, 1000 / fps);
      return () => clearInterval(gameLoopRef.current);
    }
  }, [moveSnakeCallback, fps, isGamePlaying]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  return (
    <div className="game-container">
      {!isGamePlaying ? (
        <React.Fragment>
          <Settings
            username={username}
            setUsername={setUsername}
            fps={fps}
            setFps={setFps}
            setIsGamePlaying={setIsGamePlaying}
          />
          <ScoreBoard stats={stats} />
        </React.Fragment>
      ) : (
        <Board snake={snake} apple={apple} />
      )}
    </div>
  );
};

export default App;
