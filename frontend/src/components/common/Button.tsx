// Button Component File

import getColorGradient from '../../utils/getColorGradient';

type ButtonType = {
  color: 'green' | 'blue' | 'orange';
  text: string;
  animate: boolean;
  size: 'full' | 'content-fit';
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
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
}) => {
  // Pick conditional classes
  const colorChoice = getColorGradient(color);
  const btnSize = size === 'full' ? 'w-[80%] max-w-[300px]' : 'w-fit';

  // Return JSX Component
  return (
    <div
      className={`overflow-hidden p-3 px-6 rounded-lg text-white font-poppins font-semibold my-3 mx-auto text-center min-w-[280px] ${btnSize} ${
        animate && 'animate-animateBtn'
      } ${colorChoice}`}
    >
      <button onClick={onClick} className={`h-full w-full`}>
        {text}
      </button>
    </div>
  );
};

export default Button;
