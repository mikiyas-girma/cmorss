import ThreeDLogoComp from '../components/common/ThreeDLogo';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../hooks/useAppState';

const Dashboard = () => {
  const navigate = useNavigate();
  const { app, setAppState } = useAppState();

  // Return JSX of the Dashboard
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
        onClick={() => navigate('/game/ai')}
      />

      {app.user && (
        <>
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
        </>
      )}

      {app.user && (
        <Button
          text="Log Out"
          color="red"
          animate
          size="full"
          onClick={() =>
            setAppState((prev) => ({ ...prev, user: null, guest: false }))
          }
        />
      )}
    </div>
  );
};

export default Dashboard;
