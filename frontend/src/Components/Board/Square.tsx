import React from 'react';
import { SquareValue } from '../../utils/GameUtils/GameParams';

interface SquareProps {
  value: SquareValue;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
  return (
    <button 
      className="square p-4 border border-gray-300 text-xl font-bold"
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;
