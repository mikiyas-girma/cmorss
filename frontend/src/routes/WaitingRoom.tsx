import { useNavigate } from "react-router-dom";
import { useSocket } from "../hooks/useSocket";
import { useEffect, useState } from "react";

const Waiting = () => {
  const [playerCount, setPlayerCount] = useState(1);
  const { socket } = useSocket();

  const navigate = useNavigate();

  useEffect(() => {
    if (!socket) return;

    socket.on("matchFound", ({ roomId }) => {
      console.log("match found", roomId);
      setPlayerCount(2);
      if (socket.id === roomId.split("~")[1]) {
        socket.emit("createRoom", roomId);
        navigate(`/game/${roomId}`);
      }
      setTimeout(() => {
        if (socket.id === roomId.split("~")[0]) {
          navigate(`/game/${roomId}`);
        }
        
      }, 2000);
    });

    return () => {
      socket.off("matchFound");
    };
  });

  return (
    <div className="text-white text-2xl backdrop-blur-2xl rounded-lg border-4 border-white py-10 px-20 text-center">
      {playerCount === 1 ? (
        <p>waiting for players...</p>
      ) : (
        <p>Redirecting...</p>
      )}
      <span>{playerCount}/2</span>
    </div>
  );
};

export default Waiting;
