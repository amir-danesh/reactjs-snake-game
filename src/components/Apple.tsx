import React from "react";
import { Coordinate } from "../types/types";
import { SQUARE_SIZE } from "../constants/constants";

interface AppleProps {
  position: Coordinate;
}

const Apple: React.FC<AppleProps> = ({ position }) => {
  return (
    <div
      className="apple"
      style={{ left: position.x * SQUARE_SIZE, top: position.y * SQUARE_SIZE }}
    />
  );
};

export default Apple;
