import { useLocation, useNavigate } from "react-router-dom";
import { useSocket } from "../hooks/useSocket";
import { useEffect, useState } from "react";

const Waiting = () => {
  const [playerCount, setPlayerCount] = useState(1);

  const { socket } = useSocket();

  const query = new URLSearchParams(useLocation().search);
  const roomId = query.get("room_id");
  const navigate = useNavigate();
  console.log(roomId);

  useEffect(() => {
    if (!socket || !roomId) return;

    socket.on("roomFull", () => {
      setPlayerCount(2);
      setTimeout(() => {
        navigate(`/game/${roomId}`);
      }, 3000);
    });

    return () => {
      socket.off("roomFull");
    };
  }, [socket, roomId, navigate]);

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
