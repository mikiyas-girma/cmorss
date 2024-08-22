import './App.css';
import ThreeDLogoComp from './components/common/ThreeDLogo';
import Button from './components/common/Button';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
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
        onClick={() => navigate('/dashboard')}
      />
    </div>
  );
}

export default App;
