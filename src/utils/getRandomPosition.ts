import { BOARD_HEIGHT, BOARD_WIDTH } from "../constants/constants";
import { Coordinate } from "../types/types";

export const getRandomPosition = (): Coordinate => ({
    x: Math.floor(Math.random() * BOARD_WIDTH),
    y: Math.floor(Math.random() * BOARD_HEIGHT),
  });