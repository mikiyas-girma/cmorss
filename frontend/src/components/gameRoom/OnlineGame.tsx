import GameBoard from "./GameBoard";
import { useSocket } from "../../hooks/useSocket";
import { GameState } from "../../types";
import { cellClick } from "../../utils/cellClick";
import { useEffect, useRef, useState } from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
interface OnlineGameProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  roomId: string | undefined;
}

const OnlineGame = ({ gameState, setGameState, roomId }: OnlineGameProps) => {
  const [playerCount, setPlayerCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [opponent, setOpponent] = useState("");
  const [hasLeft, setHasLeft] = useState(false);

  const { socket } = useSocket();
  const { board, currentPlayer, winner, avatar } = gameState;

  const navigate = useNavigate();

  const handleCellClick = (position: number) => {
    if (board[position] || winner || avatar !== currentPlayer) return;

    cellClick(position, setGameState);

    socket?.emit("makeMove", { position, roomId });
  };

  useEffect(() => {
    if (!socket || !roomId) return;

    socket.on("roomFull", (players) => {
      players = players.filter((player: string) => player !== socket.id);
      setOpponent(players[0]);
      setPlayerCount(2);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    });

    socket.on("roomDeleted", () => {
      //console.log("your opponent has left the game");
      setHasLeft(true);
    });

    socket.on("disconnected", (id) => {
      if (opponent === id) {
        socket?.emit("deleteRoom", roomId);
      }
    });

    return () => {
      socket.off("roomFull");
    };
  }, [socket, roomId, opponent]);

  const handleDisconnect = () => {
    console.log("Disconnected from game");
    socket?.emit("deleteRoom", roomId);
  };

  const isUnmounting = useRef(false);
  useEffect(() => {
    return () => {
      if (isUnmounting.current) {
        handleDisconnect();
      } else {
        isUnmounting.current = true;
      }
    };
  }, []);

  return (
    <div>
      <GameBoard board={board} handleCellClick={handleCellClick} />
      {loading && (
        <Modal>
          {
            <div className="text-white text-2xl backdrop-blur-2xl rounded-lg border-4 border-white py-10 px-20 text-center space-y-5">
              <div>
                {playerCount < 2 ? (
                  <p>Waiting for players...</p>
                ) : (
                  <p>Starting...</p>
                )}
                <p>{playerCount}/2</p>
              </div>
              {playerCount < 2 && (
                <Button
                  text="Exit Game"
                  size="full"
                  color="red"
                  onClick={() => navigate("/dashboard")}
                />
              )}
            </div>
          }
        </Modal>
      )}
      {hasLeft && (
        <Modal>
          <div className="text-white text-2xl backdrop-blur-2xl rounded-lg border-4 border-white py-10 px-20 text-center space-y-5">
            <p>Your opponent has left the game</p>
            <Button
              text="Exit Game"
              size="full"
              color="blue"
              onClick={() => {
                setHasLeft(false);
                navigate("/dashboard");
              }}
              className=" text-black p-2 rounded-lg"
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default OnlineGame;
