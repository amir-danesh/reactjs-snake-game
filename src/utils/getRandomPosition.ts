import { Coordinate } from "../types/types";

export const getRandomPosition = (): Coordinate => ({
    x: Math.floor(Math.random() * 25),
    y: Math.floor(Math.random() * 18),
  });