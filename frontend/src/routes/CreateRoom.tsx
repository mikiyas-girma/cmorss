import { useEffect, useState } from 'react';
import generateShortUUID from '../utils/generateShortUUID';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { toastError, toastSuccess } from '../utils/toast';

/**
 * Create Room Component
 * @returns JSX
 */
const CreateRoom: React.FC = () => {
  const [roomID, setRoomID] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setRoomID(generateShortUUID(7));
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(roomID);
      toastSuccess('Room ID Copied to Clipboard.');
    } catch (err) {
      toastError('An Error occured with copying code.');
    }
  };

  const handleNavigation = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(`/game/${roomID}`);
    }, 2000);
  };

  return (
    <div className="w-[90%] max-w-[500px] filter backdrop-blur-2xl mx-auto justify-center items-center flex flex-col rounded-lg font-poppins text-center p-10">
      <h2 className="text-4xl font-bold text-white">
        Ready to win, Bond and Have Fun?
      </h2>

      <p className="my-4 text-white">Click/Tap the Code Below to copy.</p>

      <button
        onClick={(e) => {
          e.preventDefault();
          handleCopy();
        }}
        style={{ cursor: 'copy' }}
        className="p-4 rounded-lg text-xl text-center font-semibold mb-3 w-full h-[50px] bg-white"
      >
        <p>{roomID}</p>
      </button>

      {/* Submit User Entry */}
      <Button
        disabled={loading}
        loading={loading}
        color="blue"
        size="full"
        text={loading ? 'Loading. Please wait...' : 'Create Room'}
        onClick={handleNavigation}
      />
    </div>
  );
};

export default CreateRoom;
