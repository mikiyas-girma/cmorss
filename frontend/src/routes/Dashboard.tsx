import ThreeDLogoComp from '../components/common/ThreeDLogo';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div>
      <ThreeDLogoComp size="large" animate />
      <Button
        text="Play With a Friend"
        color="green"
        animate
        size="full"
        onClick={() => navigate('/game/friend')}
      />

      <Button
        text="Play With AI"
        color="orange"
        animate
        size="full"
        onClick={() => navigate('/play/ai')}
      />

      <Button
        text="Create a Game"
        color="blue"
        animate
        size="full"
        onClick={() => navigate('/room/create')}
      />

      <Button
        text="Join a Game"
        color="orange"
        animate
        size="full"
        onClick={() => navigate('/room/join')}
      />
    </div>
  );
};

export default Dashboard;
