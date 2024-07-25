import { BOARD_HEIGHT, BOARD_WIDTH } from "../constants/constants";
import { Coordinate } from "../types/types";

export const getRandomPosition = (
  exceptions: Coordinate[] | undefined = undefined,
): Coordinate => {
  const generatePosition = (): Coordinate => ({
    x: Math.floor(Math.random() * BOARD_WIDTH),
    y: Math.floor(Math.random() * BOARD_HEIGHT),
  });

  const isPositionInExceptions = (position: Coordinate, exceptions: Coordinate[]): boolean => {
    return exceptions.some(coord => coord.x === position.x && coord.y === position.y);
  };

  const position = exceptions
    ? (() => {
        let newPosition: Coordinate;
        do {
          newPosition = generatePosition();
        } while (isPositionInExceptions(newPosition, exceptions));
        return newPosition;
      })()
    : generatePosition();

  return position;
};
