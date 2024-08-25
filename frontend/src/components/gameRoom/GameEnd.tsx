import React from 'react';
import Button from '../common/Button';
import { starImage, drawGame } from '../../assets';
import { useNavigate } from 'react-router-dom';

type GameEndType = {
  player: string;
  isDraw: boolean;
  onRestart: () => void;
  onExit: () => void;
};
/**
 * Game End Screen
 * @param param0
 * @returns
 */
const GameEnd: React.FC<GameEndType> = ({
  player,
  isDraw,
  onRestart,
  onExit,
}) => {
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="absolute inset-0 bg-black opacity-70" />
      <div className="absolute inset-0 backdrop-blur-md flex flex-col items-center justify-center">
        {isDraw && !player && (
          <div className="mb-10 flex items-center justify-center">
            <img
              className="w-full max-w-[300px] -mb-10 animate-bounce"
              src={drawGame}
              alt="handshake draw"
            />
          </div>
        )}

        {player && (
          <div className="mb-10 flex items-center justify-center">
            <img
              className="w-16 pt-16 animate-ping"
              src={starImage}
              alt="star"
            />
            <img
              className="-mx-4 animate-ping delay-75"
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

        {player && (
          <div className="text-center">
            <p className="text-yellow-500 text-3xl font-bold">YAAAAAAAY!</p>
            <p className="text-white text-4xl font-bold">PLAYER {player}</p>
            <p className="text-yellow-500 text-7xl font-extrabold leading-none">
              WON!
            </p>
          </div>
        )}

        {isDraw && !player && (
          <div className="text-center">
            <p className="text-yellow-500 text-3xl font-bold">Oooops!</p>
            <p className="text-white text-4xl font-bold">IT'S A DRAW!</p>
            <p className="text-white text-xl font-bold">Good Game!</p>
          </div>
        )}
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
