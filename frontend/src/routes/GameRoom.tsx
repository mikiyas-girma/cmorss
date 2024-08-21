import { useParams } from "react-router-dom";

const GameRoom = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div>Game room with id {id}</div>
  )
}

export default GameRoom