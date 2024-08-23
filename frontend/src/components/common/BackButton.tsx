import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Bact Button for Better UX
 * @returns
 */
const BackButton = () => {
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const isIndex = path === '/';

  if (isIndex) return null;

  //   Return JSX To Go Back
  return (
    <button
      onClick={() => navigate(-1)}
      className="px-3 py-1 bg-primary-gray-green text-white absolute right-20 sm:right-28 top-8 text-xs sm:text-lg rounded-lg"
    >
      Back
    </button>
  );
};

export default BackButton;
