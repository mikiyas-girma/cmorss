import { useEffect, useState } from 'react';
import './App.css';
import { useSocket } from './hooks/useSocket';
import Loader from './components/common/Loader';
import ThreeDLogoComp from './components/common/ThreeDLogo';
import TeamMark from './components/common/TeamMark';
import AppLogo from './components/common/AppLogo';
import Button from './components/common/Button';

function App() {
  const { socket } = useSocket();
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

      <Loader />

      {/* 3D Logo Component  */}
      <ThreeDLogoComp size="large" animate={true} />

      {/* Team Mark */}
      <TeamMark />

      {/* App Logo */}
      <AppLogo size="large" position="center" />

      {/* Sample of the Buttons */}
      <Button
        text="Create Account"
        color="blue"
        animate
        size="full"
        onClick={(e) => alert(`Button ${e.currentTarget.textContent} Clicked!`)}
      />

      <Button
        text="Login to Start Game"
        color="green"
        animate
        size="full"
        onClick={(e) => alert(`Button ${e.currentTarget.textContent} Clicked!`)}
      />

      <Button
        text="Guest Mode"
        color="orange"
        animate
        size="full"
        onClick={(e) => alert(`Button ${e.currentTarget.textContent} Clicked!`)}
      />
    </div>
  );
}

export default App;
