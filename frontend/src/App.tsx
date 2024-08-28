import './App.css';
import ThreeDLogoComp from './components/common/ThreeDLogo';
import Button from './components/common/Button';
import { useNavigate } from 'react-router-dom';
import { useAppState } from './hooks/useAppState';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  const { app, setAppState } = useAppState();

  // Redirect user to dashboard if already logged in
  useEffect(() => {
    if (app.user) {
      navigate('/dashboard');
    }
  }, [app.user, navigate]);

  // Return JSX
  return (
    <div className="overflow-x-hidden w-full">
      <ThreeDLogoComp size="large" animate={false} />
      <Button
        text="Create Account"
        color="green"
        animate
        size="full"
        onClick={() => navigate('/signup')}
      />

      <Button
        text="Login to Start Game"
        color="blue"
        animate
        size="full"
        onClick={() => navigate('/login')}
      />

      <Button
        text="Guest Mode"
        color="orange"
        animate
        size="full"
        onClick={() => {
          setAppState((prev) => ({ ...prev, user: null, guest: true }));
          navigate('/dashboard');
        }}
      />
    </div>
  );
}

export default App;
