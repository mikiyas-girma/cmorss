import React, { useState } from 'react';
import Square from './Square';
import { initializeGameState, handlePlayerMove } from '../../utils/GameUtils/gameLogic';
import { GameState } from '../../utils/GameUtils/GameParams';

const GameBoard: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(initializeGameState);

  const handleClick = (index: number) => {
    const newState = handlePlayerMove(gameState, index);
    setGameState(newState);
  };

  const resetGame = () => {
    setGameState(initializeGameState());
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {gameState.board.map((value, index) => (
          <Square key={index} value={value} onClick={() => handleClick(index)} />
        ))}
      </div>
      {gameState.winner && <p>Winner: {gameState.winner}</p>}
      {gameState.isDraw && <p>It's a Draw!</p>}
      <button 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={resetGame}
        >
        Reset Game
      </button>
    </div>
  );
};

export default GameBoard;
