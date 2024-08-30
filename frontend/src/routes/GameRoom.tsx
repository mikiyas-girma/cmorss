import React, { useEffect, useState } from "react";
import Box from "../components/gameRoom/Box";
import GameEnd from "../components/gameRoom/GameEnd";
import { checkWinner } from "../utils/checkWinner";
import { useParams } from "react-router-dom";
import { useGame } from "../hooks/useGame";
import { Board } from "../types";
import LocalGame from "../components/gameRoom/LocalGame";
import AIGame from "../components/gameRoom/AIGame";
import OnlineGame from "../components/gameRoom/OnlineGame";
import { useAppState } from "../hooks/useAppState";
import { updateAIGameScore } from "../utils/updateAppState";
import ChatBox from "../components/gameRoom/ChatBox";
import { useSocket } from "../hooks/useSocket";

const initialBoard: Board = Array(9).fill(null);

const GameRoom: React.FC = () => {
  const initScore = { O: 0, X: 0, draw: 0 };

  const [score, setScore] = useState(initScore);
  const [waitinRestart, setWaitingRestart] = useState(false);

  const { gameState, setGameState } = useGame();
  const { board, currentPlayer, winner } = gameState;

  const { id } = useParams();
  const { socket } = useSocket();
  const { app, setAppState } = useAppState();

  // Observe Board and find Winner
  useEffect(() => {
    const findWinner = checkWinner(board);
    if (findWinner) {
      setGameState((prev) => ({ ...prev, winner: findWinner }));
      setScore((prev) => ({ ...prev, [findWinner]: prev[findWinner] + 1 }));
    }
    // Update AI Score in App State
    if (id === "ai" && (findWinner || !board.includes(null))) {
      updateAIGameScore(setAppState, findWinner);
    }
  }, [board, currentPlayer, setGameState, setAppState, id]);

  useEffect(() => {
    if (id === "ai" && app && app.aiGame) {
      setScore({ X: app.aiGame.user, O: app.aiGame.ai, draw: app.aiGame.draw });
    }
  }, [app, id]);

  // Handle Reset Game
  const resetGame = () => {
    setGameState((prev) => ({
      ...prev,
      board: initialBoard,
      currentPlayer: "X",
      winner: null,
    }));
  };

  //reset game state on unmount
  useEffect(() => {
    return () => resetGame();
  }, []);

  // Determine if game state is at a draw
  const isADraw = !board.includes(null);
  const isAbleToChat = id !== "ai" && id !== "friend";

  // Return JSX For View
  return (
    <div className="flex flex-col items-center justify-center space-y-12">
      <div className="w-full space-y-4">
        <p className="w-3/4 mx-auto py-1.5 bg-gradient-radial from-[#7D977E] to-[#415E45] rounded-xl text-white text-center font-bold">
          GAME STATS
        </p>

        <div className="w-full px-4 grid grid-cols-4 gap-2 place-items-center">
          <Box
            top="Score"
            score={(score.X + "").padStart(2, "0")}
            bottom="Player X"
            color={"orange"}
          />
          <Box
            top="Draw"
            score={(score.draw + "").padStart(2, "0")}
            color="blue"
          />
          <Box
            top="Score"
            score={(score.O + "").padStart(2, "0")}
            bottom="Player O"
            color={"green"}
          />

          <Box
            bottom="Turn"
            score={`${currentPlayer}`}
            color={currentPlayer === "X" ? "orange" : "green"}
          />
        </div>
      </div>
      {id === "friend" ? (
        <LocalGame gameState={gameState} setGameState={setGameState} />
      ) : id === "ai" ? (
        <AIGame gameState={gameState} setGameState={setGameState} />
      ) : (
        <OnlineGame
          gameState={gameState}
          setGameState={setGameState}
          waitinRestart={waitinRestart}
          setWaitingRestart={setWaitingRestart}
          roomId={id}
        />
      )}

      {(isADraw || winner) && (
        <GameEnd
          board={board}
          winner={winner!}
          isDraw={isADraw}
          onRestart={() => {
            if (isADraw && id !== "ai")
              setScore((prev) => ({ ...prev, draw: prev.draw + 1 }));

            const isOnline = id !== "ai" && id !== "friend";
            if (isOnline) {
              setWaitingRestart(true);
              socket?.emit("requestRestart", id);
            } else
            resetGame();
          }}
          onExit={resetGame}
        />
      )}
      {/* Chat Component */}
      {isAbleToChat && <ChatBox />}
    </div>
  );
};

export default GameRoom;
