import React from 'react';
import Button from '../common/Button';
import { starImage, drawGame } from '../../assets';
import { useNavigate } from 'react-router-dom';
import { Board } from '../../types';
import GameEndBoard from './GameEndBoard';

type GameEndType = {
  winner: string | null;
  isDraw: boolean;
  onRestart: () => void;
  onExit: () => void;
  board: Board;
};
/**
 * Game End Screen
 * @param param0
 * @returns
 */
const GameEnd: React.FC<GameEndType> = ({
  winner,
  isDraw,
  board,
  onRestart,
  onExit,
}) => {
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="absolute inset-0 bg-black opacity-70" />
      <div className="absolute inset-0 backdrop-blur-md flex flex-col items-center justify-center">
        {isDraw && !winner && (
          <div className="mb-10 flex items-center justify-center">
            <img
              className="w-full max-w-[300px] -mb-10 animate-bounce"
              src={drawGame}
              alt="handshake draw"
            />
          </div>
        )}

        {winner && (
          <div className="mb-10 flex items-center justify-center">
            <img
              className="w-16 pt-16 animate-ping"
              src={starImage}
              alt="star"
            />
            <img
              className="-mx-4 animate-ping delay-300 w-[50%] sm:w-auto"
              src={starImage}
              alt="star"
            />

            <img
              className="w-16 pt-16 animate-ping delay-100"
              src={starImage}
              alt="star"
            />
          </div>
        )}

        {winner && (
          <div className="text-center">
            <p className="text-yellow-500 text-xl sm:text-3xl font-bold">
              YAAAAAAAY!
            </p>
            <p className="text-white text-4xl font-bold">PLAYER {winner}</p>
            <span className="text-yellow-500 mb-1 text-4xl  sm:text-6xl font-extrabold leading-none">
              WON!
            </span>
          </div>
        )}

        {isDraw && !winner && (
          <div className="text-center">
            <p className="text-yellow-500 text-3xl font-bold">Oooops!</p>
            <p className="text-white text-4xl font-bold">IT'S A DRAW!</p>
            <p className="text-white text-xl font-bold">Good Game!</p>
          </div>
        )}

        {/* Show state at which game was worm */}
        <GameEndBoard board={board} />

        <div className="w-full flex flex-col space-y-1">
          <Button
            text="Play Again"
            color="orange"
            animate={false}
            size="full"
            onClick={onRestart}
          />
          <Button
            text="Exit Match"
            color="blue"
            animate={false}
            size="full"
            onClick={() => {
              onExit();
              navigate('/dashboard');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GameEnd;
