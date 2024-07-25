import React from 'react';
import { Coordinate } from '../types/types';

interface AppleProps {
  position: Coordinate;
}

const Apple: React.FC<AppleProps> = ({ position }) => {
  return <div className="apple" style={{ left: position.x * 20, top: position.y * 20 }} />;
};

export default Apple;
