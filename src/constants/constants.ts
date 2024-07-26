import { Coordinate } from "../types/types";

export const BOARD_WIDTH = 25;
export const BOARD_HEIGHT = 18;
export const SQUARE_SIZE = 20;
export const LOCAL_STORAGE_GAME_STATS_STRING = "snake-game-stats";
export const GAME_BOARD_LIST_SIZE = 10;

export const snakeDefaultPosition: Coordinate = {
  x: Math.floor(BOARD_WIDTH / 2),
  y: Math.floor(BOARD_HEIGHT / 2),
};
