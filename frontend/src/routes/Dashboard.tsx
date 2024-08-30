import ThreeDLogoComp from '../components/common/ThreeDLogo';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../hooks/useAppState';
import { useState } from 'react';
import Modal from '../components/common/Modal';
import { useSocket } from '../hooks/useSocket';

const Dashboard = () => {
  const [playOnline, setPlayOnline] = useState(false);
  const { socket } = useSocket();
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
            text="Play Online"
            color="blue"
            animate
            size="full"
            onClick={() => setPlayOnline(true)}
          />
          <Button
            text="Log Out"
            color="red"
            animate
            size="full"
            onClick={() =>
              setAppState((prev) => ({ ...prev, user: null, guest: false }))
            }
          />
        </>
      )}
      {playOnline && (
        <Modal setOpen={setPlayOnline}>
          <div className=" bg-primary-gray-gree border-4 border-primary-gray-green backdrop-blur-2xl text-white p-4 rounded-lg px-8 sm:px-20">
            <h2 className="text-2xl font-bold text-center mt-8">Online Game</h2>
            <p className="text-center text-sm text-gray-300">
              Choose an option to start
            </p>
            <div className="mt-6">
              <Button
                text="Play with Random"
                color="blue"
                size="full"
                onClick={() => {
                  socket?.emit('findMatch');
                  navigate('/room/wait')
                }}
                className="min-w-[280px]"
              />
              <Button
                text="Host a Game"
                color="orange"
                size="full"
                onClick={() => navigate('/room/create')}
                className="min-w-[280px]"
              />
              <Button
                text="Join a Game"
                color="green"
                size="full"
                onClick={() => navigate('/room/join')}
                className="min-w-[280px]"
              />
            </div>
            <div className="mb-10"></div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
