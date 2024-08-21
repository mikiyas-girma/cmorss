import { useEffect, useState } from 'react';
import './App.css';
import { useSocket } from './hooks/useSocket';

function App() {
  const { socket } = useSocket()
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!socket) return;

    const handleConnect = () => {
      console.log('Connected to server socket.io');
    };

    socket.on('connect', handleConnect);

    return () => {
      socket.off('connect', handleConnect);
    };
  }, [socket]);

  return (
    <div>
      <h1>Hello World Counter! {count}</h1>
      <button onClick={() => setCount((prev) => prev + 1)}>Increase</button>
      <button onClick={() => setCount((prev) => prev - 1)}>Decrease</button>
    </div>
  );
}

export default App;
