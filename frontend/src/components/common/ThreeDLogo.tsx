import { ThreeDLogo } from '../../assets';

type ThreeDType = {
  size: 'large' | 'medium' | 'small';
  animate: true | false;
};

/**
 * ThreeDLogoComp
 * @returns
 */

const ThreeDLogoComp: React.FC<ThreeDType> = ({ size, animate }) => {
  const width =
    size === 'large'
      ? 'sm:w-[400px]'
      : size === 'medium'
      ? 'w-[200px]'
      : 'w-[100px]';

  //   Return JSX of the Appropriate 3d Logo
  return (
    <div
      className={`overflow-hidden mx-auto -mb-8 ${
        animate ? 'animate-scaling' : ''
      } ${width}`}
    >
      <img src={ThreeDLogo} alt="3d Logo Tic-Tac" className="w-full" />
    </div>
  );
};

export default ThreeDLogoComp;
