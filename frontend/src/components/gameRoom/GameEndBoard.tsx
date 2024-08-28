import React from 'react';
import { Board } from '../../types';
import Avatar from './Avatar';

type CompType = {
  board: Board;
};

const GameEndBoard: React.FC<CompType> = ({ board }) => {
  return (
    <div className="grid-cols-3 gap-1 my-2 grid">
      {board.map((cell, index) => (
        <button
          key={index}
          className="w-14 h-14 md:w-[100px] md:h-[100px] rounded-xl bg-white text-black active:opacity-80"
          onClick={() => () => {}}
          disabled={true}
        >
          <Avatar player={cell} endBoard />
        </button>
      ))}
    </div>
  );
};

export default GameEndBoard;
