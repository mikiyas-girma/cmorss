// Button Component File

import getColorGradient from '../../utils/getColorGradient';

type ButtonType = {
  color: 'green' | 'blue' | 'orange' | 'red';
  text: string;
  animate?: boolean;
  size: 'full' | 'content-fit';
  disabled?: boolean;
  loading?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
};

/**
 * Button Components Used across the project
 * @param color: "green" | "blue" " "orange
 * @param animate: true | false
 * @param size: "full" | "content-fit"
 * @returns JSX
 */

const Button: React.FC<ButtonType> = ({
  color,
  text,
  animate,
  size,
  onClick,
  disabled = false,
  loading,
  className,
}) => {
  // Pick conditional classes
  const colorChoice = getColorGradient(color);
  const btnSize = size === 'full' ? 'w-[80%] max-w-[300px]' : 'w-fit';

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const sound = new Audio('/sound/button-sound.wav');
    sound.play();
    onClick(event);
  };

  // Return JSX Component
  return (
    <div
      className={`${className} overflow-hidden p-3 px-6 rounded-lg text-white font-poppins font-semibold my-3 mx-auto text-center min-w-[280px] ${btnSize} ${
        animate && 'animate-animateBtn'
      } ${!loading && colorChoice} ${
        loading && 'animate-pulse bg-slate-500 cursor-not-allowed'
      }`}
    >
      <button
        onClick={handleClick}
        className={`h-full w-full ${disabled && 'disabled:cursor-not-allowed'}`}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
